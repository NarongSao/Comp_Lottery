/***** Before */
Lottery.Collection.Location.before.insert(function (userId, doc) {
    doc._id = idGenerator.genWithPrefix(Lottery.Collection.Location,"",4);
    return doc;
});
Lottery.Collection.Location.before.update(function (userId, doc, fieldNames, modifier, options) {
    var detail=[];
    _.each(modifier.$set.detail, function (obj, key) {
        if (obj != null) {
            detail.push(obj);
        }
    });
    modifier.$set.detail = detail;
});
