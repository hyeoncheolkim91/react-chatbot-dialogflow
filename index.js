const express = require('express');
const app = express();
const config = require("./server/config/keys");

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static("public"));


app.use('/api/dialogflow', require('./server/routes/dialogflow'));

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {

  // Set static folder
  app.use(express.static("client/build"));

  // index.html for all page routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
