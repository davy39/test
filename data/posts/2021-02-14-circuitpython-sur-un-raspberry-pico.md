---
date: 2021-02-14T17:37:26.459Z
title: CircuitPython sur un Raspberry Pico
image : /static/images/pico.jpg
---
La fondation **Raspberry Pi** a sorti un nouveau microcontrôleur au nom de [Raspberry Pico](https://www.raspberrypi.org/products/raspberry-pi-pico/). Il présente l'avantage d'être relativement performant et ce à un prix raisonnable ([4€50](https://shop.mchobby.be/fr/pico-raspberry-pi/2025-pico-rp2040-microcontroleur-2-coeurs-raspberry-pi-3232100020252.html)). Il devrait par ailleurs bénéficier du support d'une très large communauté et supporte le langage CircuitPython sur lequel on s'est habitué à travailler (sur SAMD21 et [BlackPill](https://davy.cf/blackpill)).

## Installation de Circuitpython

Rien de plus simple, il suffit de télécharger[ la dernière version  de Circuitpy au format UF2](https://circuitpython.org/board/raspberry_pi_pico/) et de copier le fichier sur le Pico après l'avoir connecté via USB.

## Utilisation des librairies Adafruit

Comme d'habitude, on peut [télécharger le bundle de librairies Adafruit](https://circuitpython.org/libraries), pour pouvoir ensuite copier les librairies nécessaires dans le dossier `lib` du Pico. *Attention* : s'assurer que le bundle correspond bien à la version de Circuitpython installée précédemment sur le Pico (la v6 lors de la rédaction de cet article).

## Programmation avec Mu-editor

Pour installer mu-editor : 

```bash
sudo apt-get install python3-pip
pip3 install mu-editor
```

Ou pour installer la version en développement de mu-editor :

```bash
pip3 install git+https://github.com/mu-editor/mu.git
```

Une fois Circuitpython Mu-editor reconnait le Pico comme un périphérique Adafruit CircuitPlayground. 

## Programmation avec Atom

Si vous êtes un aficionado de l'[éditeur Atom](https://atom.io/), il existe un le package **language-circuitpython** (*Edit>Preferences>Install*) qui permet d'avoir accès au Serial et au Plotter pour tracer des graphiques en live.

Pour installer Atom sur un OS dérivé de Debian (Ubuntu, Mint...) :

```bash
wget -qO - https://packagecloud.io/AtomEditor/atom/gpgkey | sudo apt-key add -
sudo sh -c 'echo "deb \[arch=amd64] https://packagecloud.io/AtomEditor/atom/any/ any main" > /etc/apt/sources.list.d/atom.list'
sudo apt-get update
sudo apt-get install atom
```

## Exemple d'utilisation du Pico

Un petit exemple pour afficher les mesures d'un BME680 sur un écran LCD, les envoyer sur le port série, et les enregistrer sur une carte SD. Comme d'hab avec CircuitPython, le code est à copier dans un fichier nommé `code.py` à la racine du pico.

```python
# On déclare les librairies nécessaires
# Attention de bien avoir copié adafruit_bme680.mpy, 
#adafruit_display_text, adafruit_displayio_ssd1306 et adafruit_sdcard.mpy dans le dossier "lib"
import board
import busio
import time
import adafruit_bme680
import digitalio
import adafruit_sdcard
import storage
import terminalio
import displayio
from adafruit_display_text import label
import adafruit_displayio_ssd1306

# On efface le contenu de l'écran
displayio.release_displays()
# On déclare un port I2C sur les pins PG0 et GP0
i2c = busio.I2C(scl=board.GP1, sda=board.GP0)
# On déclare le BME680 sur l'I2C
bme680 = adafruit_bme680.Adafruit_BME680_I2C(i2c)
# On déclare notre écran de 128x32 pixels sur l'I2C à l'addresse 0x3C
display_bus = displayio.I2CDisplay(i2c, device_address=0x3C)
display = adafruit_displayio_ssd1306.SSD1306(display_bus, width=128, height=32)
# On indique ici la pression (hPa) mesurée au niveau de la mer
bme680.sea_level_pressure = 1013.25
# On déclare un SPI sur les pins GP2, GP3, GP4 et GP5 du Pico
spi = busio.SPI(clock=board.GP2, MOSI=board.GP3, MISO=board.GP4)
cs = digitalio.DigitalInOut(board.GP5)
#On déclare une carte SD connectée sur le SPI
sdcard = adafruit_sdcard.SDCard(spi, cs)
#On déclare un système de fichier VfsFat sur la carte SD
vfs = storage.VfsFat(sdcard)
#On le monte dans un dossier /sd
storage.mount(vfs, "/sd")

#On lance une boucle qui tourne en permanence
while True:
    #On récupère un tuple comprenant tous les paramètres mesurés par le BME680
    result=(bme680.temperature,bme680.gas,bme680.relative_humidity,bme680.pressure,bme680.altitude)
    #On affiche le tuple sur le serial pour éventuellement pouvoir le tracer en direct aver l'icone "Graphique"
    print(result)
    #On ouvre un fichier test.txt pour continuer à le remplir ("a"=append)
    with open("/sd/test.txt", "a") as f:
        #On y écrit nos paramètres, séparés d'un espace, et formatés avec plus ou moins de décimales
        f.write("%0.1f %d %0.1f %0.3f %0.2f\r\n" % result)
    # On gère l'affichage du texte sur l'écran
    text_group = displayio.Group(max_size=5)
    # On écrit la température sur un ligne située à 3 pixel du haut
    text = "Temp : {:.2f} C".format(bme680.temperature)
    text_area = label.Label(terminalio.FONT, text=text, color=0xFFFFFF, x=0, y=3)
    text_group.append(text_area)
    # On écrit la pression sur un ligne située à 14 pixel du haut
    text = "Pres : {:.2f} hPa".format(bme680.pressure)
    text_area = label.Label(terminalio.FONT, text=text, color=0xFFFFFF, x=0, y=14)
    text_group.append(text_area)
    # On écrit l'humidité sur un ligne située à 25 pixel du haut
    text = "Humi : {:.2f} %".format(bme680.relative_humidity)
    text_area = label.Label(terminalio.FONT, text=text, color=0xFFFFFF, x=0, y=25)
    text_group.append(text_area)
    display.show(text_group)
    #on attend 2 secondes avant de recommencer une mesure.
    time.sleep(2)
```
