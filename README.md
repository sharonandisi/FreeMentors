# FreeMentors
Free Mentors is a social initiative where accomplished professionals become role models to young people to provide free mentorship sessions.


[![Build Status](https://travis-ci.com/sharonandisi/FreeMentors.svg?branch=gh-pages)](https://travis-ci.com/sharonandisi/FreeMentors) [![Coverage Status](https://coveralls.io/repos/github/sharonandisi/FreeMentors/badge.svg?branch=develop)](https://coveralls.io/github/sharonandisi/FreeMentors?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/4a86d496d85232c6bb19/maintainability)](https://codeclimate.com/github/sharonandisi/FreeMentors/maintainability)

### Users
- Use can sign up
- User can sign in
- User can view all mentors
- User can view a specific mentor
-User can post a session
-user(mentor) can accept a session
-User(mentor) can decline a session
#### Sessions
- post a session
- accept a session
-decline a session
#### Mentor
- accept a session
- decline a session

### Admin
- Admin can update a user to a mentor
## Installation
Clone repo to your local machine:
console
git clone https://github.com/sharonandisi/FreeMentors/.git
**Install dependencies and run locally**<br/>
Then run:
`npm`
`npm init`
`npm install`
Create .env with your own enviroment variables.
Now start the server:
`npm`
`npm run dev-start`-development
`npm start` - production
## Testing
To run tests:
`npm`
`npm run test`
## API
API is deployed at [here](https://sharonmentor.herokuapp.com/) on heroku.
### API Routes
<table>
   <tr>
       <th>HTTP VERB</th>
       <th>ENDPOINT</th>
       <th>FUNCTIONALITY</th>
   </tr>
   <tr>
       <td>POST</td>
       <td>[ users ] /api/v1/auth/signup</td>
       <td>Create user account</td>
   </tr>
  <tr>
       <td>POST</td>
       <td>[ admin ] /api/v1/auth/signin</td>
       <td>Admin can sign in their account</td>
   </tr>
   <tr>
       <td>POST</td>
       <td>[ users ] /api/v1/auth/signin</td>
       <td>Sign in to user account</td>
   </tr>
   <tr>
       <td>GET</td>
       <td>[ mentors ] /api/v1/mentors/mentors</td>
       <td>Get all mentors</td>
   </tr>
   <tr>
       <td>GET</td>
       <td>[ mentor ] /api/v1/mentors/mentors/mentorid</td>
       <td>Get a mentor</td>
   </tr>
   <tr>
       <td>POST</td>
       <td>[ session ] /api/v1/sessions/sessions</td>
       <td>add a session</td>
   </tr>
   <tr>
       <td>PATCH</td>
       <td>[ admin ] /api/v1/auth/:userid</td>
       <td>update the mentor status</td>
   </tr>
   <tr>
       <td>PATCH</td>
       <td>[ session ] /api/v1/sessions/sessions/:sessionid/accept</td>
       <td>mentor can accept a session</td>
   </tr>
   <tr>
       <td>PATCH</td>
       <td>[ session ] /api/v1/sessions/sessions/:sessionid/reject</td>
       <td>mentor can reject a session</td>
   </tr>
  
   </tr>
</table>
