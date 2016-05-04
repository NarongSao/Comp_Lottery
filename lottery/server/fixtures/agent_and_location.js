var branchId = '001';

Factory.define('location', Lottery.Collection.Location, {
    _id: function () {
        var locationId = idGenerator.gen(Lottery.Collection.Location, 4);
        return locationId;
    },
    name: function () {
        return faker.address.city();
    }
});

Factory.define('agent', Lottery.Collection.Agent, {
    _id: function () {
        var agentId = idGenerator.genWithPrefix(Lottery.Collection.Agent,
            branchId + '-', 6);
        return agentId;
    },
    name: function () {
        return faker.name.findName()
    },
    gender: function () {
        return faker.random.arrayElement(['M', 'F']);
    },
    dob: function () {
        return moment(faker.date.past()).format('YYYY-MM-DD');
    },
    telephone: function () {
        return faker.phone.phoneNumber();
    },
    email: function () {
        faker.internet.email();
    },
    locationId: function () {
        var location = Factory.create('location');
        return location._id;
    },
    branchId: branchId
});
