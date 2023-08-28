---
date: 2021-01-26T18:16:01.484Z
title: Gérer le multimedia sur OP4 avec Armbian
image : /static/images/armbian.png
---
Pour que Armbian fonctionne correctement sur l'OrangePi 4, notamment pour lire les vidéos, suivre les étapes suivantes : 

* Installer [Debian Buster](https://redirect.armbian.com/region/EU/orangepi4/Buster_legacy_desktop).
* Installer les paquets spécifiques au RK3399 :

  ```
  sudo apt install media-buster-legacy-rk3399 --install-recommends
  ```

  *Source :* [https://forum.armbian.com/topic/16516-rk3399-legacy-multimedia-framework/](https://forum.armbian.com/topic/16516-rk3399-legacy-multimedia-framework/)
