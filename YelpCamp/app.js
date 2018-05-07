var express       = require("express"),
    app           = express(),
    bodyparser    = require("body-parser"),
    mongoose      = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema );

// Campground.create(
//   { 
//     name:"Granite Hill",  
//     image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg',
//     description: "This is a huge granite hill, no bathrooms. No water. Beautyful granit"
//   },
//   function(err, campground){
//     if(err) {
//       console.log(err);
//     }else{
//       console.log("Newly created Campground: ")
//       console.log(campground)
//     }
//   });


app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log("error");  
    }else{
      res.render('index',{campgrounds:allCampgrounds});  
    }
  });
});

app.post('/campgrounds', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description
  var newCampground = {name: name, image: image, description: desc};
  Campground.create(newCampground, function(err, newlyCreated){
    if(err) {
      console.log(err);
    }else{
      res.redirect("/campgrounds");
    }
  });
});

app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

app.get('/campgrounds/:id', function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    }else{
      res.render("show", {Campground: foundCampground});
    }
  });
  
});

app.listen(3000,  process.env.IP, function() {
  console.log('The YelpCamp server has started');
})