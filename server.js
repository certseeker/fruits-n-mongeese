require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')

const methodOverride = require('method-override')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})


// because we are using the capital F's which is the naming convention for models, wwhile initially, our f's were lowercase due to the fruits.js file, we not much change all of our fruits to Fruit to match the mode Fruit.js file. 
const Fruit = require('./models/Fruit.js')

// app.set('view engine', 'jsx');
// app.engine('jsx', require('jsx-view-engine').createEngine());
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

//add method override
app.use(methodOverride('_method'));

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

//////FRUIT INDEX, if ia am not using mongo
// app.get('/fruits', (req, res) => {
//     //     res.send(fruits);
//     res.render('Index', {
//         fruits: fruits
//     });
// });

app.get('/fruits', (req, res) => {
    Fruit.find({})
      .then((allFruit) => {
        res.render('Index', {
          fruits: allFruit
        })
      })
      .catch(error => {
        console.error(error)
      })
  })

///////NEW
//Page with form to create a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

app.delete('/fruits/:id', (req, res)=>{
    Fruit.deleteOne({_id: req.params.id})
    .then(info => {
        console.log(info)
        res.redirect('/fruits')
    })
    // res.send('deleting...');
});

//Update
app.put('/fruits/:id', (req, res) => {
    if (req.body.readyToEat === 'on') {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
  
    Fruit.updateOne({ _id: req.params.id }, req.body)
      .then(info => {
        console.log(info);
        res.redirect(`/fruits/${req.params.id}`)
      })
  })

//////CREATE
//Post Route
//Route handler to tell the browser to create a POST request to /fruits
app.post('/fruits', (req, res) => {
    if (req.body.readyToEat === 'on') {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
  
    Fruit.create(req.body)
      .then((createdFruit) => {
        res.redirect('/fruits')
      })
      .catch(error => {
        console.error(error)
      })
  });

//seed
app.get('/fruits/seed', (req, res) => {
    Fruit.insertMany([
      {
        name: 'grapefruit',
        color: 'pink',
        readyToEat: true
      },
      {
        name: 'grape',
        color: 'purple',
        readyToEat: false
      },
      {
        name: 'avocado',
        color: 'green',
        readyToEat: true
      }
    ])
  })


//Edit
app.get('/fruits/:id/edit', (req, res) => {
    Fruit.findOne({ _id: req.params.id })
      .then(foundFruit => {
        res.render(
          'Edit',
          {
            fruit: foundFruit
          }
        )
      })
      .catch(error => console.log(error))
  })




//////SHOW this was for the format without Mongo
// app.get('/fruits/:indexOfFruitsArray', (req, res) => {
//     // res.send(fruits[req.params.indexOfFruitsArray]);
//     res.render('Show', {
//         fruit: fruits[req.params.indexOfFruitsArray]
//     });

// });
//when you see an underscore and then the name, it grabs the unique _id that is set by MongoDB. this is better to use bc it specifcally targets that item. you caould also say name, ect or another category on the schema (without an _, id is the on;y part that needs and underscore), but it will grab all the items with that identifyer. Depending on what you are trying to get that may be too much.  
app.get('/fruits/:id', (req, res) => {
    Fruit.findOne({ _id: req.params.id })
      .then((foundFruit) => {
        res.render('Show', {
          fruit: foundFruit
        })
      })
      .catch(error => {
        console.error(error)
      })
  })




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

