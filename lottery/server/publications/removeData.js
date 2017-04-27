Meteor.publish('lottery_removeData', function () {
    this.unblock();
    if (this.userId) {
        return Lottery.Collection.RemoveData.find();
    }
    this.ready();
});



