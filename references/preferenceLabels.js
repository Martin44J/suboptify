const preferenceLabels = {
    payYearly: "Pay Yearly",
    HDRequired: "HD Required",
    ultraHDRequired: "Ultra HD Required",
    numDownloads: "Number of Devices that can Download Content",
    numConcurrent: "Number of Devices that can Watch Concurrently",
    downloadsRequired: "Able to Download Content",
    noAds: "No Advertisements",
    warnerBrosMoviePremieres: "Get Access to Warner Bros. Movie Premieres"
}

exports.getLabel = (preference) => {
    return preferenceLabels[preference];
}