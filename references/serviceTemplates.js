const serviceTemplates = {
    netflix:{},
    hulu:{},
    disneyplus:{},
    hbomax:{}
}

exports.getServiceTemplate = (serviceName) =>{
    return serviceTemplates[serviceName];
}

exports.serviceSupported = (serviceName) => {
    if (typeof serviceTemplates[serviceName] === 'object') {
        console.log("here" + serviceTemplates[serviceName]);
        return true;
    }
    return false;
}

