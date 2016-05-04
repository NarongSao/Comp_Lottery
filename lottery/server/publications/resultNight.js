// Publication
Meteor.publish('lottery_resultNight', function () {
    this.unblock();
    if (this.userId) {
        return Lottery.Collection.ResultNight.find();
    }
    this.ready();
});

