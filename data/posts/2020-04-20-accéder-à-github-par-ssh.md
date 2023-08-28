---
date: 2020-04-20T09:59:16.665Z
title: Accéder à Github par SSH
image : /static/images/copy-clone-url.png
---
Si l'on souhaite utiliser **Github** comme gestionnaire de révision, pour télécharger des dépots (clone), les développer localement, puis soumettre des modifications (commit) et les renvoyer sur Github (push)... Il peut être pratique de ne pas avoir à indiquer ses identifiants et mot de passe à chaque opération.

Pour cela, il est possible de se connecter à Github de manière sécurisée via le protocole **SSH**

* Si ce n'est pas déjà fait, on doit commencer par générer une clé SSH :

`ssh-keygen -t rsa -C "mon_email@example.com"`

* On peut alors copier le certificat ainsi généré accessible ici :

`cat ~/.ssh/id_rsa.pub`

* Il faut ensuite se rendre dans le menu **Settings** de github, sous-menu **SSH and GPG keys**, pour coller le contenu de notre fichier id_rsa.pub en tant que nouvelle clé SSH acceptée par Github.  
* Pour tester si votre clé SSH est reconnue, tester la commande suivante :

`ssh -T git@github.com`

* Enfin, configurer **git** pour qu'il se connecte par défaut avec votre identifiant Github.

```shell
git config --global user.email "mon_email@example.com"
git config --global user.name "mon_identifiant_github"
```
