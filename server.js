require('dotenv').config({path: "./config.env"});
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const path = require('path')


//Connect to the db
connectDB();

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));

//Error handler as last piece of middleware
app.use(errorHandler);

app.use(express.static(path.join(__dirname, 'build')));


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


const server = app.listen(process.env.port, () => console.log('Server running on Port ' + process.env.port));

process.on("unhandledRejection", (err, promise)=>{
    console.log(`Logged Error: ${err}`);
    server.close(() =>process.exit(1));
})