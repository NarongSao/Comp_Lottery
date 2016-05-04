/***** Before */
Lottery.Collection.TransferMoney.before.insert(function (userId, doc) {
    doc._id = idGenerator.genWithPrefix(Lottery.Collection.TransferMoney, "", 10);

    var transferFrom={};
    var transferTo={};

    transferFrom.mainAgent=doc.transferFrom;
    transferTo.mainAgent=doc.transferTo;

    var transferFromName = Lottery.Collection.MapAgent.findOne({_id: doc.transferFrom},{ fields: { 'mainAgent': 1, _id: 0 }});
    var transferToName = Lottery.Collection.MapAgent.findOne({_id: doc.transferTo},{ fields: { 'mainAgent': 1, _id: 0 }});

    doc.transferFromName = transferFromName != null ? transferFromName : transferFrom;
    doc.transferToName = transferToName != null ? transferToName : transferTo;


    return doc;
});


Lottery.Collection.TransferMoney.before.update(function (userId, doc, fieldNames, modifier, options) {
    var transferFrom={};
    var transferTo={};

    transferFrom.mainAgent=modifier.$set.transferFrom;
    transferTo.mainAgent=modifier.$set.transferTo;

    var transferFromName = Lottery.Collection.MapAgent.findOne({_id: modifier.$set.transferFrom},{ fields: { 'mainAgent': 1, _id: 0 }});
    var transferToName = Lottery.Collection.MapAgent.findOne({_id: modifier.$set.transferTo},{ fields: { 'mainAgent': 1, _id: 0 }});

    modifier.$set.transferFromName = transferFromName != null ? transferFromName : transferFrom;
    modifier.$set.transferToName = transferToName != null ? transferToName : transferTo;

});
