/***** Before */
Lottery.Collection.Post.before.insert(function (userId, doc) {

    doc._id = idGenerator.genWithPrefix(Lottery.Collection.Post, "", 6);
    return doc;
});

Lottery.Collection.Post.before.update(function (userId, doc, fieldNames, modifier, options) {


});
