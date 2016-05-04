// Publication
Meteor.publish('lottery_betByAgent', function (agentId) {
    this.unblock();
    if (this.userId) {
        check(agentId, String);
        return Lottery.Collection.Bet.find({agentId: agentId}, {removed: true});
    }

    this.ready();
});

Meteor.publish('lottery_betById', function (id) {
    this.unblock();
    if (this.userId) {
        check(id, String);
        return Lottery.Collection.Bet.find({_id: id}, {removed: true});
    }
    this.ready();
});
