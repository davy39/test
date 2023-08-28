---
date: 2021-04-08T16:42:06.468Z
title: BigBlueButton + Docker + Traefik
image : /static/images/bbb.png
---
[BigBlueButton](https://bigbluebutton.org/) est un logiciel libre de visioconférence. Son installation prévue sur Ubuntu 16.04 et pour la version de développement 2.3 sur Ubuntu 18.04.

Il est tout de même possible de l'[installer avec Docker](https://github.com/bigbluebutton/docker) même si cela n'est pas la méthode conseillée en production. 

Pour plus de facilité d'intégration, voici comment l'installer pour le diffuser avec [Traefic](https://traefik.io/).

Tout d'abord, il faut une version récente de [Docker-compose](https://docs.docker.com/compose/) :

```bash
# Installation d'une version récente de docker-compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Téléchargement du docker BBB
git clone --recurse-submodules https://github.com/bigbluebutton/docker.git bbb-docker

# Commencer la configuration
cd bbb-docker
./scripts/setup

# Eventuellement faire des modifications de la config 
nano .env

# Regénérer le fichier docker-compose.yml
./scripts/generate-compose
```

### Adaptation à Traefic

Modifier le fichier docker-compose.yml

Dans la partie nginx, supprimer la ligne `network_mode: host`

Et ajouter une partie labels :   

```
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.bbb.entrypoints=http"
      - "traefik.http.routers.bbb.rule=Host(`bbb.euredomain.de`)"     
      - "traefik.http.middlewares.bbb-https-redirect.redirectscheme.scheme=https"
      - "traefik.http.routers.bbb.middlewares=bbb-https-redirect"
      - "traefik.http.routers.bbb-secure.entrypoints=https"
      - "traefik.http.routers.bbb- secure.rule=Host(`bbb.euredomain.de`)"   
      - "traefik.http.routers.bbb-secure.tls=true"
      - "traefik.http.routers.bbb-secure.tls.certresolver=http"
      - "traefik.http.routers.bbb-secure.service=bbb"
      - "traefik.http.services.bbb.loadbalancer.server.port=8080"
      - "traefik.docker.network=proxy"
    networks:
      - proxy
      - bbb-net
```

Et à la toute fin du fichier :

```
  proxy:  
    external: true
```

Lancer le container BBB-Docker :

`sudo docker-compose up -d`

### Ajustements du pare-feu

Vérifier si des connexion sont empéchées par le parefeu :

`sudo cat /var/log/syslog`

> \[UFW BLOCK] IN=ens5 OUT= MAC= SRC=192.168.1.16 DST=224.1.1.1 LEN=32 TOS=0x00

Ouvrir les droits concernés du parefeu :

`sudo ufw allow  from 192.168.1.16 to 224.1.1.1`



### Création d'un compte admin

sudo docker-compose exec greenlight bundle exec rake user:create\["username","email","password","admin"]

Un des rares liens qui m'a permis de trouver cette config (en allemand) : 

[https://goneuland.de/big-blue-button-mit-docker-und-traefik-installieren/](https://goneuland.de/big-blue-button-mit-docker-und-traefik-installieren/)
