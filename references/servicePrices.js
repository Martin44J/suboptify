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
        if(userServicePreferences.numPeople > 2 || userServicePreferences.ultrahdNecessary || userServicePreferences.numDownloads > 2){
        //premium
            return ultraPremiumPrices[serviceName];
        } else if(userServicePreferences.numPeople == 2 || userServicePreferences.hdNecessary || userServicePreferences.numDownloads == 2){
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
        if (userServicePreferences.payYearly && (userServicePreferences.moviePremieres || userServicePreferences.allowDownloads || userServicePreferences.ultrahdNecessary || userServicePreferences.noAds)) {
            return {yearlyPrice: yearlyPricesPremium[serviceName],type:"yearly"};
        } else if (userServicePreferences.payYearly) {
            return {yearlyPrice: yearlyPrices[serviceName],type:"yearly"};
        } else if(userServicePreferences.moviePremieres || userServicePreferences.allowDownloads || userServicePreferences.ultrahdNecessary || userServicePreferences.noAds){
            return premiumPrices[serviceName];
        }else{
            return defaultPrices[serviceName];
        }
    }

    if (serviceName==="disneyplus") {
        if (userServicePreferences.payYearly) {
            return {yearlyPrice: yearlyPrices[serviceName],type:"yearly"};
        } else {
            return defaultPrices[serviceName];
        }
    }
    
}