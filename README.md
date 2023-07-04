<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Pokedex API

## Description

This is a simple API to manage a pokedex.

---

## Installation

1. Clone the repository
2. Install dependencies

```
$ npm install
```

3. Run database

```
$ docker-compose up -d
```

---

## Stack used

- NestJS
- MongoDB

---

# Fill database

Call the following endpoint to fill the database with the pokemons from the pokeapi

```
http://localhost:3000/api/v2/seed
```
