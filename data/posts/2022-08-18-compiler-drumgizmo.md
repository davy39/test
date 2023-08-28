---
date: 2022-08-18T14:44:32.753Z
title: Compiler drumgizmo
image : /static/images/drumgizmo.png
---
[Drumgizmo](https://drumgizmo.org/wiki/doku.php) est un logiciel libre de génération de sons de batterie à partir d'une entrée midi.

La version actuelle (**v0.9.19)** ne permet pas d'avoir accès directement aux entrée midi des librairies par défaut de linux, alsa. Il faut donc installer jack pour l'utiliser, ce qui en complique un peu la configuration.

Voici donc la procédure pour compiler la version de développement de drumgizmo qui comporte une entrée alsamidi. Merci au passage à [Corrados](https://linuxmusicians.com/viewtopic.php?t=22714) pour cet ajout.

## Installation des dépendances

```shell
 sudo apt install \
 build-essential \
 autoconf \
 automake \
 libtool \
 lv2-dev \
 xorg-dev \
 libsndfile1-dev \
 libjack-jackd2-dev \
 libsmf-dev \
 git \
 gettext \
 libasound2-dev
```

*Remarque :* Dans les distributions récentes, autoconf-2.71 est installé, ce qui cause [un bug](https://linuxmusicians.com/viewtopic.php?f=57&t=23335&p=136410&hilit=autoconf#p136410).  Il faut donc downgrader autoconf à la version 2.69 (avec ses dépendances autotools-dev automake libtool) pour réussir à compiler.

## Compilation

```shell
git clone -b develop http://git.drumgizmo.org/drumgizmo.git --recursive 
cd drumgizmo 
./autogen.sh 
./configure --prefix=/usr/local/ --disable-lv2 --enable-cli 
make 
sudo make install
```

*Remarque :* --disable-lv2 est à indiquer si on ne souhaite pas construire le module lv2 et l'interface graphique.

## Téléchargement d'un kit de batterie.

Il faut ensuite télécharger le kit de votre choix à [cette adresse](https://drumgizmo.org/wiki/doku.php?id=kits).

## Lancement de Drumgizmo

Voici un exemple de lancement du client drumgizmo avec entrée alsamidi :

```shell
drumgizmo -i alsamidi -I midimap=/home/davy/DRSKit/Midimap_full.xml -o alsa /home/davy/DRSKit/DRSKit_full.xml -O dev=plughw -O frames=128
```

Il ne reste plus qu'à s'amuser :)
