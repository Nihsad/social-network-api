# Social Network API

## Description
This is an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. Built using Express.js, MongoDB, and Mongoose.

## Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Ensure MongoDB is running on your machine.

## Usage
1. Run `node index.js` to start the server.
2. Use Insomnia to test the API routes.

## Routes
- `/api/users`
  - GET: Retrieve all users.
  - POST: Create a new user.
- `/api/users/:userId`
  - GET: Retrieve a single user by ID.
  - PUT: Update a user by ID.
  - DELETE: Remove a user by ID.
- `/api/users/:userId/friends/:friendId`
  - POST: Add a friend to a user's friend list.
  - DELETE: Remove a friend from a user's friend list.
- `/api/thoughts`
  - GET: Retrieve all thoughts.
  - POST: Create a new thought.
- `/api/thoughts/:thoughtId`
  - GET: Retrieve a single thought by ID.
  - PUT: Update a thought by ID.
  - DELETE: Remove a thought by ID.
- `/api/thoughts/:thoughtId/reactions`
  - POST: Create a reaction to a thought.
- `/api/thoughts/:thoughtId/reactions/:reactionId`
  - DELETE: Remove a reaction by ID.

## Contributing
Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.

## Walkthrough Video
* [Link to Walkthrough Video](https://drive.google.com/file/d/1Gy1BtG41HaLd9ZfnHIm6ns1uKzbr3YMx/view?usp=sharing)
* [Video for DELETE reaction](https://drive.google.com/file/d/1D8DEzegKaIMFc4o-J_Iw3DMftSV-lYjV/view?usp=sharing)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License. See the LICENSE file for details. 