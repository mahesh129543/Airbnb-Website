const mongose = require('mongoose');
const Schema = mongose.Schema;

const listingSchema = new Schema({
    title:{ 
        type: String,
        required: true,
    },  
    description: String,
    image:[{
        filename: String,
        url:String,
       
set:(v) => v==="" ? "https://in.images.search.yahoo.com/search/images;_ylt=AwrKD20VURtohwIAibu7HAx.;_ylu=Y29sbwNzZzMEcG9zAzEEdnRpZAMEc2VjA3BpdnM-?p=image+unsplash&fr2=piv-web&type=E210IN885G0&fr=mcafee#id=0&iurl=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1562170824-b547dae88b97%3Fixlib%3Drb-1.2.1%26q%3D80%26fm%3Djpg%26crop%3Dentropy%26cs%3Dtinysrgb%26w%3D1080%26fit%3Dmax%26ixid%3DeyJhcHBfaWQiOjEyMDd9&action=click" : v,
    }],
    price: Number,
    location: String,
    country: String,
});

const Listing = mongose.model('Listing', listingSchema);

module.exports = Listing;