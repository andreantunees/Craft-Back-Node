const axios = require('axios');
const searchModel = require('../models/RecentSearch');

module.exports = {

    async findByCode (req, res) {
        
        const { code } = req.params;
        
        axios.get(process.env.API_POSTCODE + code)
            .then( response => {

                var location = {
                    lat: response.data.result.latitude,
                    long: response.data.result.longitude,
                    country: response.data.result.country,
                    region: response.data.result.region,
                    latStart: parseFloat(process.env.LAT_HEATHROW),
                    longStart: parseFloat(process.env.LONG_HEATHROW)
                };

                const search = new searchModel({
                    postcode: code,
                    lat: location.lat,
                    long: location.long,
                    country: location.country,
                    region: location.region
                });

                search.save();

                return res.send(location);
            })
            .catch(error => {
                return res.status(400).json({ message : "We have a problem" })
            });        
    },

    async getRecentSearch (req, res){
        try{

            await searchModel.find({})
                .sort({createdAt: 'desc'})
                .limit(3)
                .exec( (err, docs) => {
                    var locations = {
                        postCodes: docs,
                        latStart: parseFloat(process.env.LAT_HEATHROW),
                        longStart: parseFloat(process.env.LONG_HEATHROW)
                    }

                    return res.send(locations);
                });
        }
        catch(err){
            return res.status(400).json({ message : "We have a problem" });
        }
    },
};