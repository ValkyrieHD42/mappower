export class Borne {

    constructor(json) {
        this.title = json['AddressInfo']['Title'];
        this.locationDetails = new LocationDetails(json);
        this.operatorDetails = new OperatorDetails(json);
        this.usageDetails = new UsageDetails(json);
        this.dataprovider = new DataProvider(json);
        this.powerConnections = new Array();
        if(json['Connections'] != null) {
            json['Connections'].map(equipment => {
                this.powerConnections.push(new PowerConnection(equipment));
            })
        }
    }
}

export class LocationDetails {

    constructor(json) {
        if(json['AddressInfo']) {
            this.latitude = json['AddressInfo']['Latitude'];
            this.longitude = json['AddressInfo']['Longitude'];
            this.address = json['AddressInfo']['AddressLine1'];
            this.city = json['AddressInfo']['Town'];
            this.postalCode = json['AddressInfo']['Postcode'];
            this.country = json['AddressInfo']['Country']['Title'];
        }
    }
}

export class UsageDetails {

    constructor(json) {
        this.operationalStatus = null;
        if(json['StatusType']) {
            this.operationalStatus = json['StatusType']['IsOperational'];
        }
        this.usageType = null;
        if(json['UsageType']) {
            this.usageType = json['UsageType']['Title'];
        }
        this.usageCost = json['UsageCost'];
    }
}

export class OperatorDetails {

    constructor(operatorJson) {
        if(operatorJson['OperatorInfo']) {
            this.name = operatorJson['OperatorInfo']['Title'];
            this.website = operatorJson['OperatorInfo']['WebsiteURL'];
            this.phone = operatorJson['OperatorInfo']['PhonePrimaryContact'];
            this.contactEmail = operatorJson['OperatorInfo']['ContactEmail'];
            this.savEmail = operatorJson['OperatorInfo']['FaultReportEmail'];
        }

    }
}

export class DataProvider {
    constructor(providerJson) {
        if(providerJson['DataProvider']) {
            this.title = providerJson['DataProvider']['Title'];
            this.website = providerJson['DataProvider']['WebsiteURL'];
            this.license = providerJson['DataProvider']['License']
        }

    }
}

export class PowerConnection {

    constructor(connectionJson) {
        this.currentType = connectionJson['CurrentType'] ? connectionJson['CurrentType']['Title'] : null;
        this.amps = connectionJson['Amps'];
        this.voltage = connectionJson['Voltage'];
        this.power = connectionJson['PowerKW'];
        this.quantity = connectionJson['Quantity'];
        this.title = connectionJson['ConnectionType'] ? connectionJson['ConnectionType']['Title'] : null;
    }
}