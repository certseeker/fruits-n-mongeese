require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

const fruits = require('./models/fruits.js')

// app.set('view engine', 'jsx');
// app.engine('jsx', require('jsx-view-engine').createEngine());
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

////View body of a post request
// The POST request to our sever has data in it (name, color, readyToEat, etc).
// We can easily access this data with a middleware function
// Tell express to use the middleware
//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

//////INDEX
app.get('/',  (req, res) => {
    res.send('<h1>Hello WISE!</h1>')
})

//////FRUIT INDEX
app.get('/fruits', (req, res) => {
    //     res.send(fruits);
    res.render('Index', {
        fruits: fruits
    });
});

///////NEW
//Page with form to create a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

//////SHOW
app.get('/fruits/:indexOfFruitsArray', (req, res) => {
    // res.send(fruits[req.params.indexOfFruitsArray]);
    res.render('Show', {
        fruit: fruits[req.params.indexOfFruitsArray]
    });

});

//////POST ROUTE
// app.post('/fruits', (req, res)=>{
//     console.log(req.body);
//     res.send('data received');
// });

//this if then statement is for a checkbox. it is called data sterilization/type cohersion. you have to warp the data to be on or off instead of true ot false. It is like categorizing the data, so you can manipulate it in a way that make sense to the computer, and to you to align correctly to get the correct results.  
// app.post('/fruits', (req, res)=>{
//     if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true; //do some data correction
//     } else { //if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false; //do some data correction
//     }
//     fruits.push(req.body);
//     console.log(fruits);
//     res.send('data received');
// });


//////CREATE
//Post Route
//Route handler to tell the browser to create a POST request to /fruits
app.post('/fruits', (req, res)=>{
    if(req.body.readyToEat === 'on'){ 
        req.body.readyToEat = true;
    } else { 
        req.body.readyToEat = false;
    }
    fruits.push(req.body);
    //redirect is going to connect you back to index
    res.redirect('/fruits'); 
});

//////EXECUTES FOR ALL ROUTES
////MiddleWare
// This is called 'middleware'
// It runs in the middle of the request response cycle (in the middle)
// sometime after the request is received, but before the final route handler is called
// Be sure to put middleware at the top of your server.js file, so that other routes don't handle the request and send the response before the middleware can be executed
// Most of the time, you won't write your own middleware, but a lot of plugins and extended functionality of express exist as middleware
app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});

const veggies = require('./models/veggies.js')

app.get("/veggies" , (req, res) => {
    res.render("/veggies/Index" , {
        veggies: veggies
    });
})

app.get('/veggies/new', (req, res) => {
    res.render('New');
});


app.get("/veggies/:indexOfVeggiesArray" , (req, res) => {
    //render always refers to a view, in this case, is the jsx file. Synthax : the file of the target view is first in parenthesis

    res.render("veggies/Show" , {
        //the first veggies is what I am naming the property
        //the second veggies after the colon is referring to the array
        //the brackets indicate we are using the data from an array
        veggies: veggies[req.params.indexOfVeggiesArray]
    });
})


// app.post('/fruits', (req, res)=>{
//     if(req.body.readyToEat === 'on'){ 
//         req.body.readyToEat = true;
//     } else { 
//         req.body.readyToEat = false;
//     }
//     fruits.push(req.body);
//     //redirect is going to connect you back to index
//     res.redirect('/fruits'); 
// });

//creating a new veggie, we use post
//this refers to the 
app.post('/veggies' , (req, res) =>{
        if(req.body.readyToEat === 'on'){ 
        req.body.readyToEat = true;
    } else { 
        req.body.readyToEat = false;
    }
    veggies.push(req.body);

})

app.listen(3000,  () => {
    console.log("Listening on Port 3000")
})

//A mnumonic device to help to remember what order to put your route in:
//!!! INDUCES
//Index, meaning the baseline route/home page
//New
//Delete
//Update
//Create
//Edit
//Show

