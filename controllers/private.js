const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const axios = require("axios");
const {getPrice,calculatePrice,getCheapestServices} = require("../references/servicePrices");

exports.getPrivateData = (req,res,next) =>{
    res.status(200).json({success:"true", data: "You got access to the private data on this route"});
}

exports.preferences = (req,res,next) => {
    try {
        const user = req.user;
        if(!user){
            return next( new ErrorResponse("User not found", 404));
        }
        let serviceCombination = getCheapestServices(user.shows,user.preferences,calculatePrice);
        let userServices = [];
        for (let i = 0; i<serviceCombination.length; i++) {
            userServices.push({
                ...user.preferences[serviceCombination[i].name],
                displayName: serviceCombination[i].displayName
            });
        }
        res.status(200).json({sucess: "true", preferences: user.preferences, userServices: userServices});
    } catch(error) {
        console.log(error);
        next(error);
    }
}

exports.preferencesChanged = async(req,res,next) => {
    try {
        const user = req.user;
    } catch(error) {
        next(error);
    }
}
exports.watchlist = (req,res,next) =>{
    try {
        const user = req.user;
        if(!user){
            return next( new ErrorResponse("User not found", 404));
        }
        let serviceCombination = getCheapestServices(user.shows,user.preferences,calculatePrice);
        let serviceCombinationPrice = calculatePrice(serviceCombination,user.preferences);
        res.status(200).json({sucess: "true", user: user, serviceCombination: serviceCombination,
        serviceCombinationPrice: serviceCombinationPrice});
    } catch(error) {
        next(error);
    }
}

exports.removeFromWatchlist = async(req,res,next) =>{
    try {
        user = req.user;
        if(!user){
            return next( new ErrorResponse("User not found", 404));
        }
        user.shows.splice(req.body.id,1);
        await user.save();
        let serviceCombination = getCheapestServices(user.shows,user.preferences,calculatePrice);
        let serviceCombinationPrice = calculatePrice(serviceCombination,user.preferences);
        res.status(201).json({
            sucess: true,
            data: "Watchlist has been updated",
            user: user,
            serviceCombination: serviceCombination,
            serviceCombinationPrice: serviceCombinationPrice
        });
    } catch(error) {
        next(error);
    }
}   

exports.addToWatchlist = async(req,res,next) =>{
    try{

        user = req.user;

        if(!user){
            return next( new ErrorResponse("User not found", 404));
        }

        let showId = 0;
        let mediaType = "";
        const showQuery = req.body.showQuery;
        let url = "https://api.themoviedb.org/3/search/multi?api_key=35be80a71bda97d96bfd9af67a1af4cd&language=en-US&query="+showQuery+"&page=1&include_adult=false";
        //getting the show id
        await axios.get(url)
            .then(response => {
                showId = response.data.results[0].id;
                mediaType=response.data.results[0].media_type;
            })
            .catch(error => {
                return next( new ErrorResponse("Could not find this show or movie", 404));
            });
        //checking if a show was found
        if (!(showId===0)) {
            if (mediaType == 'movie') {
                url = "https://api.themoviedb.org/3/movie/"+showId+"?api_key=35be80a71bda97d96bfd9af67a1af4cd&language=en-US&append_to_response=watch%2Fproviders";
            } else {
                url = "https://api.themoviedb.org/3/tv/"+showId+"?api_key=35be80a71bda97d96bfd9af67a1af4cd&language=en-US&append_to_response=watch%2Fproviders";
            }
            let show = {
                title: "",
                services:[]
            }
            //getting show details and services
            await axios.get(url)
                .then(response => {
                    if (mediaType == 'movie') {
                        show.title = response.data.title;
                    } else {
                        show.title = response.data.name;
                    }
                    let servicesArray = [];
                    //making an array of all the services for the given show
                    if (response.data['watch/providers'].results.US == null) {
                        const networks = response.data.networks;
                        if (networks != null) {
                            networks.forEach(function (network) {
                                if (network.name == "Disney Plus") {
                                    network.name = "Disney+";
                                }
                                servicesArray.push(network.name);
                            });
                        } 
                    } else {
                        const buyProviders = response.data['watch/providers'].results.US.buy;
                        const rateProviders = response.data['watch/providers'].results.US.flatrate;
                        const rentProviders = response.data['watch/providers'].results.US.rent;
                        if (buyProviders != null) {
                            buyProviders.forEach(function (buyProvider) {
                                if (buyProvider.provider_name == "Disney Plus") {
                                    buyProvider.provider_name = "Disney+";
                                }
                                servicesArray.push(buyProvider.provider_name);
                            });
                        }
                        if (rateProviders != null) {
                            rateProviders.forEach(function (rateProvider) {
                                if (rateProvider.provider_name == "Disney Plus") {
                                    rateProvider.provider_name = "Disney+";
                                }
                                servicesArray.push(rateProvider.provider_name);
                            });
                        }
                        if (rentProviders != null) {
                            rentProviders.forEach(function (rentProvider) {
                                if (rentProvider.provider_name == "Disney Plus") {
                                    rentProvider.provider_name = "Disney+";
                                }
                                servicesArray.push(rentProvider.provider_name);
                            });
                        }
                    }
                    //This adds to the user only if we have catalogued a service, adds a formal name and a display name
                    servicesArray.map((service)=>{
                        let formalName = service.toLowerCase();
                        while (formalName.includes(" ")) {
                            formalName = formalName.replace(" ","");
                        }
                        while (formalName.includes("+")) {
                            formalName = formalName.replace("+","plus");
                        }
                        const newService = {
                            displayName: service,
                            name: formalName
                        }
                        if (typeof user.preferences[formalName] === 'object') {
                            show.services.push(newService);
                        }
                        // show.services.push()
                    });
                    // let formalName = network.name.toLowerCase();
                    // let formalName = formalName.replaceAll(" ","");
                    // let formalName = formalName.replaceAll("+","plus");
            })
            .catch(error => {
                return next(error);
            });
            if (show.services.length === 0) {
                return next( new ErrorResponse("We found this show/movie, but it is not included in the services we have catalogued. Support coming soon.", 404));
            } else {
                let showExists = false;

                await user.shows.map((userShow)=>{
                    if (userShow.title === show.title) {
                        showExists = true;
                        return next( new ErrorResponse("\'"+show.title + "\' is already in your watchlist", 404));
                    }
                })
                if (!(showExists)) {
                    user.shows = [...user.shows,show];
                    
                    await user.save();
                    // console.log(user);
                    
                    //checking if prices have been set yet
                    if (user.preferences[show.services[0].name].price === undefined) {
                        for (const service in user.preferences) {
                            user.preferences[service].price = getPrice(service,user.preferences[service]);
                        }
                    }
                    await user.save();
                    let serviceCombination = getCheapestServices(user.shows,user.preferences,calculatePrice);
                    let serviceCombinationPrice = calculatePrice(serviceCombination,user.preferences);
                    res.status(201).json({
                        sucess: true,
                        data: "Watchlist has been updated",
                        user: user,
                        serviceCombination: serviceCombination,
                        serviceCombinationPrice: serviceCombinationPrice
                    });
                }
            }
        };
    }catch(error){
        next(error);
    }
    

}