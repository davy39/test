---
date: 2021-04-18T15:25:53.218Z
title: Le HIFI sur Orange Pi One avec Volumio
image : /static/images/volumio.png
---
Un vieil Orange Pi One qui traine au fond d'un tiroir, un module i2s PCM5102 pour un son de qualité Hifi, rien de tel pour installer Volumio une distribution dédiée aux lecteurs audio.

## Connection du module I2S

![](/assets/orange-pi-one-i2s.png)

## Installation de Volumio

Des images de Volumio 3 en version beta sont [téléchargeables ici](https://disk.yandex.ru/d/61fgeT2G6k4XFw?w=1) et [discutées là](https://community.volumio.org/t/volumio-debian-buster-beta-orange-pi-images/44826/6).

La commande habituelle pour l'installer sur une carte microSD :

```shell
dd if=mon-image-volumio.img of=/dev/sdb bs=1MB
```

## Configuration de Volumio

Volumio peut ensuite finir d'être configurée en lign eaprès l'avoir démarrer, se connecter simplement sur adresse IP. On peut par exemple y configuer le wifi, ou encore activer le réglage du volume logiciel.

## Installation de Deemix-pyweb

Maintenant qu'on peut lire de la musique de bonne qualité, on peut vouloir en télécharger.

### Activation du SSH

Se connecter à **http://mon.adresse.ip.locale/dev**

Puis : 

```
ssh volumio@mon.adresse.ip.locale
```

Le mot de passe est volumio.

### Installation du serveur web Deemix

```
sudo apt install python3-pip git
sudo pip3 install --upgrade pip
git clone https://gitlab.com/RemixDev/deemix-gui-pyweb
cd deemix-gui-pyweb
git submodule update --init --recursive
sudo pip3 install -U -r server-requirements.txt
# Pour lancer le serveur 
python3 server.py --host 0.0.0.0 --portable --serverwide-arl
```



Pour créer un service qui se lance automatiquement au démarrage :

```
sudo dd of=/lib/systemd/system/deemix.service << EOF
[Unit]
Description=deemix

[Service]
Type=fork
ExecStart=/usr/bin/python3 /home/volumio/deemix-gui-pyweb/server.py --host 0.0.0.0 --portable --serverwide-arl

[Install]
WantedBy=multi-user.target
EOF
sudo systemctl daemon-reload
sudo systemctl enable deemix.service
sudo systemctl start deemix.service
```



L'interface web est alors accessible à l'adresse : **http://mon.ip.locale.de.volumio:6595**

Il y a un bug avec la sauvegarde des paramètres dans l'interface web, mais grâce à l'option **\--portable**, un dossier **config** a été créé dans le dossier deemix-gui-pyweb et peut être édité. Par exemple, le dossier de téléchargement de la musque peut être changer, pour qu'il corresponde au dossier musical de Volumio : `"downloadLocation": "/data/INTERNAL/music"`

L'option **\--serverwide-arl** permet de ne pas avoir à redonner votre ARL. Copier simplement l'ARL dans un fichier **config/.arl** 

L'option **\--host 0.0.0.0** permet de se connecter au serveur depuis une autre machine.
