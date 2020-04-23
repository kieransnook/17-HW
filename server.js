const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT || 3000

const db = require("./models")

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  
});

// routes
// route for index page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});
// route for exercise page
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public/exercise.html"));
});
// route for stats page
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public/stats.html"));
});
//route for workout page
app.get("/workout", (req, res) => {
  res.sendFile(path.join(__dirname, "public/workout.html"));
});

//routes for data
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
      .then(dbWorkout => {
          res.json(dbWorkout);
      })
});


app.post("/api/workouts",(req,res) => {
  db.Workout.create({})
  .then(dbWorkout => {
    res.json(dbWorkout);
  })
  .catch(err => {res.json(err);
  })
});


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
