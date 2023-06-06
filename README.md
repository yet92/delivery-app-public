# DELIVERY APP

Deployed application: https://delivery-app-rjxf.onrender.com/

## Comments

To search for an address, enter the address in the corresponding field and press `Enter`

## Development mode

create ./server/.env (check .env.example)

### Server

DATABASE_URL - url to the mongo db database, it's easier to use a cluster.

Comment NODE_ENV variable.

`cd server`

`npm i`

`npm run dev`

### Client

Set your VITE_GOOGLE_MAPS_KEY into ./client/.env

Comment VITE_ENVIRONMENT variable

`cd ../client`

`npm i`

`npm run dev`

## Deployment mode

`cd server`

`npm run deploy:build`

`npm start`
