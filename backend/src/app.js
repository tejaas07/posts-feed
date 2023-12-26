const cors = require("cors");
const Express = require("express");

const createUser = require("./routes/createUser");
const addPost = require("./routes/addPost");
const addComment = require("./routes/addComment");
const signIn = require("./routes/signInUser");
const getPost = require("./routes/getPost");
const searchQuery = require("./routes/searchText");

const app = Express();

app.use(cors({ credentials: true, origin: true }));

// Middleware to parse JSON
app.use(Express.json());

// Middleware to parse URL-encoded data
app.use(Express.urlencoded({ extended: true }));

app.use(createUser);
app.use(addPost);
app.use(addComment);
app.use(signIn);
app.use(getPost);
app.use(searchQuery);

module.exports = app;
