---
date: 2020-10-04T10:23:34.079Z
title: Fabriquer une batterie électronique
image : /static/images/DIYbatterie.jpg
---
# Fabrication d'une batterie électronique

Un arduino, quelques résistances, des capteurs piezzo, du matos de récup... et nous voilà avec une batterie électronique à connecter à un PC pour quelques euros.

## Electronique

Ryo Kosaka à bossé sur une librairie pour connecter ses pads de batterie électronique sur un arduino (par exemple un UNO avec un shield LCD) ou un ESP32 (qui peut émettre un signal Bluetooth) pour transformer les signaux en message MIDI.

Différents exemples de codes et de connections sont [disponibles sur son dépot Github](https://github.com/RyoKosaka/HelloDrum-arduino-Library).

## Logiciel

Un bon moyen de tester sa nouvelle batterie électronique sur son PC est le logiciel [Hydrogen](http://hydrogen-music.org/).

Mais avant de le lancer, il faut transformer les messages reçu par USB en signaux MIDI. Cela se fait sous linux grace au logiciel **ttymidi**.

* Pour l'installer, il faut le compiler car il n'est pas présent dans les dépôts de logiciels...

```bash
sudo apt install git buid-essentials libasound2-dev
git clone https://github.com/cjbarnes18/ttymidi
cd ttymidi
make
sudo make install
```

* Il faut aussi que votre utilisateur est les droits d'accès aux ports série et usb (comme pour arduino).

`sudo adduser $USER dialout`

* Enfin, pour le lancer, admettons que votre "batterie" est connectée sur /dev/ttyUSB0.

`ttymidi -s /dev/ttyUSB0 -b 38400`

* Vous pouvez ensuite lancer Hydrogen après l'avoir installé :
`sudo apt install hydrogen-drumkits`

## Matériel de récup

Plein d'exemples sont disponibles[ en ligne](https://www.youtube.com/watch?v=Eu6CRB6HjAg), rechercher "DIY electronic drum".
