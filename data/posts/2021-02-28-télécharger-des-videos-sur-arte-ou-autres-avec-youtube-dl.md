---
date: 2021-02-28T09:54:54.999Z
title: Télécharger des videos sur Arte (ou autres) avec Youtube-dl
image : /static/images/youdl.webp
---
Contrairement à ce que son nom indidique, [youtube-dl ](https://youtube-dl.org/)est un utilitaire en ligne de commande qui permet de télécharger simplement les vidéos de [nombreux sites de streaming](https://ytdl-org.github.io/youtube-dl/supportedsites.html).

Pour l'installer, rien de plus simple :

```bash
sudo apt-get install youtube-dl
```

Un exemple pour télécharger simplement l'ensemble des [vidéos Dopamine](https://www.arte.tv/fr/videos/RC-017841/dopamine/) d'Arte :

```bash
youtube-dl https://www.arte.tv/fr/videos/RC-017841/dopamine/
```
