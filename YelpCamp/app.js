var express       = require("express"),
    app           = express(),
    bodyparser    = require("body-parser"),
    mongoose      = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs');


var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema );

// Campground.create(
//   {       name: 'Granite Hill', 
//           image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'
//   }, function(err, campground) {
//     if(err) {
//       console.log("error");
//     }else{
//       console.log("newly create campground");
//       console.log(campground)
//     }
//   });

//var campgrounds =[
  // {name: 'Salomon Creek', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
  // {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  // {name: 'Mountain Goat\'s Rest', image: 'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg'},
  // {name: 'Salomon Creek', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
  // {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  // {name: 'Mountain Goat\'s Rest', image: 'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg'},
  // {name: 'Salomon Creek', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
  // {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  // {name: 'Mountain Goat\'s Rest', image: 'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg'},
  // {name: 'Salomon Creek', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
  // {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  // {name: 'Mountain Goat\'s Rest', image: 'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg'}

  // ]

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log("error");  
    }else{
      res.render('campgrounds',{campgrounds:allCampgrounds});  
    }
  });
});

app.post('/campgrounds', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
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

app.listen(3000,  process.env.IP, function() {
  console.log('The YelpCamp server has started');
})