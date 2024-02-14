# Vibe Fest
Vibe Fest is a concertHub that allows music lovers to purchase their tickets efficiently.

## Table of Contents

- [Introduction](#introduction)
- [Technologies](#technologies)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [License](#license)

## Introduction

Provide a brief introduction to your project, its purpose, and the technologies used.

## Technologies

List the main technologies/frameworks/libraries used in your project.

- Node.js
- Express.js
- MongoDB

## Features

Highlight the main features of your application.

- User Authentication
- CRUD operations for Tickets, Users, Concerts, Feedback, Artists

## Getting Started

### Prerequisites

List any prerequisites users need to install before using your project.

- Node.js
- Express
- MongoDB

### Installation

Provide step-by-step instructions on how to install and set up your project.

```bash
npm install
```
## API Endpoints
### Tickets

GET /tickets - Retrieves all tickets (requires JWT)

GET /tickets/:id - Retrieves a specific ticket by ID (requires JWT)

POST /tickets - Creates a new ticket (requires JSON body)

```json
// example of POST ticket json body 
{
  "concert": "65cb5f8ee594ef2f324dbbac",
  "status": "Completed",
  "user": "65c7cefa1b51148537506bdc",
  "quantity": 10,
  "date": "2024-02-14T02:25:19.183Z"
}
```

PATCH /tickets - Updates a ticket (requires JSON body)

DELETE /tickets - Deletes a ticket (requires JSON body with ID)


### Users

GET /users - Retrieves all users (requires JWT)

GET /users/:id - Retrieves a specific user by ID (requires JWT)

POST /users - Creates a new user (requires JSON body)

```json
// example of POST user json body 
{
  "username": "The Cow",
  "password": "Test123",
  "email": "themoo@gmail.com",
  "phone_number": "012456",
  "roles": ["Admin"],
  "profile": "https://picsum.photos/200",
  "ticket": []
}
```

PATCH /users - Updates a user (requires JSON body)

DELETE /users - Deletes a user (requires JSON body with ID)

### Concerts

GET /concerts - Retrieves all concerts (requires JWT)

GET /concerts/:id - Retrieves a specific concert by ID (requires JWT)

POST /concerts - Creates a new concert (requires JSON body)

```json
// example of POST concert json body 
{
  "title": "this is new event",
  "date": "2024-02-14",
  "profile": "https://picsum.photos/200/300",
  "city": "Klang",
  "country": "Malaysia",
  "state": "Selangor",
  "genre": [
      "pop",
      "rock"
    ],
  "artist": "65c5476e164cd148a3b1e396",
  "price": 24,
  "description": "hello newest concert dropped",
  "venue": "malaysian concert hall"
}
```

PATCH /concerts - Updates a concert (requires JSON body)

DELETE /concerts - Deletes a concert (requires JSON body with ID)

### Feedback

GET /feedback - Retrieves all feedback (requires JWT)

GET /feedback/:id - Retrieves specific feedback by ID (requires JWT)

POST /feedback - Creates new feedback (requires JSON body)

```json
// example of POST feedback json body
{
  "user": "65c7cefa1b51148537506bdc",
  "message": "this is the feedback message"
}
```

PATCH /feedback - Updates feedback (requires JSON body)

DELETE /feedback - Deletes feedback (requires JSON body with ID)

### Artists

GET /artists - Retrieves all artists (requires JWT)

GET /artists/:id - Retrieves specific artist by ID (requires JWT)

POST /artists - Creates new artist (requires JSON body)

```json
// example of POST artist json body
{
  "username": "Polyphia",
  "roles": ["artist"],
  "profile": "https://picsum.photos/200",
  "genre": ["rock", "rap"],
  "bio": "Guitar music band",
  "social": ["instagram.com/poly", "facebook.com/poly"],
  "concert": [""]
}
```

PATCH /artists - Updates artist (requires JSON body)

DELETE /artists - Deletes artist (requires JSON body with ID)
