---
date: 2020-06-17T17:03:55.674Z
title: Utiliser un écran 3.5 Kedei avec un Raspberry
image : /static/images/raspispilcd.jpg
---
Je me lance dans un nouveau projet de synthétiseur à base de raspberry et Patrick m'a filé un écran 3.5 qui reste blanc après allumage...

Suite à quelque recherches, j'ai vu que les écrans Kedei sont connus pour être chiants...

J'ai trouvé des infos sur [cette page](http://www.epyon.be/2019/01/12/raspberry-pi-3-b-with-kedei-3-5-inch-480x320-tf-lcd-display/) pour en installer les drivers :

```
wget http://en.kedei.net/raspberry/v6_1/LCD_show_v6_1_3.tar.gz
tar -xvzf LCD_show_v6_1_3.tar.gz
cd LCD_show_v6_1_3
./LCD35_v
```

Pour une autre version :

https://iwannabe1337.wordpress.com/2016/03/26/rpi-set-raspberry-pi-lcd-3-5-inch-rpi-lcd-v3-0/

Avec un autre modèle pour lequel le touchscreen x est inversé:

https://hackaday.io/project/166752-quick-and-dirty-zynthian/details
