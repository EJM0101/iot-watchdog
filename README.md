# 🐶 IoT Watchdog — Simulateur pédagogique Synchrone / Asynchrone

**IoT Watchdog** est une application pédagogique qui simule les architectures de communication synchrone et asynchrone dans les systèmes embarqués et IoT temps réel.

L'objectif est de comparer visuellement deux modes de traitement des capteurs :
- **Scrutation cyclique (synchrone)** : interrogation régulière des capteurs.
- **Interruption (asynchrone)** : réception immédiate des données via événements MQTT.

---

## 🚀 Fonctionnalités principales

✅ Mode scrutation : interrogation toutes les 2 secondes des capteurs simulés.

✅ Mode interruption : réception immédiate des valeurs via le broker public MQTT.

✅ Interface web dynamique en temps réel avec **WebSocket**.

✅ Simulation de 3 capteurs fictifs : Température, Humidité et Pression.

✅ Aucun matériel réel nécessaire, 100% simulation pédagogique.

---

## 🎯 Objectifs pédagogiques

- Comprendre la différence fondamentale entre scrutation et interruption.
- Visualiser en temps réel la réception des données selon le mode choisi.
- Illustrer les architectures de communication dans les systèmes temps réel distribués.
- Proposer un outil simple pour les TP étudiants en systèmes embarqués et IoT.

---

## 🛠 Stack technique

| Composant | Technologie |
| --------- | ----------- |
| **Backend** | Python 3 + Flask |
| **Temps réel** | Flask-SocketIO |
| **Communication IoT** | MQTT (paho-mqtt) |
| **Frontend** | Bootstrap 5 + Chart.js (prochaines améliorations possibles) |
| **Déploiement** | Render.com (gratuit) |
| **Broker MQTT** | test.mosquitto.org (public) |

---

## 📦 Installation locale

Cloner le projet et exécuter localement :

```bash
git clone https://github.com/EJM0101/iot-watchdog
cd iot-watchdog
pip install -r requirements.txt
python app.py
```

Accessible en local via : `http://localhost:5000/`

---

## 🌐 Déploiement sur Render

L’application est totalement déployable sur Render via :
- Le fichier `render.yaml` fourni
- Build automatique avec `pip install -r requirements.txt`
- Commande de démarrage : `python app.py`

---

## 🔬 Modes de simulation

### 1️⃣ Scrutation (Synchrone)

Le serveur interroge cycliquement tous les capteurs toutes les 2 secondes.

### 2️⃣ Interruption (Asynchrone)

Chaque capteur simule un événement et publie sa donnée via le broker MQTT.  
Le serveur reçoit les mises à jour immédiatement.

---

## 🔐 Pourquoi utiliser IoT Watchdog ?

- Simple à utiliser pour illustrer les concepts de base des systèmes temps réel.
- Idéal pour les étudiants découvrant les architectures de communication synchrone/asynchrone.
- 100% simulation sans besoin de matériel externe.

---

## 👨‍🏫 Développé par

**Emman Mlmb 🇨🇩**  
Université de Kinshasa — Licence 3 Informatique  
Projet pédagogique : **Systèmes Temps Réel - Architectures IoT**

---

> Ce simulateur est librement réutilisable à des fins pédagogiques et démonstratives.