const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
const Genre = require("./models/genres");
const Artist = require("./models/artists");
const Movie = require("./models/movies");
const User = require("./models/users");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {ObjectId}=mongoose.Schema
const corsOptions = {
  exposedHeaders: "access-token",
};
app.use(cors(corsOptions));
mongoose
  .connect(
    "mongodb+srv://bhusan:test1234@cluster0.xttkb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then((result) => {
    console.log("Data base connected");
  })
  .then((res) => {
    app.listen(8085, () => {
      console.log("Server is up and running");
    });
  });

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "Bhusan login auth", {
    expiresIn: maxAge,
  });
};

// This api is used to get the genres data
app.get("/api/genres", (req, res) => {
  Genre.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

app.get("/api/artists", (req, res) => {
  Artist.find()
    .then((result) => res.send(result))
    .catch((err) => res.send(err));
});

// app.get('/api/movies/:id/shows',async (req,res)=>{
//     try{

//     }
// })

app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (err) {
    res.status(400).send({ err });
  }
});
app.get("/api/movies/:id", async (req, res) => {
  try {
    const shows = await Movie.find({ movieid: req.params.id });
    // const {shows}=movie
    res.status(200).send(shows);
    // .populate('artists.artistId').
    // exec(function (err, story) {
    //   if (err) return handleError(err);
    //   console.log('The author is %s', story);
    //   res.send(story)
    // })
    // res.send(movie)
  } catch (err) {
    res.send(err);
  }
});

app.get("/api/movies/:id/shows", async (req, res) => {
  try {
    const shows = await Movie.find({ movieid: req.params.id }).select("shows");
    // const {shows}=movie
    res.status(200).send(shows);
    // .populate('artists.artistId').
    // exec(function (err, story) {
    //   if (err) return handleError(err);
    //   console.log('The author is %s', story);
    //   res.send(story)
    // })
    // res.send(movie)
  } catch (err) {
    res.send(err);
  }
});

// Post Routes

// Genres post route
app.post("/api/genres", async (req, res) => {
  const { genreid, genre } = req.body;
  try {
    const generes = await Genre.create(req.body);
    res.status(201).json({ generes });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//Artist Post route

app.post("/api/artists", async (req, res) => {
  try {
    const artists = await Artist.create(req.body);
    res.status(201).json({ artists });
  } catch (err) {
    res.status(400).json({ err });
  }
});

// Movie Post route

app.post("/api/movies", async (req, res) => {
  const {
    movieid,
    title,
    published,
    released,
    poster_url,
    release_date,
    publish_date,
    artists,
    genres,
    duration,
    critic_rating,
    trailer_url,
    wiki_url,
    story_line,
    shows,
  } = req.body;
  try {
    // const movies = await Movie.create({
    //     movieid,
    //     title,
    //     published,
    //     released,
    //     poster_url,
    //     release_date,
    //     publish_date,
    //     artists,
    //     genres,
    //     duration,
    //     critic_rating,
    //     trailer_url,
    //     wiki_url,
    //     story_line,
    //     shows,
    //   });
    const movie = await Movie.insertMany(req.body);
    res.status(201).json({ movie });
  } catch (err) {
    res.status(400).json({ err });
  }
});

//Register Route
app.post("/api/auth/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({ message: "Registration Successful. Please Login!" });
  } catch (err) {
    res.status(400).send(err);
  }
});

//Login
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      if (user.password === password) {
        const tokenvalue = createToken(user._id);
        const token = jwt.sign(tokenvalue, "Hello world");
        const uuid = uuidv4();
        let userData = await User.findOneAndUpdate(
          { username },
          { accesstoken: token, isLoggedIn: true, uuid: uuid }
        );
        res.header("access-token", token);
        res.status(200).json({
          _id: userData._id,
          isLoggedIn: userData.isLoggedIn,
        });
      }
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/api/logout", async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await User.findByIdAndUpdate(_id, {
      accesstoken: "",
      isLoggedIn: false,
    });
    res.status(200).json({ isLoggedIn: user.isLoggedIn });
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Booking api
app.post("/api/bookings", verifyToken, async (req, res) => {
  const { _id,coupon_code,show_id,tickets } = req.body;
  var newId2 = new mongoose.mongo.ObjectId();
  try {
    const user = await User.findOneAndUpdate(
      { _id: _id },
      {
        $push: { bookingRequests: {_id:newId2,coupon_code,show_id,tickets} },
      }
    );
    res.status(200).json({unique:newId2});
  } catch (err) {
    res.status(400).json({ err: "Error", message: "Something went wrong" });
  }
});

//Get Coupons
app.get('/api/coupons',async (req,res)=>{
  try{
    const user=User.findById({_id:req.params.id}).select("coupens")
    res.send(user);
  }catch(err){
    res.status(400).json({err})
  }
})

//Movie Found
app.get("/movies", async (req, res) => {
  const movie = await Movie.find({
    $or: [
      { title: req.query.title },
      { genres: req.query.generes },
      { artists: req.query.artists },
      {release_date:req.query.start_date},
      {publish_date:req.query.end_date}
    ],
  });
  res.send(movie)
});

function verifyToken(req, res, next) {
  const bearerHeader = req.header("access-token");
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    try {
      const verified = jwt.verify(bearerToken, "Hello world");
      req.user = verified;
      next();
    } catch (err) {
      res.status(400).send("invalid token");
    }
  } else {
    return res.status(401).send("access denied");
    // res.status(403);
  }
}
