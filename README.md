# Chat App

This is a real-time one-to-one chat application built using the MERN stack and Socket.IO.

Users can create an account, login and logout, see other registered users and chat with them in real time. The messages are stored in MongoDB, so previous messages are available when the user logs in again.

## Features

* User signup and login
* Logout functionality
* One-to-one private chat
* Real-time messaging using Socket.IO
* List of all users who have logged into the application
* Click on a user to start a conversation
* Messages are stored in MongoDB
* Previous messages are loaded when users login again
* Real-time communication between users

## Technologies Used

Frontend:

* React.js

Backend:

* Node.js
* Express.js
* Socket.IO

Database:

* MongoDB

## How It Works

After creating an account and logging in, the user can see the users available in the users section.

A user can click on another user to open a private chat. Messages are sent using Socket.IO, which provides real-time communication between the two users.

The messages are also stored in MongoDB. Because of this, when a user logs in again, their previous conversation with other users can be loaded and displayed.

The application supports one-to-one conversations only and does not include group chats.

## Authentication

The application includes signup, login and logout functionality. Users need to login to access the chat application.

After logging in, the user can see other users and start conversations with them.

## Real-Time Chat

Socket.IO is used to handle real-time messaging.

When one user sends a message, it is sent to the intended user through the Socket.IO connection instead of being broadcast to everyone.

The message is also saved in MongoDB so that it can be accessed later.

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install the required dependencies:

```bash
npm install
```

Create a `.env` file and add the required MongoDB connection string and other required environment variables.

Then start the backend and frontend.

```bash
npm run dev
```

## Environment Variables

The application requires environment variables for the MongoDB connection and other backend configuration.

For example:

```text
MONGO_URI=your_mongodb_connection_string
```

Make sure not to upload your `.env` file or any private keys to GitHub.

## Future Improvements

Some possible improvements are group chats, sending images and files, online/offline status, typing indicators and notifications.

## Author

Lavish
