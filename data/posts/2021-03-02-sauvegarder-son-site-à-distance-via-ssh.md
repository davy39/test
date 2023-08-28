---
date: 2021-03-02T12:40:26.640Z
title: Sauvegarder son site à distance via SSH
image : /static/images/ssh.png
---
Deux lignes simples pour sauvegarder la base sql et le dossier d'installation de son site/blog/wiki sur un serveur distant, dans notre cas un yeswiki sur nethserver :

```bash
# Téléchargement de la base de donnée
ssh admin@XX.XX.XXX.XXX "mysqldump -u dbuser -p dbname | gzip -9" > dbDump-`date +%Y-%m-%d`.sql.gz

# Téléchargement du dossier web
ssh admin@XX.XX.XXX.XXX "tar -C /var/lib/nethserver/vhost/ -zc wiki" > dossierWiki-`date +%Y-%m-%d`.tar
```

Pour ne pas avoir à re-télécharger un dossier trop lourd à chaque fois, on peut aussi utiliser rsync pour ne télécharger que les nouveaux fichiers.

```bash
rsync -avz -e ssh REMOTE_USER@REMOTE_HOST:/var/lib/nethserver/vhost/wiki /backup/directory/on/backup/host
```
