---
date: 2021-09-05T14:33:52.941Z
title: Insérer le code comptable sur les bons de commande
image : /static/images/dolibarr.png
---
La configuration du **module Fournisseur** de Dolibarr permet d'ajouter des attributs supplémentaires aux bons de commandes. Il est même possible de sélectionner des paramètres sur un menu déroulant en lien avec la base de donnée.

Ainsi pour ajouter un attribut correspondant à la ligne comptable sur laquelle on souhaite inscrire la future dépense, créer un nouvel attribut supplémentaire de type "**Liste issue d'une table**" et renseigner les paramètres suivants :

> accounting_account:account_number|label:account_number::fk_pcg_version='PCG99-ABREGE' AND active=1

Ainsi Dolibarr : 

* sélectionnera la table *accounting_account* (qui contient les lignes des différents plans comptables) 
* affichera *account_number*(code de la ligne comptable) et *label* (libellé de la ligne) dans le menu déroulant
* renverra le paramètre *account_number* pour l'affichage dans le bon de commande
* sélectionnera uniquement les valeurs actives d'un plan comptable en particulier (ici PCG99-ABREGE).

Il ne restera plus qu'à renseigner une "**Mention complémentaire sur les commandes**", dans l'onglet "**Commande fournisseur"**, par exemple si on a choisi de nommer notre nouvel attribut "compta" :

> Ligne comptable :  `__EXTRAFIELD_COMPTA__`
