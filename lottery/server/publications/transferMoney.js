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

Meteor.publish('lottery_transferMoney', function () {
    this.unblock();
    if (this.userId) {
        check(id, String);
        return Lottery.Collection.TransferMoney.find();
    }

    this.ready();
});
