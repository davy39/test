---
date: 2022-08-29T12:36:21.491Z
title: Un frigo connecté avec EspEasy
image : /static/images/esp01.jpg
---
# ESPEasy

[EspEasy](https://espeasy.readthedocs.io/en/latest/) est une plateforme d'objet connectés qui peut s'installer sur les ESP8662 ou ESP32. Les microprocesseur ESP8662 sont présents sur des [modules ESP-01](https://fr.aliexpress.com/item/1005004204950222.html) que l'on peut trouver accompagnés d'un capteur de température pour 2€ environ. L'intéret de ce matériel est qu'il peut se connecter au Wifi pour envoyer ses mesures directement sur internet.


## Compiler une version customisée

On peut télécharger un pack avec des firmwares précompilés sur [le github du projet](https://github.com/letscontrolit/ESPEasy/releases). Sur un Esp01, installer la version \`ESP_easy_mega_xxxxx_normale_esp8661_1M\`.

Pour customiser le firmware avec les extensions qui nous intéressent (ici pour mesure la températur, envoyer les données dans une base, et des email de notification), il nous le compiler nous meme.

Cela se fait avec VSCode et son extension PlatformIO. 

* Cloner le dépot github.

```shell
git clone https://github.com/letscontrolit/ESPEasy
```


* Modifier le fichier `platformio.ini` avec le code suivant :

```yml
[Platformio]
default_envs = custom_ESP8266_1M 
[common] 
upload_port = /dev/ttyUSB0 ;L'upload depuis platformio semble dysfonctionner... à creuser;
```


* Renommer `src/Custom-sample.h` en `src/Custom.h` pour y faire les modifs nécessaires, par exemple

```c
  #define USES_P005   // module DHT pour la mesure de température
  #define USES_P033   // Dummy pour enregistrer des variables
  #define USES_C011   // Generic HTTP Advanced pour l'envoi à la base
  //#define NOTIFIER_SET_NONE (sinon le menu n’apparaît pas... à creuser)
  #define USES_N001   // Email`
```


## Flasher le ESP-01

* Commencer par connecter le esp01 au UART : 

![pinout](https://hackster.imgix.net/uploads/attachments/1247806/_fWvy8Ibwyp.blob?auto=compress%2Cformat&w=900&h=675&fit=min)

En plus de RX TX VCC et GND, il faut activer le ESP (CH_PD sur VCC) et booter en flashmode (GPIO0 sur GND).


* Une fois compilé avec PlatformIO, le firware a besoin d'être flashé autrement qu'avec PlatformIO pour que ça ne déconne pas (à creuser). Le fichier binaire se trouve dans le dossier .pio/build/custom...`.

```shell
pip install esptool
esptool.py  -p /dev/ttyUSB0 --baud 115200 erase_flash
esptool.py  -p /dev/ttyUSB0 --baud 115200 write_flash -fs 1MB -fm dout 0x0 ESP_Easy_mega_20220809_normal_ESP8266_1M.bin
```


## Première connexion

S'il ne trouve pas le réseau éventuellement configuré dans fichier Custom.h, le mot de passe par défaut du réseau wifi ouvert par l'ESP est `configesp`

On accède ensuite à l'interface d'admin d'EspEasy : [http://192.168.4.1](http://192.168.4.1)


## Configuration

* Configurer le wifi dans config
* Définir l'heure
  Activer l'utilisation du NTP dans tool/advanced avec comme hostc"0.fr.pool.ntp.org"            

* Activer les règles -> Rules dans toll/advance


### Mesure de la température

Déclarer le détecteur DHT dans le menu `Devices -> DHT -> Port GPIO2`


## Envoyer des emails

L'envoi des email se configure dans menu `Notifications`. Attention : Ne marche que pour les messageries acceptant les envois sans ssl (port 25).

  >   Par exemple pour orange

  >   Domain : orange.fr

  >   Host : smtp.organge.fr

  >   Port 25


### Ajout d'une règle pour l'envoi d'un email

Si l'envoi commun des température+humidité est coché dans devices/DHT:

```
on DHT#All do  //a la réception d'une mesure
 if [DHT#Temperature]>8 // Si la température est supérieure à 8°C
  if (%unixtime%-86400)>[var#1] // Si le dernier email a été envoyé il y a plus d'un jour
  Let,1,%unixtime% // On met l'heure d'envoi dans la variable 1
  notify 1, "Vérifier le frigo, sa température est de [DHT#Temperature]°C" // On envoie un email
  endif
 endif
endon
```


## Enregistrer des données dans influxDb

* Déclarer un Generic HTTP Advanced dans le menu contoller.

* Indiquer l'IP et le port de votre instance influxdb

* Pour Influxdb 2, ne pas déclarer d'autentification par mot de passe, cela se fait par Token

  >    Method : POST
  
  >    URI : /api/v2/write?bucket=MonBucket&org=MonOrganisation
  
  >    Header :      
  
  >    Content-Type: application/x-www-form-urlencoded 
  
  >    Authorization: Token xxf8CpLMBdFekaCkXeZwtA8Wd99StKiYixxzaqAXZGKPD4nF-xiSP5C8Bg==
  
  >    Body : Maison, Salle=Cuisine,Lieu=Frigo  %vname1%=%val1%,%vname2%=%val2%,Tension=%vcc% 
  // Maison est le measurement, Salle et Lieu les tags, et %vname1%... les mesures
  
  >    Send Binary -> Oui  
  
  >    Enabled -> oui

Il n'y a plus qu'à aller dans le menu du device / dht pour lui indiquer d'envoyer ses data au contoller 1
