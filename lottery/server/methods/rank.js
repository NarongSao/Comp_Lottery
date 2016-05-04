Meteor.methods({
    getRankById: function(id){
        return Lottery.Collection.Rank.findOne(id);
    }
})