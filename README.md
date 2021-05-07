## MERN Login Signup Component

Minimalistic, ready-to-use component for Sessions based Login and Sign-Up using Reactjs, Redux, Bootstrap Node.js + Express and MongoDB, can be used as a starting point for another project that needs authentication.

## Features

- Login page with success/error messages
- Register page with success/error messages
- Protected Profile page route that needs authentication to access
- Persistence achieved using Sessions, with session ID stored on Cookie
- Logout deletes session in database and cookie from browser
- Fully responsive across Desktop, Tablet and Mobile


## Prerequisites

- Node.js
- NPM
- React
- MongoDB Atlas MongoURI
- **.env file with ENV variables**, a .env template is provided

## Quick Start

Clone the repository

```
```

Install packages for Node backend

```
 cd mern-login-signup-component
 npm install
```

Install packages for React client

```
 cd mern-login-signup-component/client
 npm install
```
To Test Locally

remove the line ```"homepage": "",```
from ```client/package.json```
remove ```basename="/sessions-auth-app"```
from ```client/src/index.js```


Start Dev Server ( both React server and Nodejs server )

```
 npm run dev

```

