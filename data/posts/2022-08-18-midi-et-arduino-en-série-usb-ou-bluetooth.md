---
date: 2022-08-18T18:03:49.834Z
title: 'MIDI et arduino : en série, USB ou Bluetooth'
image : /static/images/midi.jpg
---
MIDI est un protocole de communication utilisé en musique électronique.

Selon les conditions, on peut configurer Arduino et Linux pour communiquer en MIDI par différents moyens.

## Série en natif

Les signaux midi peuvent s'envoyer sur port série, UART ou USB.

#### Arduino

```cpp
// En entête #include <MIDI.h>
MIDI_CREATE_DEFAULT_INSTANCE();
//Dans le setup :
MIDI.begin(10);
//Dans la loop
MIDI.sendNoteOn(note, intensité, canal); //(note, velocity, channel)
```

#### Linux

On peut lire les notes ainsi jouées avec [ttymidi](https://davy.cf/alsa-utils) à un baudrate de **38400**.

## Série par l'intermédiaire de Hairlessmidi

Pour une interface graphique multiplateforme, on peut utiliser hairless midi.

## Arduino

Comme pour le natif, mais il faut penser à démarrer le Serial

```cpp
//Dans le setup :
MIDI.begin(10);
Serial.begin(38400);
```

#### Linux

Voir l'installation [ici](https://davy.cf/hairless-midi). 

## USB

Toute les boads arduino ne permettent pas de présenter un port usb qui soit détecté comme une interface midi-usb. Une liste détaillée des carte le permettant est accessible [ici](https://tttapa.github.io/Control-Surface-doc/Doxygen/d8/d4a/md_pages_MIDI-over-USB.html). Par exemple, l'Arduino Un ou Mini, les STM32 ou les ESP32 ne le peuvent pas. En revanche, les SAMD21 et RP2040 le peuvent.

#### Arduino

##### SAMD21

En général, et dans le cas de la SAMD21, il suffit de déclarer dans l'entête :

```cpp
#include <USB-MIDI.h>
USBMIDI_CREATE_DEFAULT_INSTANCE();
```

##### RP2040

Cette carte nécessite l'utilisation du framework [earlephilhower ](https://github.com/earlephilhower/arduino-pico)et la librairie TinyUSB.

```cpp
#include <Adafruit_TinyUSB.h>
#include <MIDI.h>
Adafruit_USBD_MIDI usb_midi;
MIDI_CREATE_INSTANCE(Adafruit_USBD_MIDI, usb_midi, MIDI);
```

## Bluetooth : BLE MIDI

Possible avec l'ESP32, MIDI par bluetooth.

##### Arduino

Dans l'entete :

```cpp
#include <BLEMIDI_Transport.h>
#include <hardware/BLEMIDI_ESP32.h>
BLEMIDI_CREATE_DEFAULT_INSTANCE();
```

#### Linux

BlueZ, l'utilitaire Bluetooth de linux n'intègre pas par défault le support du MIDI. Il faut donc le recompiler :

##### Installation des dépendances

```shell
sudo apt install libudev-dev libical-dev libreadline-dev libdbus-1-dev libasound2-dev build-essential
```

##### Téléchargement de BlueZ

Télécharger la dernière version de Bluez depuis [le site](https://bluez.org) ou en ligne de commande et l'extraire.

```shell
cd /tmp 
wget https://mirrors.edge.kernel.org/pub/linux/bluetooth/bluez-5.9.tar.xz
tar -xf bluez-5.9.tar.xz
```

##### Compilation

```shell
cd /tmp/bluez-5.9 
./configure --enable-midi --with-systemdsystemunitdir=/etc/systemd/system
make
sudo make install
sudo apt-get install --reinstall bluez
```

Un petit redémarrage et les interfaces BLE-MIDI devraient être détectées.
