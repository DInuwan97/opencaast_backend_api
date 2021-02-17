<br />
<p align="center">
  <a>
    <img src="https://drive.google.com/uc?export=view&id=1ej5eOJO3LV4_fbPLle7d-753AR9AX2tz" alt="Logo" >
  </a>
  
# OpenCast by Eduscope
> Opencast is a fully featured browser based recording solution.

## Table of contents
* [Features](#features)
* [Technologies](#Technologies)
* [Setup](#setup)

## Features
Support of following features
* User registration
* User Login
* Micro service architecture

## Technologies
* Server - Nodejs
* Database - Mongodb
* API - Express.js

## Setup

### Requirements 
- Create mongo db cluster on either AWS/Azure/GCP 
- Node 14.15.5 or upper version required
```
Device with, 
- Node
```
Clone the repository
```
git clone https://github.com/DInuwan97/opencaast_backend_api.git
```
Install npm
```
npm install
```
Update the packges in the project location using console

Add MongoDB and Cloudinary configurations at,
```
server -> config -> keys.js
```
Start the application
```
npm run dev
```
