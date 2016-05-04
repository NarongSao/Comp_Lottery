Meteor.publish('lottery_endOfProcess', function () {
    this.unblock();
    if (this.userId) {
        return Lottery.Collection.EndOfProcess.find();
    }
    this.ready();
});



