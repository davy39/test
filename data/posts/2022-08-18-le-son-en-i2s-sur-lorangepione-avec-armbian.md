---
date: 2022-08-18T18:59:48.638Z
title: Le son en I2S sur l'OrangePiOne avec Armbian
image : /static/images/pcm5102.jpg
---
Pour la connectique, voir [ici](/volumio).

- Créer un fichier /boot/overlay-user/sun8i-h3-I2S-out.dts avec le contenu suivant :

```c
/dts-v1/;
/plugin/;

/ {
	compatible = "allwinner,sun8i-h3";

 	fragment@0 { 
 		target-path = "/"; 
 		__overlay__ { 
			pcm5102a: pcm5102a {
			#sound-dai-cells = <0>;
			compatible = "ti,pcm5102a";
			pcm510x,format = "i2s";
			};
 		}; 
 	}; 

	fragment@1 {
		target = <&i2s0>;
		__overlay__ {
			status = "okay";
			pinctrl-0 = <&i2s0_pins>;
			sound-dai = <&pcm5102a>;
			pinctrl-names = "default";
		};
	};

	fragment@2 {
		target-path = "/";
		__overlay__ {
			sound_i2s {
				compatible = "simple-audio-card";
				simple-audio-card,name = "I2S-master";
				simple-audio-card,mclk-fs = <256>;
				simple-audio-card,format = "i2s";
		                status = "okay";

				simple-audio-card,cpu {
					sound-dai = <&i2s0>;
				};

				simple-audio-card,codec {
					sound-dai = <&pcm5102a>;
				};
			};
		};
	};
};
```

* Le convertir en dtbo et l'ajouter au /boot/armbianEnv.txt avec la commande suivante :

```shell
sudo armbian-add-overlay /boot/overlay-user/sun8i-h3-I2S-out.dts
```

* Convertir le dtb de l'orange pi one en dts :

```shell
dtc -I dtb -O dts /boot/dtb/sun8i-h3-orangepi-one.dtb -o modif.dts
```

* Modifier le dts avec un "status = "okay";" dans la section i2s@01c22000 :

```shell
nano modif.dts
```

* Le reconvertir en dtb :

```shell
sudo dtc -I dts -O dtb modif.dts -o /boot/dtb/sun8i-h3-orangepi-one.dtb
```

* Redémarrer et la carte devrait apparaitre :

```shell
aplay -l
**** Liste des Périphériques Matériels PLAYBACK ****
carte 0: I2Smaster [I2S-master], périphérique 0: 1c22000.i2s-pcm5102a-hifi pcm5102a-hifi-0 [1c22000.i2s-pcm5102a-hifi pcm5102a-hifi-0]
  Sous-périphériques: 1/1
  Sous-périphérique #0: subdevice #0
```

* Tester le son son :

```shell
speaker-test -t wav -c2
```
