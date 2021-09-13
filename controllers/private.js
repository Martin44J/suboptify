const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const axios = require("axios");

exports.getPrivateData = (req,res,next) =>{
    // console.log(req.user);
    res.status(200).json({success:"true", data: "You got access to the private data on this route"});
}

exports.watchlist = (req,res,next) =>{
    const user = req.user;
    // console.log(user);
    res.status(200).json({sucess: "true", user: user});
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
        await axios.get(url)
            .then(response => {
                showId = response.data.results[0].id;
                mediaType=response.data.results[0].media_type;
            })
            .catch(error => {
                return next( new ErrorResponse("Could not find this show or movie", 404));
            });
        
        if (mediaType == 'movie') {
            url = "https://api.themoviedb.org/3/movie/"+showId+"?api_key=35be80a71bda97d96bfd9af67a1af4cd&language=en-US&append_to_response=watch%2Fproviders";
        } else {
            url = "https://api.themoviedb.org/3/tv/"+showId+"?api_key=35be80a71bda97d96bfd9af67a1af4cd&language=en-US&append_to_response=watch%2Fproviders";
        }
        let show = {
            title: ""
        }

        await axios.get(url)
            .then(response => {
                if (mediaType == 'movie') {
                    show.title = response.data.title;
                } else {
                    show.title = response.data.name;
                }
        });
        user.shows.map((userShow)=>{
            if (userShow.title === show.title) {
                return next( new ErrorResponse("\'"+show.title + "\' is already in your watchlist", 404));
            }
        })
        user.shows = [...user.shows,show];
        
        await user.save();
        console.log(user);

        
        res.status(201).json({
            sucess: true,
            data: "Watchlist has been updated",
            user: user
        })
    }catch(error){
        next(error);
    }
    

}