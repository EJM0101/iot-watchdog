import os
import time
import threading
import random
from flask import Flask, render_template, request
from flask_socketio import SocketIO
import paho.mqtt.client as mqtt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

CAPTEURS = ["Capteur-Temp", "Capteur-Humid", "Capteur-Press"]
MQTT_BROKER = "test.mosquitto.org"
MQTT_PORT = 1883
MQTT_TOPIC = "iot_watchdog/capteurs/#"

user_mode = "SCRUTATION"  # Valeur par défaut

def polling_loop():
    while True:
        data = {}
        for capteur in CAPTEURS:
            data[capteur] = random.randint(10, 100)
        socketio.emit("update_data", data)
        time.sleep(2)

def on_connect(client, userdata, flags, rc):
    client.subscribe(MQTT_TOPIC)

def on_message(client, userdata, msg):
    topic_parts = msg.topic.split("/")
    capteur = topic_parts[-1]
    valeur = msg.payload.decode()
    socketio.emit("update_data", {capteur: valeur})

@app.route("/", methods=["GET", "POST"])
def index():
    global user_mode
    if request.method == "POST":
        mode = request.form.get("mode")
        if mode in ["SCRUTATION", "INTERRUPTION"]:
            user_mode = mode
    return render_template("index.html", MODE=user_mode)

def start_background_threads():
    if user_mode == "SCRUTATION":
        threading.Thread(target=polling_loop, daemon=True).start()
    elif user_mode == "INTERRUPTION":
        client = mqtt.Client()
        client.on_connect = on_connect
        client.on_message = on_message
        client.connect(MQTT_BROKER, MQTT_PORT, 60)
        threading.Thread(target=client.loop_forever, daemon=True).start()

if __name__ == "__main__":
    start_background_threads()
    port = int(os.environ.get("PORT", 5000))
    socketio.run(app, host="0.0.0.0", port=port)