---
date: 2020-04-20T10:56:06.242Z
title: 'Utilisation du formulaire de contact de Gatsby-Starter-Delog '
image : /static/images/delog.png
---
Ce blog statique a été créé en quelques clics à partir du travail de W3Layouts : [Gatsby-Starter-Delog](https://github.com/W3Layouts/gatsby-starter-delog).

Mon choix s'est porté sur celui-ci pour sa simplicité mais surtout la possibilité d'ajouter des nouveaux posts grâce à l’outil [Netlify-CMS](https://www.netlifycms.org/).

Comme beaucoup de sites statiques basés sur Gatsby, Hugo ou autres, ce dernier s['installe en quelques clics](https://app.netlify.com/start/deploy?repository=https://github.com/gatsbyjs/gatsby-starter-blog) grâce à Netlify dès lors que l'on a un compte Github.

Une petite subtilité réside dans la **configuration du formulaire de contact** que propose W3Layout :

Pour l'utiliser, il faut créer un compte sur [leur site](https://my.w3layouts.com/Forms/), puis aller dans le menu **Forms**, **Add new**, renseigner son adresse mail (pour la vérifier) et le nom de domaine où est installé le blog.

**Attention** : Pour vérifier le domaine, après avoir cliqué sur **Verify**, penser à sélectionner **HTML TAG** et non HTML File. Copier ensuite le code du type *5e9d7865382356fCF_Domain_verify* dans le fichier gatsby-config.js de votre site

```javascript
w3l_dom_key: `5e9d7865382356fCF_Domain_verify`
```
