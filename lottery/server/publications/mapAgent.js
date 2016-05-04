Meteor.publish('lottery_mapAgent', function () {
    this.unblock();
    if (this.userId) {
        return Lottery.Collection.MapAgent.find();
        //return Lottery.Collection.Location.find({}, {removed: true}); // for soft remove
    }

    this.ready();
});
