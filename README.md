Tech stack and libraries used in the project:

1. **Frontend**
    i. Framework: Next.js
    ii. Libraries:
        a. Formik: for form validation
        b. Sass: for styling components
        c. react-toastify: for displaying success and error messages
        d. SWR: for fetching API data
        e. Axios: for making HTTP requests
        f. Material-UI: styling library used for the table

2. **Backend**
    i. Framework: Express.js
    ii. Database: MongoDB
    iii. Runtime environment: Node.js
    iv. Libraries:
        a. CORS: for allowing HTTP requests to access code's routes
        b. express-validator: for validating input fields
        c. Mongoose: for connecting with MongoDB and creating schemas
        d. Jsonwebtoken: for authentication
        e. bcryptjs: for password hashing

Note: Docker was used for containerizing both frontend and backend.

To run the code via docker-compose, follow these steps:

1. Open PowerShell/CMD in the root directory, i.e., "grocery-website."
2. Start Docker Desktop on the local machine.
3. Type the command "docker-compose up."
4. Access the frontend on http://localhost:3000/.

*If you do not have Docker Desktop installed locally, use the CMD method shown below.*

To run the code via the terminal, follow these steps:

1. Open PowerShell/CMD terminal in frontend and backend folders present inside the root directory.
2. Type the following command in both terminals: "npm run dev."
3. Access the frontend on http://localhost:3000/.

To test the application:

1. Visit the "http://localhost:3000/" URL.
2. The GET route is tested on load; a table is visible, showing all the entries made in the database.
3. To add an item to the list, click the "add grocery" button, which will display an input form.
4. In the input field, first, write the name of the grocery, and then in the quantity field, add the number of items.
5. Click on the submit button.
6. On successful submission, a toast message is shown in the top-right corner of the screen.

*You can also access db using the mongodb url in robo3t or mongodb compass*
