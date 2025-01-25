![My Skills](https://skillicons.dev/icons?i=angular,nest,postgres,docker,nginx)


# App MVP

Une App angular qui permet d'ajouter des images a un compte et de s'authentifier

- Se connecter ✅
- Ajouter des images ✅
- Like/Dislike ❌


## Architecture

![Capture d’écran du 2025-01-25 19-44-29](https://github.com/user-attachments/assets/82c8582d-3a2d-411a-b852-6f635f44f3f4)

Pour cette application j'ai décidé de partir sur 3 Services distincts : 

- Le Front en Angular
- Le Back avec NestJS
- La Bdd en Postgresql

Le back et la Bdd partage le même network pour communiquer entre eux, mais pas le front qui n'a pas besoin d'être sur le même network car j'expose le port 3000 dans ma configuration (Choix personnel)

Dans notre cas, nous avons deux volumes définis :

- **uploads** : Ce volume stocke les fichiers téléchargés.

Il est monté sur le conteneur NestJS (nestjs) dans le répertoire /usr/src/app/uploads. Cela permet de :
Conserver les fichiers téléchargés même si le conteneur est redémarré.
Partager les fichiers entre votre hôte et le conteneur.

- **db_data** : Ce volume est utilisé par le conteneur PostgreSQL (db) pour persister les données de la base. 

Cela garantit que vos données de base de données ne sont pas perdues en cas de redémarrage ou suppression du conteneur.


## Lancer le projet

Dans le dossier racine

```
  make start
```
Ce qui va lancer 3 conteneurs : 
- Angular
- NestJS
- Postgres

Vérifier que les conteneur tourne bien : 
```
  docker ps
```

Plus d'informations sur les commandes make :
```
  make help
```

Rendez-vous ensuite sur `localhost:4200` pour accéder à l'application

