---
date: 2022-01-18T15:57:53.762Z
title: Installer une tablette graphique Parblo A610 sur Linux
image : /static/images/parblo-a610.jpg
---
Pour installer les drivers de la tablette :
```shell
wget https://github.com/DIGImend/digimend-kernel-drivers/releases/download/v10/digimend-dkms_10_all.deb
sudo dpkg -i digimend-dkms_10_all.deb
```
Puis redémarrer.
﻿
Pour attribuer une commande à chaque bouton :
```shell
xsetwacom --set "UC-LOIC TABLET 1060 Pad pad" Button 1 "key +ctrl +shift +1 -1 -shift -ctrl"
xsetwacom --set "UC-LOIC TABLET 1060 Pad pad" Button 2 "key +ctrl +shift +2 -2 -shift -ctrl"
xsetwacom --set "UC-LOIC TABLET 1060 Pad pad" Button 3 "key +ctrl +shift +3 -3 -shift -ctrl"
xsetwacom --set "UC-LOIC TABLET 1060 Pad pad" Button 4 "key +ctrl +shift +4 -4 -shift -ctrl"
xsetwacom --set "UC-LOIC TABLET 1060 Pad pad" Button 9 "key +ctrl +shift +5 -5 -shift -ctrl"
xsetwacom --set "UC-LOIC TABLET 1060 Pad pad" Button 10 "key +ctrl +shift +6 -6 -shift -ctrl"
xsetwacom --set "UC-LOIC TABLET 1060 Pad pad" Button 11 "key +ctrl +shift +7 -7 -shift -ctrl"
xsetwacom --set "UC-LOIC TABLET 1060 Pad pad" Button 12 "key +ctrl +shift +8 -8 -shift -ctrl"
```

Cela marche aussi pour la tablette Huion HW1409 avec un exemple pour les 16 boutons :
```
xsetwacom set “HID 256c:006e Pad pad” button 16 key +Ctrl +Shift +Z
xsetwacom set “HID 256c:006e Pad pad” button 15 key +Ctrl +Z
xsetwacom set “HID 256c:006e Pad pad” button 14 key +X
xsetwacom set “HID 256c:006e Pad pad” button 13 key +Z
xsetwacom set “HID 256c:006e Pad pad” button 12 key Ctrl
xsetwacom set “HID 256c:006e Pad pad” button 11 key Shift
xsetwacom set “HID 256c:006e Pad pad” button 10 key B
xsetwacom set “HID 256c:006e Pad pad” button 9 key E
xsetwacom set “HID 256c:006e Pad pad” button 8 key 8
xsetwacom set “HID 256c:006e Pad pad” button 3 key 7
xsetwacom set “HID 256c:006e Pad pad” button 2 key Backspace
xsetwacom set “HID 256c:006e Pad pad” button 1 key 5
```



https://opentabletdriver.net/Wiki/Install/Linux
