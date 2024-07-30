# Product_Management_Web


## Installation steps

The following steps assume that the initial npm init on frontend and backend was done and needs only 
the configuration and setup of packages needed to run the front and backend code properly

### backend/

```
cd backend

npm install express
npm install -D typescript @types/node @types/express ts-node-dev

npm install cors
npm install --save-dev @types/cors

npm start
```

### frontend/

```
cd frontend

npm install axios

npm start
```

- backend runs on port 3000 by default
- frontend runs on port 3001 by default (configured through the package.json start parameter)