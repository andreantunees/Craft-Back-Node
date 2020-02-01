const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let RecentSearchSchema = new Schema({
    postcode: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    long: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const RecentSearch = mongoose.model('RecentSearch', RecentSearchSchema)

module.exports = RecentSearch;