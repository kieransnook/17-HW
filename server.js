const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");

const PORT = process.env.PORT || 3000

const db = require("./models")

const app = express();

app.use(morgan("dev"));

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
// app.get("/workout", (req, res) => {
//   res.sendFile(path.join(__dirname, "public/workout.html"));
// });

//routes for data
app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
      .then(dbworkout => {
          res.json(dbworkout);
      })
      .catch(err => {
        res.json(err);
      });
});


app.post("/api/workouts",(req,res) => {
  //const newWorkout =db.Workout.create()
  console.log (req.body)

  // .then(() => {
  //   //.log (dbWorkout)
  //   console.log ("from post")
  //   //.json(dbWorkout);
  // })
  // .catch(err => {res.json(err);
  // })
});


app.get("/api/workouts", (req, res) => {
  db.Workout.find()
    .then(dbWorkouts => {
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}).limit(7)
    .then(dbWorkouts => {
      console.log(dbWorkouts)
      res.json(dbWorkouts);
    })
    .catch(err => {
      res.json(err);
    });
});
app.delete("/api/workouts", ({ body }, res) => {
  db.Workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.json(err);
    });
});
app.put("/api/workouts/:id", ({ body, params }, res) => {
  db.Workout.findByIdAndUpdate(
    params.id,
    { $push: { exercises: body } },
    // "runValidators" will ensure new exercises meet our schema requirements
    { new: true, runValidators: true }
  )
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
