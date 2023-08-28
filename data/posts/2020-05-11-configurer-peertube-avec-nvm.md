---
date: 2020-05-11T16:49:32.036Z
title: Configurer Peertube avec nvm
image : /static/images/peertube.jpg
---
Après avoir galéré quelques heure pour faire une mise à jour de peertube, il semble important de garder une trace des quelques lignes qui résolvent mon problème du jour.

**Position du problème :** Les versions récentes de peertube nécessite l'installation de versions récentes de nodejs et npm ce qui est incompatible avecmon installation d'Onlyoffice sur Nethserveur...

Pour ne pas foutre le souk sur l'installation d'Onlyoffice que nous utilisons beaucoup trop en ce moment pour ce permettre d'en perdre l'usage, une solution existe pour utiliser en parallèle différentes versions de node et npm.

Cette solution est nvm pour Nodejs Version Management.

Sans en détailler l'utilisation ici, on trouve plein de tuto en ligne, c'est surtout la modification du fichier systemd de peertube que je veux archiver ici :

`sudo nano /etc/systemd/system/peertube.service`

Il faut ajouter une variable d'environnement indiquant la version installée avec nvm : 

`Environment=NODE_VERSION=12.16.3`

Et ensuite modifier la commande à exécuter

`ExecStart=/var/lib/nethserver/vhost/peertube/.nvm/nvm-exec npm start`

Enfin ça remarche !

**TODO later :** indiquer comment mettre à jour ou installer peertube
