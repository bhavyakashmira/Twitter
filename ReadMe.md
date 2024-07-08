# Twitter-like Website using MERN Stack, React Query, and TailwindCSS

## Overview

This project is a Twitter-like web application built using the MERN stack (MongoDB, Express, React, Node.js), React Query for data fetching and state management, and TailwindCSS for styling. The application allows users to sign up, post tweets, follow other users, and engage with tweets through likes and comments.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
4. [Installation and Setup](#installation-and-setup)
5. [Backend Implementation](#backend-implementation)
6. [Frontend Implementation](#frontend-implementation)
7. [Conclusion](#conclusion)

## Features

- User authentication (sign up, log in, log out)
- Posting tweets
- Following and unfollowing users
- Liking and commenting on tweets
- Responsive design

## Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT for authentication
- Cloudinary

### Frontend

- React.js
- React Query
- TailwindCSS
- Socket.io for real-time updates



## Installation and Setup

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/bhavyakashmira/Twitter.git
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4. Start the backend server:
    ```sh
    npm run dev
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```sh
    cd ../frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend server:
    ```sh
    npm start
    ```

## Backend Implementation

### Models

- **User**: Schema for storing user information such as username, email, password, followers, and following.
- **Tweet**: Schema for storing tweet content, author, likes, and comments.
- **Notification**: Schema for handling notifications

### Controllers

- **authController**: Handles user authentication (sign up, log in).
- **NotificationController**: Handles CRUD operations for tweets.
- **userController**: Handles user profile and follow/unfollow functionality.

### Routes

- **/api/auth**: Authentication routes.
- **/api/notification**: Tweet-related routes.
- **/api/users**: User-related routes.

## Frontend Implementation

### Components

- **Auth**: Handles user authentication (sign up, log in).
- **Tweet**: Displays individual tweets.
- **TweetList**: Displays a list of tweets.
- **Profile**: Displays user profile information.
- **FollowButton**: Allows users to follow/unfollow other users.

### Pages

- **Home**: Displays a feed of tweets from followed users.
- **Explore**: Allows users to explore tweets from all users.
- **Profile**: Displays the logged-in user's profile.

### State Management

- **React Query**: Used for data fetching and caching. This helps in managing server state and provides powerful features like automatic refetching, caching, and background updates.

### Styling

- **TailwindCSS**: Used for styling the application. Provides utility-first CSS classes to build custom designs without writing CSS from scratch.

## Conclusion

This project demonstrates the implementation of a full-stack web application using the MERN stack, React Query for efficient data fetching and state management, and TailwindCSS for responsive and modern styling. The application includes essential features of a social media platform .
