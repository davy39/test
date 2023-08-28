---
date: 2021-04-09T09:10:18.560Z
title: Quelques scripts Bash
image : /static/images/bash-logo.jpg
---
Récupérer les liens hypertextes d'une page web :

```shell
cat mon_fichier.html | | grep -o '<a .*href=.*>' | sed -e 's/<a /\n<a /g' | sed -e 's/<a .*href=['"'"'"]//' -e 's/["'"'"'].*$//' -e '/^$/ d'
```
