Meteor.publish('lottery_endPerMonth', function () {
    this.unblock();
    if (this.userId) {
        return Lottery.Collection.EndPerMonth.find();
    }
    this.ready();
});



