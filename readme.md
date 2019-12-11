# Ride the Mountain

Ride the Mountain is a prototype mobile first mountain bike trail review site meant to be responsive and easy on the eyes. To the left we have some mountain biking related tweets along with recently added trails. To the right is our full trail list sorted alphabetically. Search is now available looking in trail name, city, and state. The current authentication system does not collect email address as a design choice for demonstration purposes - so you need not worry about being spammed. The flip side is we can't reset your password either. We may change our position at a later date.

## Technology

- NodeJS with ExpressJS server
- Express-Session to build our authentication around
- Bcrypt for hashing
- Cookie-parser with HTTP only cookies to allow site interactions
- Express-Upload as middleware to parse out of images for storage
- Cloudinary for persistent image storage
- Bulma sass for front end design and layout with jQuery
- Express-Handlebars for templating our trail pages.

## Database

Our database consists of 4 models:

- User
- Table
- Review
- Media

The various associations allow us to relate:

1. media to both users and reviews
2. reviews to trails and users
3. trails to users

This allows us to keep everything organized and accessible so we can track who created what and allow access as needed.

## Challenges

Working through building out the authentication with cookies, forms, database, and local storage components was a bigger job than anticipated. A lot was learned in the process of writing most of our own authentication and verication methods with noteable exceptions of Bcrypt and Express-sessions. Additionally we hadn't considered the ephemeral storage of Heroku as being a major problem to solve as we weren't actually aware of the situation initially. Settling Cloudinary as our solution and then working with the SDK took time to test and debug and fit into existing code, but was a worth while experience.

![homePage](readmeImgs/home.jpg)
![trails](readmeImgs/trail.jpg)
