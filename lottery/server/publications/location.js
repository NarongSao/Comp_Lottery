// Publication
//Meteor.publish('lottery_location', function () {
//    this.unblock();
//    if (this.userId) {
//
//        return Lottery.Collection.Location.find({});
//        //return Lottery.Collection.Location.find({}, {removed: true}); // for soft remove
//    }
//
//    this.ready();
//});

Meteor.publish('lottery_locationById', function (id) {
    this.unblock();
    if (this.userId) {
        check(id, String);

        return Lottery.Collection.Location.find({_id: id});
        //return Lottery.Collection.Location.find({}, {removed: true}); // for soft remove
    }

    this.ready();
});
