//require
const express = require("express");
const app = express();

/////connection to database ////////


///// Middleware////////////
const fruits = ['apple', 'banana', 'pear'];


//////routes//////
//I.N.D.U.C.E.S
//Index, New, Delete, Update, Create, Edit, Show

//Index
app.get('/fruits/', (req, res) => {
    res.send(fruits);
});
//New

//Delete

//Update

//Create

//Edit

//Show



///////port to listen
app.listen(3000,() => {
    console.log('listening');
});