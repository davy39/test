---
date: 2021-04-25T16:54:55.998Z
title: Contourner la surveillance et les limitations de nos FAI
image : /static/images/dns.png
---
Nos fournisseurs d'accès à internet sont de plus en plus sollicités pour censurer certains sites, notamment ceux de partage de pair à pair, comme Libgen par exemple.

Les limitations imposées par les FAI se basent sur les DNS qu'il faut alors contourner.

## Sur les navigateurs

### Firefox

Préférences / Général / Paramètres réseau / Activer les DNS via HTTPS

### Chrome/Chromium

Si votre version est suffisamment récente, cherche le paramètre DNS à l'adresse `chrome://flags` ou lancer l'appli avec les paramètres suivants :

```bash
chrome --enable-features="dns-over-https<DoHTrial" --force-fieldtrials="DoHTrial/Group1" --force-fieldtrial-params="DoHTrial.Group1:server/https%3A%2F%2F1.1.1.1%2Fdns-query/method/POST"
```

## Sur un réseau en particulier

Avec linux (Network Manager) -> Paramêtres réseau / Option du réseau que vous utilisez (un réseau wifi par exemple /  IPv4 / DNS et ajouter par exemple ceux de Cloudflare (1.1.1.1), Google (4.4.4.4 et 8.8.8.8) ou encore OpenDNS (208.67.222.222 et 208.67.220.220 

## Sur l'ensemble du système

Pour que toutes vos applications utilisent des DNS externe sur tous les réseaux, il faut utiliser resolvconf :

```shell
#Installation de resolvconf
sudo apt install resolvconf 
# Activation du service
sudo systemctl enable resolvconf.service

# Indiquer les DNS que vous voulez utiliser dans le fichier suivant
sudo nano /etc/resolvconf/resolv.conf.d/head
# Par exemple ceux de Google
nameserver 8.8.8.8  
nameserver 4.4.4.4

# Recharger la configuration
sudo resolvconf -u
# Relancer le service
sudo systemctl start resolvconf.service

# Les nouveaux DNS doivent maintenant apparaitre dans le fichier /etc/resolv.conf
cat /etc/resolv.conf
```
