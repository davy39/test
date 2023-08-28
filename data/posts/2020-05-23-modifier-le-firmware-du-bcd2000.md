---
date: 2020-05-23T15:43:24.295Z
title: Modifier le firmware du BCD2000
image : /static/images/BCD2000_big.jpg
---
Le **BCD2000** est une table de mixage pour DJ qui commence à dater un peu (2006), mais peu donc être achetée pour pas bien cher d'occasion (j'en ai acheté une à 10€ et l'autre à 20€). Elle a l'air assez robuste et s'adapte facilement pour controler le logiciel de DJay **Mixxx** (j'ai apporté [quelques modifs au script et fichier xml](https://github.com/davy39/mixxx-bcd2000) de Mixxx pour un meilleur support).

Cependant, ses drivers pour Windows ne supportent que les systèmes 32bits et donc pas les plus récents, et le noyau Linux ne prend en charge que les signaux midi et pas la partie audio.

On trouve bien [la branche audio d'un module pour Linux](https://github.com/anyc/snd-bcd2000/tree/audio), mais elle ne fonctionne que si le contrôleur est branché sur un port USB3, et l'acquisition de l'entrée micro saccade par moment (peut-être est-ce du au manque de puissance du système sur lequel je l'ai testée...). Bref, c'est déjà pas mal mais pas idéal...

## Changement du firmware

Il existe une solution bien plus élégante : reprogrammer [le firmware du controleur ](https://github.com/CodeKill3r/BCD2000HIDplus)pour qu'il utilise des protocoles de communication plus standard. Cette solution est très peu documentée et nécessite de [flasher l'Eeprom 24C64](https://github.com/command-tab/ch341eeprom) présent dans l'électronique

Pour cela, il nous faut simplement un programmateur d'[EEPROM CH341](https://fr.aliexpress.com/item/4000851292510.html).

Commencer par démonter le contrôleur après avoir enlevé les caches en plastique qui sont visés et clipsés sur les côtés, faire levier sur le clip avec un couteau pour éviter de le casser.

![](/assets/Clip.jpg "Faire levier pour déclipser le bord sans le casser.")

Démonter le PCB sur laquelle se trouve l'EEPROM, situé au centre de la table de mixage.

![](/assets/PCB.jpg)

L'EEPROM se trouve derrière est est noté IC6.

![](/assets/EEPROM.jpg)

Il ne reste plus qu'à clamper l'EEPROM pour le flasher.

![](/assets/flash.jpg)

On peut le faire avec l'utilitaire flashrom sous linux.

```bash
sudo apt install flashrom
sudo flashrom --programmer ch341a_spi -r backup.bin
wget https://github.com/CodeKill3r/BCD2000HIDplus/raw/master/tusboot.bin
sudo flashrom --programmer ch341a_spi -w tusboot.bin
```

## Enregistrement du microphone

Initialement la table de mixage acquiert le son à partir de l'entrée analogique. Pour pouvoir enregistrer le microphone, il faut lui envoyer un signal midi, par exemple à partir d'une ligne de commande :

`amidi -p hw:2,0,0 -S C1 01`

Ou pour revenir à l'entrée analogique :

`amidi -p hw:2,0,0 -S C1 00`
