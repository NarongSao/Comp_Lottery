Meteor.methods({
    getPostById: function(id){
        return Lottery.Collection.Post.findOne(id);
    }
})