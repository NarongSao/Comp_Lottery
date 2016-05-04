/***** Before */
Lottery.Collection.ResultNight.before.insert(function (userId, doc) {

    var data={};
    data.A1=doc.A1;
    data.A2=doc.A2;
    data.A3=doc.A3;
    data.A4=doc.A4;
    data.A5=doc.A5;
    data.A6=doc.A6;
    data.A7=doc.A7;

    data.B=doc.B27;
    data.C=doc.C;
    data.D=doc.D;

    data.resultDate=doc.resultDate;
    data.time=doc.time;

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

    data.T18=doc.T18;
    data.T19=doc.T19;
    data.T20=doc.T20;
    data.T21=doc.T21;
    data.T22=doc.T22;
    data.T23=doc.T23;
    data.T24=doc.T24;
    data.T25=doc.T25;
    data.T26=doc.T26;


    var reId =  Meteor.call("lottery_resultInsertNight",data);

    doc.resultId=reId;

});
Lottery.Collection.ResultNight.before.update(function (userId, doc, fieldNames, modifier, options) {
    var data={};
    data.A1=modifier.$set.A1;
    data.A2=modifier.$set.A2;
    data.A3=modifier.$set.A3;
    data.A4=modifier.$set.A4;
    data.A5=modifier.$set.A5;
    data.A6=modifier.$set.A6;
    data.A7=modifier.$set.A7;
    data.B=modifier.$set.B27;
    data.C=modifier.$set.C;
    data.D=modifier.$set.D;

    data.resultDate=modifier.$set.resultDate;
    data.time=modifier.$set.time;


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

    data.T18=modifier.$set.T18;
    data.T19=modifier.$set.T19;
    data.T20=modifier.$set.T20;
    data.T21=modifier.$set.T21;
    data.T22=modifier.$set.T22;
    data.T23=modifier.$set.T23;
    data.T24=modifier.$set.T24;
    data.T25=modifier.$set.T25;
    data.T26=modifier.$set.T26;

    Lottery.Collection.Result.remove(modifier.$set.resultId);

    var reId =  Meteor.call("lottery_resultInsertNight",data);

    modifier.$set.resultId=reId;

});
