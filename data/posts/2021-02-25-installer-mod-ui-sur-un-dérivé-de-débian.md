---
date: 2021-02-25T14:00:05.777Z
title: Installer MOD-UI sur un dérivé de Débian
image : /static/images/mod-ui.png
---
[MOD-UI](https://wiki.moddevices.com/wiki/MOD_UI) est un serveur web qui permet de contrôler à distance différents plugins d'effet de type LV2.

Pour l'installer sur un système dérivé de Debian (Ubuntu, Mint...), il suffit d'installer le [dépôt de KXStudio,](https://kx.studio/Repositories) l'ensemble des **plugins LV2** proposés par **KXStudios**, puis 

```bash
# Installation d'éventuelles dépendances
sudo apt-get install apt-transport-https gpgv
# Téléchargement du paquet .deb 
wget https://launchpad.net/~kxstudio-debian/+archive/kxstudio/+files/kxstudio-repos_10.0.3_all.deb
# Installation du dépot
sudo dpkg -i kxstudio-repos_10.0.3_all.deb
# Mise à jour des paquets
sudo apt-get update
# Installation des LV2 et de MOD-UI
sudo apt-get install kxstudio-meta-audio-plugins-lv2 kxstudio-recommended-audio-plugins-lv2 mod-host mod-ui
```

Ajouter l'utilisateur du système au groupe audio 

```bash
sudo usermod -a -G audio $USER
```

Après avoir lancer le serveur Jack, il faut charger le module `mod-monitor` pour être capable d'utiliser les sorties sonores.

```bash
jack_load mod-monitor
```

Lancer enfin mod-host en le connectant aux ports utilisés par Jack :

```bash
mod-host -n -p 5555 -f 5556
```

L'interface MOD-UI devrait alors être accessible ici : [http://localhost:8888/](http://localhost:8888/)
