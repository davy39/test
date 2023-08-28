---
date: 2021-12-15T19:53:09.144Z
title: Installer une app Django sur Heroku
image : /static/images/heroku_django.png
---
Heroku propose d'héberger gratuitement nos applications Django, et ce en synchronisation avec nos dépot Github... Très pratique !

* Adapter le code de notre appli en vue de son déploiement :

```bash
# On va dans le dossier de notre appli
cd /le/dossier/de/mon/appli/django
# On se connecte à notre environnement virtuel de phython
source env/bin/activate
# On vérifie la version installée
python -V
# On obtient : Python 3.9.5, que l'on indique dans un fichier runtime.txt
echo python-3.9.5 > runtime.txt
# On installe un paquet qui facilitera le déploiement
python -m pip install django-on-heroku
# On établit la liste des dépendances à installer sur Heroku
python -m pip freeze > requirements.txt
# On indique à Heroku la commande pour lancer le serveur de développement
echo "web: python manage.py runserver 0.0.0.0:\$PORT" > Procfile
```

* Ajouter le code suivant à la toute fin du fichier settings.py :

```python
# Configure Django App for Heroku.
import django_on_heroku
django_on_heroku.settings(locals())
```

* Mettre à jour notre dépot github :

```
git add runtime.txt requirements.txt Procfile
git commit -m "Adaptations pour Heroku"
git push
```

* Créer un compte Heroku : [https://signup.heroku.com/](https://signup.heroku.com/)

* Créer ensuite une nouvelle appli et l'associer à notre répertoire Github : [https://devcenter.heroku.com/articles/github-integration](https://devcenter.heroku.com/articles/github-integration)

![](/assets/search-and-cionnect.PNG)

![](/assets/deploy.PNG) 

On peut sélectionner \`Enable Automatic Deploys\` pour qu'il recontruise notre site à chaque modif du dépot, et enfin cliquer sur \`Deploy Branch\` pour lancer le déploiement..

* Télécharger le client Heroku et s'y connecter :

```bash
#Télécharger ensuite le client pour Linux
curl https://cli-assets.heroku.com/install-ubuntu.sh | sh
#Se connecter à notre compte :
heroku login
```

* Finaliser la config de l'app sur heroku

```bash
# Créer une application
# heroku create nom-de-votre-application
#heroku builds:create --source-url https://user:token@api.github.com/repos/<username>/<repo name>/tarball/master/ --app <app-name>
# Configurer la clé avec celle se trouvant dans settings.py
heroku config:set SECRET_KEY="c@n%u@91tum=@j392g20b8znh7dqfo-v%81))gxbbmu$=dy_*)"
# Générer la base de donnée
heroku run python manage.py makemigrations
heroku run python manage.py migrate
heroku run python manage.py createsuperuser
```
