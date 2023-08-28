---
date: 2020-05-14T20:29:09.217Z
title: Installer Circuitpython sur une black pill
image : /static/images/photoblackpill.jpg
---
Les black pills sont des nouvelles boards construites autour d'un microcontroleur **STM32F411CEU6**. L'intéret de ces dernières est qu'elles semblent être la solution la moins chère pour programmer en circuitpython (~3€ la boad). Leurs performances ne sont pas les meilleures pour un projet complexe embarqué, mais pour apprendre à bidouiller en python, allumer une LED, lire les données d'un capteur... ça semble pas mal du tout !

Voici les étapes à suivre pour y installer Circuitpython :

* Télécharger la [dernière version de Circuitpy pour cette board ici](https://circuitpython.org/board/stm32f411ce_blackpill/) (tant qu'à faire la télécharger en fançais)
* Installer **dfu-util** qui servira à charger le firmware sur la board : 

  `sudo apt install dfu-util`

  ``
* Appuyer sur le bouton **BOOT0** tout en connectant la boad à l'USB
* Lister le matériel détecté sur les ports USB :

  `lsusb`


* Repérer l'identifiant de votre board STMicroelectronic, qui devrait être 0483:df11
* Lister le matériel trouver par dfu-util :

  `sudo dfu-util -l`

  Vous devriez voir une ligne du type :

  `Found DFU: [0483:df11] ver=2200, devnum=10, cfg=1, intf=0, path="1-1.1", alt=0, name="@Internal Flash  /0x08000000/04*016Kg,01*064Kg,03*128Kg", serial="389035483339"`
* Vous avez donc le numéro de série **`389035483339`** sur lequel nous pouvons maintenant flasher le firmware adafruit-circuitpython-stm32f411ce_blackpill-fr-5.3.0.bin téléchargé précédemment : 

  `sudo dfu-util -S 389035483339 -a 0 -s 0x08000000:leave -D ~/Téléchargements/adafruit-circuitpython-stm32f411ce_blackpill-fr-5.3.0.bin`
