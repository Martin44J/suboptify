const defaultPrices = {
    netflix: 8.99,
    hulu: 6.99,
    hbomax: 9.99,
    disneyplus: 7.99
}

const yearlyPrices = {
    disneyplus: 79.99,
    hbomax: 99.99
}

const yearlyPricesPremium = {
    hbomax: 149.99
}

const premiumPrices = {
    hulu: 12.99,
    hbomax: 14.99,
    netflix: 13.99
}

const ultraPremiumPrices = {
    netflix: 17.99
}

exports.getDefaultPrice = (serviceName) => {
    return defaultPrices[serviceName];
}

exports.getPrice = (serviceName,userServicePreferences) => {

    if (serviceName === "netflix") {
        if(userServicePreferences.numConcurrent > 2 || userServicePreferences.ultraHDRequired || userServicePreferences.numDownloads > 2){
        //premium
            return ultraPremiumPrices[serviceName];
        } else if(userServicePreferences.numConcurrent == 2 || userServicePreferences.HDRequired || userServicePreferences.numDownloads == 2){
            return premiumPrices[serviceName];
        } else {
            return defaultPrices[serviceName];
        }
    }

    if (serviceName==="hulu") {
        if (userServicePreferences.noAds) {
            return premiumPrices[serviceName];
        } else {
            return defaultPrices[serviceName];
        }
    }

    if (serviceName==="hbomax") {
        if (userServicePreferences.payYearly && (userServicePreferences.moviePremieres || userServicePreferences.downloadsRequired || userServicePreferences.ultraHDRequired || userServicePreferences.noAds)) {
            return (yearlyPricesPremium[serviceName]/12).toFixed(2)
        } else if (userServicePreferences.payYearly) {
            return (yearlyPrices[serviceName]/12).toFixed(2);
        } else if(userServicePreferences.warnerBrosMoviePremieres || userServicePreferences.downloadsRequired || userServicePreferences.ultraHDRequired || userServicePreferences.noAds){
            return premiumPrices[serviceName];
        }else{
            return defaultPrices[serviceName];
        }
    }

    if (serviceName==="disneyplus") {
        if (userServicePreferences.payYearly) {
            return (yearlyPrices[serviceName]/12).toFixed(2);
        } else {
            return defaultPrices[serviceName];
        }
    }
    
}

exports.calculatePrice = (serviceArray,preferences) => {
    let totalPrice = 0;
    serviceArray.map((service)=> {
        totalPrice += preferences[service.name].price;
    });
    return totalPrice;
}

exports.getCheapestServices = (watchlist,preferences,calculatePrice) => {
    let serviceCombinations = [];
    let ifAdded = false;
    //make all possible combinations
    if (watchlist.length>0) {
        watchlist[0].services.forEach((service) => {
            serviceCombinations.push([service]);
        });
    }

    for (let i = 1; i<watchlist.length; i++) {
      for (let u = 0; u<serviceCombinations.length; u++) {
        ifAdded = false;
        for (let j = 0; j<watchlist[i].services.length; j++) {
            if (ifAdded) {
              let newArray = [];
              for (let p = 0; p<serviceCombinations[u].length; p++) {
                newArray.push(serviceCombinations[u][p]);
              }
              newArray.splice(newArray.length-1,1,watchlist[i].services[j]);
              serviceCombinations.unshift(newArray);
              u++;
            } else {
              serviceCombinations[u].push(watchlist[i].services[j]);
              ifAdded = true;
            }
        }
      }
    }
  
    //edit out duplicates
    let finalServiceOptions = [];
    for(let i = 0; i < serviceCombinations.length; i++){
      let existingServices = [];
      let existingServicesNames = [];
      for(let j = 0; j<serviceCombinations[i].length; j++){
        if(!(existingServicesNames.includes(serviceCombinations[i][j].name))){
          existingServices.push(serviceCombinations[i][j]);
          existingServicesNames.push(serviceCombinations[i][j].name);
        }
      }
      finalServiceOptions.push(existingServices);
    }
  
    // console.log(finalServiceOptions);
    // console.log(finalServiceOptions.length);
    let bestServiceCombination=[];
    if(finalServiceOptions.length == 1){
        bestServiceCombination = finalServiceOptions[0];
    }else{
        bestServiceCombination = [];
        if(finalServiceOptions[0] != null){
        for (let i =0; i<finalServiceOptions[0].length;i++) {
            bestServiceCombination.push(finalServiceOptions[0][i]);
        }

        finalServiceOptions.forEach((currentOption, i) => {
            if(calculatePrice(bestServiceCombination,preferences) > calculatePrice(currentOption,preferences)){
                bestServiceCombination = [];
                for (let i =0; i<currentOption.length;i++) {
                    bestServiceCombination.push(currentOption[i]);
                }
            }
        });
      }
    }
    return bestServiceCombination;
    // console.log(foundUser.bestServiceCombination);
}
