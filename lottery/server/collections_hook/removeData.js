/***** Before */
Lottery.Collection.RemoveData.before.insert(function (userId, doc) {
    var prefix = doc.branchId + '-';
    doc._id = idGenerator.genWithPrefix(Lottery.Collection.RemoveData, prefix, 10);

    return doc;
});

Lottery.Collection.RemoveData.after.insert(function (userId, doc) {

    Meteor.defer(function () {
        try {
            Lottery.Collection.Bet.direct.remove({betDate: {$lte: moment(doc.removeDate).endOf("day").toDate()}});
            Lottery.Collection.BetDetail.direct.remove({betDetailDate: {$lte: moment(doc.removeDate).endOf("day").toDate()}});
            Lottery.Collection.EndOfProcess.direct.remove({closeDate: {$lte: moment(doc.removeDate).endOf("day").toDate()}});
            Lottery.Collection.EndPerMonth.direct.remove({endDate: {$lte: moment(doc.removeDate).endOf("day").toDate()}});
            Lottery.Collection.Loss.direct.remove({lossDate: {$lte: moment(doc.removeDate).endOf("day").toDate()}});
            Lottery.Collection.Result.direct.remove({resultDate: {$lte: moment(doc.removeDate).endOf("day").toDate()}});
            Lottery.Collection.ResultEvening.direct.remove({resultDate: {$lte: moment(doc.removeDate).endOf("day").toDate()}});
            Lottery.Collection.ResultNight.direct.remove({resultDate: {$lte: moment(doc.removeDate).endOf("day").toDate()}});
        } catch (e) {
            console.log(e.message);
        }
    })

});

