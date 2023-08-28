---
date: 2022-08-18T15:16:53.332Z
title: Quelques utilitaires pour alsa et midi
image : /static/images/Alsamixer.png
---
En vrac quelques commandes bien utiles, pour commencer : 

```shell
sudo apt install alsa-utils
```
## Lister ses cartes sons
```shell
cat /proc/asound/cards
## ou alors
 aplay -L
```
## Tester son matériel
```shell
speaker-test -t wav -c2
```
## Alsamixer
Pour avoir accès à vos cartes son et les paraméter

## aseqdump
Pour écouter les notes jouées sur une entrée midi
```shell
aseqdump -l  #liste des ports midi
aseqdump -p arduino:0 #écoute le port arduino
```
## aconnect
```shell
aconnect -l #liste des ports midi
client 0: 'System' [type=kernel]
    0 'Timer           '
    1 'Announce        '
client 14: 'Midi Through' [type=kernel]
    0 'Midi Through Port-0'
client 128: 'drumgizmo' [type=user,pid=765]
    0 'listen:in       '
client 129: 'arduino' [type=user,pid=797]
    0 'MIDI out        '
    1 'MIDI in         '
aconnect arduino:0 drumgizmo:0 #connecte l'entrée arduino à drumgizmo
```
## amidiauto
#### Installation
Pour éviter de connecter les midi manuelement, amidiauto permet de le faire automatiquement. 
```shell
curl https://blokas.io/apt-setup.sh 5 | sh
sudo apt install amidiauto
```
#### Utilisation
Après installation, il se lance comme un service.
## ttymidi
Permet de convertir une entrée serial en port midi.
#### Installation :
```shell
git clone https://github.com/cjbarnes18/ttymidi
cd ttymidi
make
sudo make install DESTDIR=/usr/local
```
#### Utilisation :
```shell
ttymidi -s /dev/ttyAMA0 -v -n arduino -b 38400 -q &
```


