---
date: 2022-07-13T11:53:39.477Z
title: Installer Rocket.Chat sur Armbian
image : /static/images/rocket-chat.png
---
J'ai essayé d'installer Rocket.Chat sur mon Orange Pi 4 et Armbian à partir de mon habituel combo docker-compose + Traefik, mais le dockerhub officiel ne propose pas d'image d'architecture arm64, et les autres images trouvées ne fonctionnent pas.

## Installation de Rocket.Chat

Pour l'installer en attendant une solution, il faut donc utiliser **snap** :

```shell
# On installe Snap
sudo apt install snapd
# On installe Rocket.Chat avec Snap
sudo snap install rocketchat-server
# On définit le port que l'on souhaite utiliser
sudo snap set rocketchat-server port=3001
# On indique l'url de notre chat (servie par Traefik)
sudo snap set rocketchat-server siteurl=https://chat.monurl.example
# on redémarre le service
sudo systemctl restart snap.rocketchat-server.rocketchat-server.service
```

## Reverse proxy

Pour accéder à l'appli via **Traefik**, on peut mettre en place un reverse proxy simple avec **docker-compose.**

Avant tout, il faut désactiver le proxy caddy intégré au snap par défaut :
```bash
sudo snap set rocketchat-server caddy=disable
sudo systemctl stop snap.rocketchat-server.rocketchat-caddy.service
sudo systemctl disable snap.rocketchat-server.rocketchat-caddy.service
sudo systemctl restart snap.rocketchat-server.rocketchat-server.service

``` 

Créer un fichier `docker-compose.yml` dans un dossier vide.

```yaml
services:
  rocketchat-proxy:
    image: qoomon/docker-host
    restart: always
    cap_add: ["NET_ADMIN", "NET_RAW"]
    labels:
      - traefik.enable=true
      - traefik.http.middlewares.chat-redirect-websecure.redirectscheme.scheme=https
      - traefik.http.routers.chat-web.rule=Host(`chat.monurl.example`)
      - traefik.http.routers.chat-web.entrypoints=web
      - traefik.http.routers.chat-web.middlewares=chat-redirect-websecure
      - traefik.http.routers.chat-websecure.entrypoints=websecure
      - traefik.http.routers.chat-websecure.rule=Host(`chat.monurl.example`)
      - traefik.docker.network=traefik_network
      - traefik.http.routers.chat-websecure.tls=true
      - traefik.http.routers.chat-websecure.tls.certresolver=leresolver
      - traefik.http.services.chat-global.loadbalancer.server.port=3001
    networks:
      - traefik_network

networks:
  traefik_network:
    external: true
```

Un petit `docker-compose up -d` et le tour est joué

### Pour info :

Le fichier `docker-compose.yml` de traefik ressemble à cela :

```yaml
services:
  traefik:
    container_name: traefik
    image: "traefik:latest"
    restart: always
    command:
      - --api=true
      - --entrypoints.web.address=:80
      - --entrypoints.web.http.redirections.entryPoint.to=websecure
      - --entrypoints.web.http.redirections.entryPoint.scheme=https
      - --entrypoints.web.http.redirections.entrypoint.permanent=true
      - --entrypoints.websecure.address=:443
      - --entrypoints.ssh.address=:222
      - --providers.docker
      - --log.level=DEBUG
      - --certificatesresolvers.leresolver.acme.httpchallenge=true
      - --certificatesresolvers.leresolver.acme.email=monemail@email.email 
      - --certificatesresolvers.leresolver.acme.storage=./acme.json
      - --certificatesresolvers.leresolver.acme.httpchallenge.entrypoint=web
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock:ro"
      - "./acme.json:/acme.json"
      - "./data:/etc/traefik"
    labels:
#      - "traefik.enable=true"
      - "traefik.http.routers.traefik.rule=Host(`traefik.monurl.example`)"
      - "traefik.http.routers.traefik.service=api@internal"
      - "traefik.http.routers.traefik.entrypoints=websecure"
      - "traefik.http.routers.traefik.tls.certresolver=leresolver"
      - "traefik.http.routers.http-catchall.rule=hostregexp(`{host:.+}`)"
      - "traefik.http.routers.http-catchall.entrypoints=web"
      - "traefik.http.routers.http-catchall.middlewares=redirect-to-https"
      - "traefik.http.middlewares.redirect-to-https.redirectscheme.scheme=https"

    networks:
      - traefik_network

networks:
  traefik_network:
    external: true
```
