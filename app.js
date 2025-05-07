const express = require('express');
const app = express();
const mongoose = require('mongoose');
// app.js
const Listing = require('./models/listing');
const path = require('path'); // ✅ correct path

const MONGO_url="mongodb://127.0.0.1:27017/wanderlust"
main().then( () =>
     console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

async function main() {
    await mongoose.connect(MONGO_url);
}
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));    
app.get('/', (req, res) => {
    res.send('my name is mahesh!');
});
app.get('/listings', async(req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index.ejs", {listings}); //res.send(listings);
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









 