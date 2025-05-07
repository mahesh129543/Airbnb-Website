const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('../models/listing.js');
const MONGO_url="mongodb://127.0.0.1:27017/wanderlust"
main().then( () =>
     console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));
async function main() {
    await mongoose.connect(MONGO_url);
}

app.get('/', (req, res) => {
    res.send('my name is mahesh!');
});

app.get('/testListing', async(req, res) => {
    let sampleListing = new Listing({
        title: 'my new villa',
        description: 'by the beach',
        price: 1000,
        location: 'Maldives',
        country: 'Maldives'
    })
   await sampleListing.save().then(() => console.log('Listing saved')).catch(err => console.log(err)); 
    console.log('Listing saved');
    res.send('success');
});

app.listen(8080, () =>{ 
    console.log('Server running on port 8080')
});









 