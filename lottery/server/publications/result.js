// Publication
Meteor.publish('lottery_result', function (agentId) {
    this.unblock();
    if (this.userId) {
        return Lottery.Collection.Result.find();
    }

    this.ready();
});

