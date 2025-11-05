# Xtreme Fitness :)

```
Author  : WEB - Media College Denmark
Project : API / Backend for [Xtreme Fitness].
```

## Kom igang.

Følg følgende trin.

### Installér Moduler.

```
npm install
```

### Opret en .env.local fil i roden af projektet.

Indsæt dette indhold:

```
# Secret Variables for use in Server Application.
NODE_ENV=development

SERVER_PORT=3042
SERVER_HOST=http://localhost:3042

MONGODB_URI=mongodb://127.0.0.1:27017/xtreme-fitness

# JWT
JWT_EXPIRES_IN="24h"
JWT_SECRET="8e18fa26acc704d3ca37fea29e17e8e024423a7c3eab4b76390a94ac579c20f0"

# Flags.
USE_JWT=false
```

### 2. Opret database & indhold.

Tryk på knappen `Opret Database` i 'NPM Script' i visual kode.

Eller benyt kommandoen

```
npm run "Opret Database"
```

### 4. Tjek at databasen er oprettet.

Åbn Mongo Compass og se din nye database "xtreme-fitness".

### 5. Start serveren.

Kør "Start Server" i 'NPM Script' i visual kode eller brug i terminalen.

```
npm run "Start Server"
```

:bulb: NB: Du kan _bare_ køre serveren via terminalen du _skal_ ikke have den
åben i visualcode. Du kan bare køre kommandoen ovenfor når du har fået
installeret databasen.

### 6. Åbn Postman.

Importér 'postman*collection.json' *(som ligger i `[MCD]/postman` i dette
projekt)\_

Opret et Postman Environment i postman op ret to variabler.

1. server_path
2. token

Værdierne for de to variabler skal være.

1. **server_path** = http://localhost:3042
2. **token** = Den token du er logget ind med. (kun når du benytter auth - start
   uden)

At benytte authentication vil være et tilvalg - du skal slå funktionaliteten
til, ved at sætte **USE_JWT=true** i .env.local filen.

### 7. Tjek at der er adgang til serveren fra postman.

Benyt "Get Users" i postman og forvent 3 brugere: en **Admin**, en **Member** og
en **Guest**.

Ala:

```javascript
{
    "status": "ok",
    "message": "Users fetched successfully",
    "data": [
        {
            "_id": "68df88f676cc9b0bf8ddec40",
            "name": "admin",
            "email": "admin@mediacollege.dk",
            "picture": "http://localhost:3042/users/no-user.jpg",
            "hashedPassword": "$2a$10$6IJ1rORltAM/DBg7Qmg99eeMibCmp7zYXOimvHKvjSzBMitJTXmrS",
            "role": "admin",
            "createdAt": "2025-10-03T08:27:34.977Z",
            "updatedAt": "2025-10-03T08:27:34.977Z"
        },
        {
            "_id": "68df88f676cc9b0bf8ddec44",
            "name": "member",
            "email": "member@mediacollege.dk",
            "picture": "http://localhost:3042/users/no-user.jpg",
            "hashedPassword": "$2a$10$1K6vFNZoxff7CZ8i5CUtJ.WlW6.2NhhCMNk1bhd3XHI/TmpvUS/Je",
            "role": "member",
            "enrolledWorkouts": [
                "68df88f676cc9b0bf8ddec26",
                "68df88f676cc9b0bf8ddec28",
                "68df88f676cc9b0bf8ddec2e",
                "68df88f676cc9b0bf8ddec30"
            ],
            "subscription": "68df88f676cc9b0bf8ddec1a",
            "createdAt": "2025-10-03T08:27:34.985Z",
            "updatedAt": "2025-10-03T08:27:34.985Z"
        },
        {
            "_id": "68df88f676cc9b0bf8ddec46",
            "name": "guest",
            "email": "guest@mediacollege.dk",
            "picture": "http://localhost:3042/users/no-user.jpg",
            "hashedPassword": "$2a$10$B1K.g6tTqEkwOnv3HLctPuNcHvjXaQN.ZAiwvAwCpNtoPeiwsamAq",
            "role": "guest",
            "createdAt": "2025-10-03T08:27:34.987Z",
            "updatedAt": "2025-10-03T08:27:34.987Z"
        }
    ]
}
```

Nu er alt oprettet og du er klar til at udvikle projektet. Hvis dette ikke er
tilfældet, så tag fat i din underviser.

:bulb: Husk! I kan altid droppe/slette jeres database og genskabe den som
oprindelig med "Opret Database" scriptet. I kan også omdøbe databasen ved at
ændre navnet i .env.local filen. Tøv ikke med at tage fat i en underviser hvis
der er problemer.

:bulb: Rens/Clear **localstorage**. Der kan opstå problemer hvis man har
"gammel" localstorage på samme port. Du kan fjerne gammel via browser consollen
/application/localstorage.
