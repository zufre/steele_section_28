var express = require("express");
var app = express();
var bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

var campgrounds =[
  {name: 'Salomon Creek', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
  {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  {name: 'Mountain Goat\'s Rest', image: 'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg'},
  {name: 'Salomon Creek', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
  {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  {name: 'Mountain Goat\'s Rest', image: 'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg'},
  {name: 'Salomon Creek', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
  {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  {name: 'Mountain Goat\'s Rest', image: 'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg'},
  {name: 'Salomon Creek', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
  {name: 'Granite Hill', image: 'https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg'},
  {name: 'Mountain Goat\'s Rest', image: 'https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg'}

  ]

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  res.render('campgrounds',{campgrounds:campgrounds});  
});

app.post('/campgrounds', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");

});

app.get('/campgrounds/new', function(req, res) {
  res.render('new.ejs');
});

app.listen(3000,  process.env.IP, function() {
  console.log('The YelpCamp server has started');
})