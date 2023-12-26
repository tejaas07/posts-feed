Tech stack and libraries used in the project:
1.	Frontend 
i.	Framework: Next.js 
ii.	Libraries: 
a.	Formik: for form validation.
b.	Sass: for styling components.
c.	react-toastify: for displaying success and error messages. 
d.	SWR: for fetching API data. 
e.	Axios: for making HTTP requests. 
f.	Material-UI: styling library used for the table.

2.	Backend 
i.	Framework: Express.js 
ii.	Database: MongoDB 
iii.	Runtime environment: Node.js 
iv.	Libraries: 
a.	CORS: to allow HTTP requests to access code's routes.
b.	express-validator: for validating input fields.
c.	Mongoose: for connecting with MongoDB and creating schemas. 
d.	Jsonwebtoken: for authentication.
e.	bcryptjs: for password hashing.

Note: Docker was used for containerizing both frontend and backend.

To run the code via docker-compose, follow these steps:
Open PowerShell/CMD in the root directory, i.e., "posts-feed."
Start Docker Desktop on the local machine.
Type the command "docker-compose up."
Access the frontend on http://localhost:3000/.
If you do not have Docker Desktop installed locally, use the CMD method shown below.



To run the code via the terminal, follow these steps:
Open the PowerShell/CMD terminal in the frontend and backend folders present inside the root directory.
Type the following command in both terminals: "npm run dev."
Access the frontend on http://localhost:3000/.
To test the application:
Visit the "http://localhost:3000/" URL.

You can also access db using the Mongodb URL in robo3t or Mongodb compass.
For testing you can either create a new user via Postman from the route post:
http://localhost:8000/add-user
or 
you can use the following user credentials:
   "userName":"tejaas7",
    "password": "password"
