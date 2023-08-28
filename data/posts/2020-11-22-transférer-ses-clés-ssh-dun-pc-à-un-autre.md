---
date: 2020-11-22T11:25:48.229Z
title: Transférer ses clés SSh d'un PC à un autre
image : /static/images/ssh.jpg
---
Un moyen pour se connecter d'un clien SSH à une serveur distant est l'authentification par clé SSH.

Après installation d'un nouvel OS, il faut copier le dossier ~/.ssh et son contenu (notamment les clés id_rsa et id_rsa.pub) et veiller à lui attribuer les bonnes restrictions :

`chmod -R 500 ~/.ssh && chmod 400 ~/.ssh/id_rsa`

Ensuite seulement on peut indiquer à openssh d'utiliser ces clés : 

`ssh-add`
