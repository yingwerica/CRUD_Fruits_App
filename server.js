//require
require('dotenv').config();
const express = require("express");
const app = express();
const Fruit = require('./models/fruits')
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());


/////connection to database ////////
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});


///// Middleware////////////
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
app.use(express.urlencoded({extended:false})); // enable access of req.body
app.use(methodOverride('_method')); // enable to let forms make delete request

//////routes//////
//I.N.D.U.C.E.S
//Index, New, Delete, Update, Create, Edit, Show

//Index
app.get("/fruits", (req, res) => {
    Fruit.find({}, (error, allFruits) => {
      res.render("Index", {
        fruits: allFruits,
      });
    });
  });

//New
//the new form will send POST request
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

//Delete
app.delete('/fruits/:id', (req, res)=>{
    Fruit.findByIdAndRemove(req.params.id, (err, data)=>{
      res.redirect('/fruits');
    })
});

//Update
//update data in the database when there is a PUT request from the edit page
app.put('/fruits/:id', (req, res)=>{
  if(req.body.readyToEat === 'on'){
      req.body.readyToEat = true;
  } else {
      req.body.readyToEat = false;
  }
  Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit)=>{
     console.log(updatedFruit)
    res.redirect(`/fruits/${req.params.id}`);
  });
});


//Create
//add new fruit data to database when there is a POST request
app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    Fruit.create(req.body, (error, createdFruit)=>{
        res.redirect('/fruits');
    });
});

//Edit
//the edit form will send PUT request
app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
      res.render('Edit', { fruit : foundFruit})
    })
})

//Show
app.get("/fruits/:id", (req, res) => {
    Fruit.findById(req.params.id, (err, foundFruit) => {
      res.render('Show', {
        fruit: foundFruit
      });
    });
  });


///////port to listen---use nodemon to make the server continue running
app.listen(3000,() => {
    console.log('listening');
});