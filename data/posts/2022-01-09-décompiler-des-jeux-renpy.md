---
date: 2022-01-09T11:01:46.712Z
title: Décompiler des jeux Ren'Py
image : /static/images/RenPy.jpg
---
[Ren'Py](http://fr.renpy.org/) est un moteur en python permettant de créer facilement des [Visual Novels](https://fr.wikipedia.org/wiki/Visual_novel). 

De nombreux jeux réalisés avec Ren'Py sont disponibles gratuitement, mais le code source de ces jeux n'est pas souvent accessible. Une multitude de jeux gratuits est accessible sur [Itch](https://itch.io/games/top-rated/free/made-with-renpy) , [Visual Novel DataBase](https://vndb.org/v?f=02N18Nd01N18fwRen_7Py-&s=33w) ou sur [Steam](https://steamdb.info/instantsearch/?refinementList%5Btags%5D%5B0%5D=Free%20to%20Play&refinementList%5Btechnologies%5D%5B0%5D=Engine.RenPy).

Ainsi pour apprendre à utiliser Ren'Py, il peut s'avérer utile de décompiler les jeux existants pour pouvoir en étudier les scripts. 

La procédure suivante permet cela :

# Décompilation automatique

* Ouvrir un terminal dans le dossier `game` de votre jeu et télécharger la dernière version de `un.rpyc` :

```shell
wget https://github.com/CensoredUsername/unrpyc/releases/download/v1.1.7/un.rpyc
```

* Simplement lancer le jeu (fichier .py ou .sh à la racine), le quitter, tous les `.rpyc` des sous-dossiers game devraient avoir été décompliés en `.rpy`.

Vous pouvez alors supprimer le fichier `scripts.rpa` et effectuer d'éventuelles modifications dans les fichiers `.rpy` qui sont apparus : `gui.rpy`, `options.rpy`, `screens.rpy`, `script.rpy`.

Pour avoir également accès aux images et sons, continuer la procédure suivante.

# Décompilation manuelle

## Dépaqueter les fichiers .rpa

Les jeux sont empaquetés dans des fichiers d'extension `.rpa`, notamment les images et sons en plus des scripts. Il faut donc également les décompacter.

### Installation de unrpa

```shell
sudo apt install python3-pip
sudo pip3 install unrpa
```

### Utilisation

Pour extraire et supprimer tous les rpa du dossier :

```shell
cd path/to/my/game
unrpa *.rpa
rm *.rpa
```

## Décompiler les .rpyc

Dans les paquets rpa ainsi extraits se trouvent les fichiers compilés du jeu au format .rpyc

### Installation de unrpyc

```shell
sudo apt install python2
curl https://bootstrap.pypa.io/pip/2.7/get-pip.py --output get-pip.py
sudo python2 get-pip.py
cd ~/Téléchargements
git clone https://github.com/CensoredUsername/unrpyc
cd unrpyc
sudo python2 setup.py install 
```

### Utilisation

Pour décompiler tous les .rpyc du dossier et sous-dossiers :

```shell
cd path/to/my/game
unrpyc.py .
```
