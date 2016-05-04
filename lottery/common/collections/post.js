// Collection
Lottery.Collection.Post = new Mongo.Collection("lottery_post");

// Schema
Lottery.Schema.Post = new SimpleSchema({
    postName: {
        type: String,
        label: "Post name",
        autoform: {
            type: "select2",
            options: function () {
                return Lottery.List.postList();
            }
        }
    },
    payment2D: {
        type: Number,
        label: '2D payment'
    },
    payment3D: {
        type: Number,
        label: "3D payment"
    }
});

// Attach schema
Lottery.Collection.Post.attachSchema(Lottery.Schema.Post);

