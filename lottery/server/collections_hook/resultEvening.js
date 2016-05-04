/***** Before */
Lottery.Collection.ResultEvening.before.insert(function (userId, doc) {

    var data={};
    data.A1=doc.A1;
    data.A2=doc.A2;
    data.B=doc.B18;
    data.C=doc.C;
    data.D=doc.D;

    data.resultDate=doc.resultDate;
    data.time=doc.time;

    data.T3=doc.T3;
    data.T4=doc.T4;
    data.T5=doc.T5;
    data.T6=doc.T6;

    data.T7=doc.T7;
    data.T8=doc.T8;
    data.T9=doc.T9;
    data.T10=doc.T10;
    data.T11=doc.T11;
    data.T12=doc.T12;
    data.T13=doc.T13;
    data.T14=doc.T14;
    data.T15=doc.T15;
    data.T16=doc.T16;
    data.T17=doc.T17;

    var reId =Meteor.call("lottery_resultInsertEvening",data);
    doc.resultId=reId;

});
Lottery.Collection.ResultEvening.before.update(function (userId, doc, fieldNames, modifier, options) {
    var data={};
    data.A1=modifier.$set.A1;
    data.A2=modifier.$set.A2;
    data.B=modifier.$set.B18;
    data.C=modifier.$set.C;
    data.D=modifier.$set.D;

    data.resultDate=modifier.$set.resultDate;
    data.time=modifier.$set.time;

    data.T3=modifier.$set.T3;
    data.T4=modifier.$set.T4;
    data.T5=modifier.$set.T5;
    data.T6=modifier.$set.T6;

    data.T7=modifier.$set.T7;
    data.T8=modifier.$set.T8;
    data.T9=modifier.$set.T9;
    data.T10=modifier.$set.T10;
    data.T11=modifier.$set.T11;
    data.T12=modifier.$set.T12;
    data.T13=modifier.$set.T13;
    data.T14=modifier.$set.T14;
    data.T15=modifier.$set.T15;
    data.T16=modifier.$set.T16;
    data.T17=modifier.$set.T17;

    Lottery.Collection.Result.remove(modifier.$set.resultId);

    var reId=Meteor.call("lottery_resultInsertEvening",data);
    modifier.$set.resultId=reId;

});
