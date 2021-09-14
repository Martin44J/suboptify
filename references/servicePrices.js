const defaultPrices = {
    netflix: 8.99,
    hulu: 6.99,
    hbomax: 9.99,
    disneyplus: 7.99
}

const yearlyPrices = {
    disneyplus: 79.99,
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

exports.getPrice = (serviceName,servicePreferences) => {
    // for (const property in object) {
}