const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate=require('ejs-mate');
// app.js
const Listing = require('./models/listing');
const path = require('path');
const methodOverride = require('method-override'); // ✅ correct path

const MONGO_url="mongodb://127.0.0.1:27017/wanderlust"
main().then( () =>
     console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

async function main() {
    await mongoose.connect(MONGO_url);
}
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('my name is mahesh!');
});
//index route
app.get('/listings', async(req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", {listings}); //res.send(listings);
    });
    //new route
    app.get('/listings/new', (req, res) => {
        res.render("listings/new");
      });
    //show route
  app.get('/listings/:id', async(req, res) => {
     let {id} = req.params;  
     const listing = await Listing.findById(id); 
     res.render("listings/show", {listing});   
  });
  //create route
 app.post('/listings', async (req, res) => {
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    console.log("Saved:", newlisting); // ✅ Add this
    res.redirect("/listings");
});
//edit route
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});
//update route
app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
});
//delete route
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
   let deletedlisting =await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect('/listings');
});



  

// app.get('/testListing', async(req, res) => {
//     let sampleListing = new Listing({
//         title: 'my new villa',
//         description: 'by the beach',
//         price: 1000,
//         location: 'Maldives',
//         country: 'Maldives'
//     })
//    await sampleListing.save().then(() => console.log('Listing saved')).catch(err => console.log(err)); 
//     console.log('Listing saved');
//     res.send('success');
// });

app.listen(8080, () =>{ 
    console.log('Server running on port 8080')
});









 