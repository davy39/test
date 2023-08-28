---
date: 2020-06-20T09:40:48.913Z
title: Compiler un noyau realtime (RT) pour Armbian
image : /static/images/RealTimeLinux.jpg
---
## Téléchargement des outils de compilation d'Armbian

```
git clone https://github.com/armbian/build ~/build
```

## Compiltion pour OrangePi One

Télécharger le [dernier patch RT](https://wiki.linuxfoundation.org/realtime/start). 

En ce moment le noyau mainline pour OP One est basé sur la [branche 5.4 du dépot Megous](https://github.com/megous/linux/tree/orange-pi-5.4).

Télécharger le[ dernier patch 5.4](http://cdn.kernel.org/pub/linux/kernel/projects/rt/5.4/) et le décompresser dans le dossier ~/build/patch/kernel/sunxi-current (OPOne)

Effacer les patchs au delà de la version RT téléchargée.

### Compilation du kernel

```
./compile.sh  BOARD=orangepione BRANCH=current KERNEL_ONLY=yes KERNEL_CONFIGURE=yes
```

Il faut ensuite choisir le low latency (3) car la compilation du Full RT ne marche pas.

## Compilation pour OrangePi4

Les sources du mainline (OP4?) sont [ici](https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git).

Télécharger le [dernier patch 5.4](http://cdn.kernel.org/pub/linux/kernel/projects/rt/5.4/) et le décompresser dans le dossier ~/build/patch/kernel/rockchip64 pour l'OP4

### Modification des option de compilation

Il faut modifier la branche du noyeau compiler pour l'adapter à la version du patch RT téléchargée, dans les [options](https://github.com/armbian/build/blob/master/lib/configuration.sh) du fichier lib.config

```
mkdir ~/build/userpatches
nano ~/build/userpatches/lib.config
```

Comme par exemple :

```
KERNELBRANCH="tag:v5.4.47"
```

Remarque : On pourrait aussi enregistrer le fichier de configuration du Kernel une fois configuré.

```
nano ~/build/userpatches/linux-$KERNELFAMILY-$KERNELBRANCH.config
```

### Compilation du kernel

```
./compile.sh  BOARD=orangepione BRANCH=current KERNEL_ONLY=yes KERNEL_CONFIGURE=yes AUFS=no
```

Il faut ensuite choisir Full Preempt RT et [désactiver AUFS et NFS sinon la compilation n'aboutit pas.](https://forum.armbian.com/topic/13250-preempt-rt-patch-for-allwinner-h5/)
