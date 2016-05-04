Meteor.methods({
    lottery_resultById: function (id) {
        var data = Lottery.Collection.Result.findOne(id);
        data.resultDate = moment(data.resultDate).format('YYYY-MM-DD');
        return data;
    },
    lottery_resultInsertEvening: function (doc) {
        var data = {};
        data.resultDate = doc.resultDate;
        data.time = doc.time;

        var resultA2D = doc.A1;
        var resultA3D = doc.A2;
        var resultB2D = doc.B.substr(0, 2);
        var resultB3D = doc.B.substr(2, 3);
        var resultC2D = doc.C.substr(0, 2);
        var resultC3D = doc.C.substr(2, 3);
        var resultD2D = doc.D.substr(0, 2);
        var resultD3D = doc.D.substr(2, 3);

        var resultLo2D = doc.A1 +
            "," + doc.A2.substr(1, 2) +

            "," + doc.T3.substr(2, 2) +
            "," + doc.T4.substr(2, 2) +
            "," + doc.T5.substr(2, 2) +
            "," + doc.T6.substr(2, 2) +

            "," + doc.T7.substr(3, 2) +
            "," + doc.T8.substr(3, 2) +
            "," + doc.T9.substr(3, 2) +
            "," + doc.T10.substr(3, 2) +
            "," + doc.T11.substr(3, 2) +
            "," + doc.T12.substr(3, 2) +
            "," + doc.T13.substr(3, 2) +
            "," + doc.T14.substr(3, 2) +
            "," + doc.T15.substr(3, 2) +
            "," + doc.T16.substr(3, 2) +
            "," + doc.T17.substr(3, 2) +

            "," + doc.B.substr(0, 2) +
            "," + doc.B.substr(3, 2) +
            "," + doc.C.substr(0, 2) +
            "," + doc.C.substr(3, 2) +
            "," + doc.D.substr(0, 2) +
            "," + doc.D.substr(3, 2);


        var resultLo3D = doc.A2 +

            "," + doc.T3.substr(1, 3) +
            "," + doc.T4.substr(1, 3) +
            "," + doc.T5.substr(1, 3) +
            "," + doc.T6.substr(1, 3) +

            "," + doc.T7.substr(2, 3) +
            "," + doc.T8.substr(2, 3) +
            "," + doc.T9.substr(2, 3) +
            "," + doc.T10.substr(2, 3) +
            "," + doc.T11.substr(2, 3) +
            "," + doc.T12.substr(2, 3) +
            "," + doc.T13.substr(2, 3) +
            "," + doc.T14.substr(2, 3) +
            "," + doc.T15.substr(2, 3) +
            "," + doc.T16.substr(2, 3) +
            "," + doc.T17.substr(2, 3) +

            "," + doc.B.substr(2, 3) +
            "," + doc.C.substr(2, 3) +
            "," + doc.D.substr(2, 3);

        var postA = {};
        postA.result2D = resultA2D;
        postA.result3D = resultA3D;


        data.postA = postA;

        var postB = {};
        postB.result2D = resultB2D;
        postB.result3D = resultB3D;


        data.postB = postB;

        var postC = {};
        postC.result2D = resultC2D;
        postC.result3D = resultC3D;

        data.postC = postC;

        var postD = {};

        postD.result2D = resultD2D;
        postD.result3D = resultD3D;

        data.postD = postD;

        var postLo = {};
        postLo.result2D = resultLo2D;
        postLo.result3D = resultLo3D;


        data.postLo = postLo;
        var reId = idGenerator.genWithPrefix(Lottery.Collection.Result, "", 10);
        data._id = reId;
        data.notDefault=2;
       return Lottery.Collection.Result.insert(data);
    },
    lottery_resultInsertNight: function (doc) {
        var data = {};
        data.resultDate = doc.resultDate;
        data.time = doc.time;

        var resultA2D = doc.A1+","+doc.A2+","+doc.A3+","+doc.A4;
        var resultA3D = doc.A5+","+doc.A6+","+doc.A7;
        var resultB2D = doc.B.substr(0, 2);
        var resultB3D = doc.B.substr(2, 3);
        var resultC2D = doc.C.substr(0, 2);
        var resultC3D = doc.C.substr(2, 3);
        var resultD2D = doc.D.substr(0, 2);
        var resultD3D = doc.D.substr(2, 3);

        var resultLo2D = doc.A1 +
            "," + doc.A2 +
            "," + doc.A3 +
            "," + doc.A4 +

            "," + doc.A5.substr(1,2) +
            "," + doc.A6.substr(1,2) +
            "," + doc.A7.substr(1,2) +

            "," + doc.T8.substr(2, 2) +
            "," + doc.T9.substr(2, 2) +
            "," + doc.T10.substr(2, 2) +
            "," + doc.T11.substr(2, 2) +
            "," + doc.T12.substr(2, 2) +
            "," + doc.T13.substr(2, 2) +
            "," + doc.T14.substr(2, 2) +
            "," + doc.T15.substr(2, 2) +
            "," + doc.T16.substr(2, 2) +
            "," + doc.T17.substr(2, 2) +

            "," + doc.T18.substr(3, 2) +
            "," + doc.T19.substr(3, 2) +
            "," + doc.T20.substr(3, 2) +
            "," + doc.T21.substr(3, 2) +
            "," + doc.T22.substr(3, 2) +
            "," + doc.T23.substr(3, 2) +
            "," + doc.T24.substr(3, 2) +
            "," + doc.T25.substr(3, 2) +
            "," + doc.T26.substr(3, 2) +


            "," + doc.B.substr(0, 2) +
            "," + doc.B.substr(3, 2) +
            "," + doc.C.substr(0, 2) +
            "," + doc.C.substr(3, 2) +
            "," + doc.D.substr(0, 2) +
            "," + doc.D.substr(3, 2);


        var resultLo3D = doc.A5 +

            "," + doc.A6+
            "," + doc.A7+

            "," + doc.T8.substr(1, 3) +
            "," + doc.T9.substr(1, 3) +
            "," + doc.T10.substr(1, 3) +
            "," + doc.T11.substr(1, 3) +
            "," + doc.T12.substr(1, 3) +
            "," + doc.T13.substr(1, 3) +
            "," + doc.T14.substr(1, 3) +
            "," + doc.T15.substr(1, 3) +
            "," + doc.T16.substr(1, 3) +
            "," + doc.T17.substr(1, 3) +

            "," + doc.T18.substr(2, 3) +
            "," + doc.T19.substr(2, 3) +
            "," + doc.T20.substr(2, 3) +
            "," + doc.T21.substr(2, 3) +
            "," + doc.T22.substr(2, 3) +
            "," + doc.T23.substr(2, 3) +
            "," + doc.T24.substr(2, 3) +
            "," + doc.T25.substr(2, 3) +
            "," + doc.T26.substr(2, 3) +

            "," + doc.B.substr(2, 3) +
            "," + doc.C.substr(2, 3) +
            "," + doc.D.substr(2, 3);

        var postA = {};
        postA.result2D = resultA2D;
        postA.result3D = resultA3D;


        data.postA = postA;

        var postB = {};
        postB.result2D = resultB2D;
        postB.result3D = resultB3D;


        data.postB = postB;

        var postC = {};
        postC.result2D = resultC2D;
        postC.result3D = resultC3D;

        data.postC = postC;

        var postD = {};

        postD.result2D = resultD2D;
        postD.result3D = resultD3D;

        data.postD = postD;

        var postLo = {};
        postLo.result2D = resultLo2D;
        postLo.result3D = resultLo3D;


        data.postLo = postLo;

        var reId = idGenerator.genWithPrefix(Lottery.Collection.Result, "", 10);
        data._id = reId;
        data.notDefault=2;
      return Lottery.Collection.Result.insert(data);
    }
});