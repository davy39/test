---
date: 2022-08-18T17:51:28.663Z
title: Lancement automatiques avec Systemd
image : /static/images/Systemd.png
---
Pour lancer automatiquement un programme au démarrage de linux, on peut configurer un service systemd. Exemple avec drumgizmo.

```shell
sudo nano /etc/systemd/system/drumgizmo.service
```
Y inscrire le code suivant :
﻿
```shell
[Unit] Description=Démarrage de drumgizmo

[Service] User=pi
ExecStart=/usr/local/bin/drumgizmo -r -i alsamidi -I midimap=/home/pi/DRSKit/Midimap_no_whiskers.xml -o alsa /home/pi/DRSKit/DRSKit_no_whiskers.xml -O dev=plughw -O srate=44100 -O frames=128 -O periods=3
Restart=always

[Install] WantedBy=multi-user.target
```
﻿Puis les commandes suivantes :

```shell
# On recharge systemctl
sudo systemctl daemon-reload 
# On démarre notre service
sudo systemctl start drumgizmo.service
# On configure systemd pour qu'il le lance automatiquement
sudo systemctl enable drumgizmo.service

```
