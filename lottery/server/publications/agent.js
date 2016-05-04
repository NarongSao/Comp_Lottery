// Publication
//Meteor.publish('lottery_customer', function (branchId) {
//    this.unblock();
//    if (this.userId) {
//        var selector = {};
//        if (!_.isUndefined(branchId)) {
//            selector.branchId = branchId;
//        }
//
//        return Lottery.Collection.Customer.find(selector, {removed: true});
//    }
//
//    this.ready();
//});

Meteor.publish('lottery_agentById', function (id) {
    this.unblock();
    if (this.userId) {
        check(id, String);

        return Lottery.Collection.Agent.find({_id: id});
    }
    this.ready();
});

Meteor.publish('lottery_agent', function () {
    this.unblock();
    if (this.userId) {
        return Lottery.Collection.Agent.find();
    }
    this.ready();
});
