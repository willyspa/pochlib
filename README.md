# Poch'Lib

Réalisation de l'application Poch’Lib, une application de gestion de livres commandée par la librairie “La plume enchantée”. 
Elle souhaite créer une application pour permettre aux clients de chercher des livres en ligne, puis de venir les récupérer à la librairie.

L’application est à réaliser en Single Page Application (une seule page), et doit être responsive avec au moins 3 formats différents :

    Mobile.
    Tablette.
    Bureau.

Ce site web se décompose en deux fonctionnalités principales :

    La recherche et l’ajout d’un livre dans sa liste.
    L’affichage des livres et la suppression d’un livre.

#### Liens
[Lien du site en production](https://willyspa.github.io/pochlib/)

#### Instructions d'installation

- Cloner le repertoire.
- Executer le fichier index.html avec le navigateur de votre choix.


#### Modifier le sass

- Vérifier que node.js est installé avec la commande "npm --v", si ce n'est pas le cas rendez vous [ici](https://www.npmjs.com/get-npm) .
- Vérifier que Sass est installé avec la commande "sass --version" si ce n'est pas le cas installer le avec Installer "npm install -g sass"
- vérifier que  le fichier "package.json" dans la partie script>sass correspond à "--watch ./sass/main.scss:./public/css/style.css" avec "./sass/main.scss" étant le fichier à compiler et "./public/css/style.css" le lieu ou le fichier doit être compilé
- Executer sass avec la commande "npm run sass" 
