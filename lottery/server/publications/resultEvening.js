// Publication
Meteor.publish('lottery_resultEvening', function () {
    this.unblock();
    if (this.userId) {
        return Lottery.Collection.ResultEvening.find();
    }
    this.ready();
});

