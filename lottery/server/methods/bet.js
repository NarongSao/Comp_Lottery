Meteor.methods({
    lottery_betById: function (id) {
        var data = Lottery.Collection.Bet.findOne(id);
        data.betDate = moment(data.betDate).format('YYYY-MM-DD');
        return data;
    }
});