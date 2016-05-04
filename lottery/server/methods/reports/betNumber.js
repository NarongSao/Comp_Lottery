Meteor.methods({
    lottery_betNumberReport: function (params) {
        var data = {
            title: {},
            header: {},
            content: [{
                index: 'No Result'
            }],
            footer: {}
        };
        /****** Title *****/
        data.title = Cpanel.Collection.Company.findOne();

        /****** Header *****/
        data.header = params;


        /****** Content *****/
        var self = params;


        if (self.rank != "noRank") {
            var rankInfo = Lottery.Collection.Rank.findOne(self.rank);
        }

        var agentList = [];
        if (self.agentId == "All") {
            var allAgent = Lottery.Collection.Agent.find().fetch();
            allAgent.forEach(function (obj) {
                agentList.push(obj._id);
            })
        } else {
            if(!_.isArray(self.agentId)){
                agentList.push(self.agentId);

            }else{
                self.agentId.forEach(function (obj) {
                    agentList.push(obj);
                })
            }
        }
        var stringPrepare = "";

        var result2D = [];
        var result3D = [];

        var selectorARiel = {};
        var selectorADollar = {};
        var selectorABath = {};

        var selectorBRiel = {};
        var selectorBDollar = {};
        var selectorBBath = {};

        var selectorCRiel = {};
        var selectorCDollar = {};
        var selectorCBath = {};

        var selectorDRiel = {};
        var selectorDDollar = {};
        var selectorDBath = {};

        var selectorLoRiel = {};
        var selectorLoDollar = {};
        var selectorLoBath = {};

        //Param

        // Post
        selectorARiel = {$or: [{post: {'$regex': /A/}}, {post: {'$regex': /4P/}}]};
        selectorADollar = {$or: [{post: {'$regex': /A/}}, {post: {'$regex': /4P/}}]};
        selectorABath = {$or: [{post: {'$regex': /A/}}, {post: {'$regex': /4P/}}]};

        selectorBRiel = {$or: [{post: {'$regex': /B/}}, {post: {'$regex': /4P/}}]};
        selectorBDollar = {$or: [{post: {'$regex': /B/}}, {post: {'$regex': /4P/}}]};
        selectorBBath = {$or: [{post: {'$regex': /B/}}, {post: {'$regex': /4P/}}]};

        selectorCRiel = {$or: [{post: {'$regex': /C/}}, {post: {'$regex': /4P/}}]};
        selectorCDollar = {$or: [{post: {'$regex': /C/}}, {post: {'$regex': /4P/}}]};
        selectorCBath = {$or: [{post: {'$regex': /C/}}, {post: {'$regex': /4P/}}]};

        selectorDRiel = {$or: [{post: {'$regex': /D/}}, {post: {'$regex': /4P/}}]};
        selectorDDollar = {$or: [{post: {'$regex': /D/}}, {post: {'$regex': /4P/}}]};
        selectorDBath = {$or: [{post: {'$regex': /D/}}, {post: {'$regex': /4P/}}]};

        selectorLoRiel.post = {'$regex': /Lo/};
        selectorLoDollar.post = {'$regex': /Lo/};
        selectorLoBath.post = {'$regex': /Lo/};


        if (self.branchId != "") {

            selectorARiel.branchId = self.branchId;
            selectorADollar.branchId = self.branchId;
            selectorABath.branchId = self.branchId;

            selectorBRiel.branchId = self.branchId;
            selectorBDollar.branchId = self.branchId;
            selectorBBath.branchId = self.branchId;

            selectorCRiel.branchId = self.branchId;
            selectorCDollar.branchId = self.branchId;
            selectorCBath.branchId = self.branchId;

            selectorDRiel.branchId = self.branchId;
            selectorDDollar.branchId = self.branchId;
            selectorDBath.branchId = self.branchId;

            selectorLoRiel.branchId = self.branchId;
            selectorLoDollar.branchId = self.branchId;
            selectorLoBath.branchId = self.branchId;
        }
        //Date
        selectorARiel.betDetailDate = new Date(self.date);
        selectorADollar.betDetailDate = new Date(self.date);
        selectorABath.betDetailDate = new Date(self.date);

        selectorBRiel.betDetailDate = new Date(self.date);
        selectorBDollar.betDetailDate = new Date(self.date);
        selectorBBath.betDetailDate = new Date(self.date);

        selectorCRiel.betDetailDate = new Date(self.date);
        selectorCDollar.betDetailDate = new Date(self.date);
        selectorCBath.betDetailDate = new Date(self.date);

        selectorDRiel.betDetailDate = new Date(self.date);
        selectorDDollar.betDetailDate = new Date(self.date);
        selectorDBath.betDetailDate = new Date(self.date);

        selectorLoRiel.betDetailDate = new Date(self.date);
        selectorLoDollar.betDetailDate = new Date(self.date);
        selectorLoBath.betDetailDate = new Date(self.date);

        //    Agent
        if (self.agentId != "All") {
            selectorARiel.agentId = {$in: agentList};
            selectorADollar.agentId = {$in: agentList};
            selectorABath.agentId = {$in: agentList};

            selectorBRiel.agentId = {$in: agentList};
            selectorBDollar.agentId = {$in: agentList};
            selectorBBath.agentId = {$in: agentList};

            selectorCRiel.agentId = {$in: agentList};
            selectorCDollar.agentId = {$in: agentList};
            selectorCBath.agentId = {$in: agentList};

            selectorDRiel.agentId = {$in: agentList};
            selectorDDollar.agentId = {$in: agentList};
            selectorDBath.agentId = {$in: agentList};

            selectorLoRiel.agentId = {$in: agentList};
            selectorLoDollar.agentId = {$in: agentList};
            selectorLoBath.agentId = {$in: agentList};
        }

        //    Currency
        selectorARiel.currencyId = "KHR";
        selectorADollar.currencyId = "USD";
        selectorABath.currencyId = "THB";

        selectorBRiel.currencyId = "KHR";
        selectorBDollar.currencyId = "USD";
        selectorBBath.currencyId = "THB";

        selectorCRiel.currencyId = "KHR";
        selectorCDollar.currencyId = "USD";
        selectorCBath.currencyId = "THB";

        selectorDRiel.currencyId = "KHR";
        selectorDDollar.currencyId = "USD";
        selectorDBath.currencyId = "THB";

        selectorLoRiel.currencyId = "KHR";
        selectorLoDollar.currencyId = "USD";
        selectorLoBath.currencyId = "THB";

        // TIme

        if (self.time != "") {
            selectorARiel.time = self.time;
            selectorADollar.time = self.time;
            selectorABath.time = self.time;

            selectorBRiel.time = self.time;
            selectorBDollar.time = self.time;
            selectorBBath.time = self.time;

            selectorCRiel.time = self.time;
            selectorCDollar.time = self.time;
            selectorCBath.time = self.time;

            selectorDRiel.time = self.time;
            selectorDDollar.time = self.time;
            selectorDBath.time = self.time;

            selectorLoRiel.time = self.time;
            selectorLoDollar.time = self.time;
            selectorLoBath.time = self.time;

        }


        // Call Method
        var dataARiel = Meteor.call('lottery_betDetailGroupByNumber', selectorARiel);
        var dataADollar = Meteor.call('lottery_betDetailGroupByNumber', selectorADollar);
        var dataABath = Meteor.call('lottery_betDetailGroupByNumber', selectorABath);

        var dataBRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorBRiel);
        var dataBDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorBDollar);
        var dataBBath = Meteor.call('lottery_betDetailGroupByNumber', selectorBBath);

        var dataCRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorCRiel);
        var dataCDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorCDollar);
        var dataCBath = Meteor.call('lottery_betDetailGroupByNumber', selectorCBath);

        var dataDRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorDRiel);
        var dataDDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorDDollar);
        var dataDBath = Meteor.call('lottery_betDetailGroupByNumber', selectorDBath);

        var dataLoRiel = Meteor.call('lottery_betDetailGroupByNumber', selectorLoRiel);
        var dataLoDollar = Meteor.call('lottery_betDetailGroupByNumber', selectorLoDollar);
        var dataLoBath = Meteor.call('lottery_betDetailGroupByNumber', selectorLoBath);

        dataARiel.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'A',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'A',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            }
        })

        dataADollar.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'A',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'A',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            }
        })

        dataABath.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'A',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'A',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            }
        })


        dataBRiel.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'B',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'B',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            }
        })

        dataBDollar.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'B',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'B',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            }
        })

        dataBBath.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'B',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'B',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            }
        })


        dataCRiel.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'C',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'C',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            }
        })

        dataCDollar.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'C',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'C',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            }
        })

        dataCBath.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'C',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'C',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            }
        })

        dataDRiel.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'D',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'D',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            }
        })

        dataDDollar.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'D',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'D',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            }
        })

        dataDBath.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'D',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'D',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            }
        })

        dataLoRiel.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'Lo',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'Lo',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'KHR'
                })
            }
        })
        dataLoDollar.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'Lo',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'Lo',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'USD'
                })
            }
        })
        dataLoBath.forEach(function (obj) {
            if (obj._id.betNumber.length == 2) {
                result2D.push({
                    post: 'Lo',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            } else if (obj._id.betNumber.length == 3) {
                result3D.push({
                    post: 'Lo',
                    number: obj._id.betNumber,
                    amount: obj.total,
                    currency: 'THB'
                })
            }
        })


        var result2DFinal = [];
        var result3DFinal = [];
        result2D.reduce(function (key, val) {

            var amountARielFinal = 0;
            var amountBRielFinal = 0;
            var amountCRielFinal = 0;
            var amountDRielFinal = 0;
            var amountLoRielFinal = 0;

            var amountADollarFinal = 0;
            var amountBDollarFinal = 0;
            var amountCDollarFinal = 0;
            var amountDDollarFinal = 0;
            var amountLoDollarFinal = 0;

            var amountABathFinal = 0;
            var amountBBathFinal = 0;
            var amountCBathFinal = 0;
            var amountDBathFinal = 0;
            var amountLoBathFinal = 0;

            if (val.currency == 'KHR') {
                if (val.post == 'A') {
                    amountARielFinal = val.amount;
                } else if (val.post == 'B') {
                    amountBRielFinal = val.amount;
                } else if (val.post == 'C') {
                    amountCRielFinal = val.amount;
                } else if (val.post == 'D') {
                    amountDRielFinal = val.amount;
                } else if (val.post == 'Lo') {
                    amountLoRielFinal = val.amount;
                }
            } else if (val.currency == 'USD') {
                if (val.post == 'A') {
                    amountADollarFinal = val.amount;
                } else if (val.post == 'B') {
                    amountBDollarFinal = val.amount;
                } else if (val.post == 'C') {
                    amountCDollarFinal = val.amount;
                } else if (val.post == 'D') {
                    amountDDollarFinal = val.amount;
                } else if (val.post == 'Lo') {
                    amountLoDollarFinal = val.amount;
                }
            } else if (val.currency == 'THB') {
                if (val.post == 'A') {
                    amountABathFinal = val.amount;
                } else if (val.post == 'B') {
                    amountBBathFinal = val.amount;
                } else if (val.post == 'C') {
                    amountCBathFinal = val.amount;
                } else if (val.post == 'D') {
                    amountDBathFinal = val.amount;
                } else if (val.post == 'Lo') {
                    amountLoBathFinal = val.amount;
                }
            }


            if (!key[val.number]) {
                key[val.number] = {
                    post: val.post,
                    number: val.number,
                    amountARiel: amountARielFinal,
                    amountBRiel: amountBRielFinal,
                    amountCRiel: amountCRielFinal,
                    amountDRiel: amountDRielFinal,
                    amountLoRiel: amountLoRielFinal,

                    amountADollar: amountADollarFinal,
                    amountBDollar: amountBDollarFinal,
                    amountCDollar: amountCDollarFinal,
                    amountDDollar: amountDDollarFinal,
                    amountLoDollar: amountLoDollarFinal,

                    amountABath: amountABathFinal,
                    amountBBath: amountBBathFinal,
                    amountCBath: amountCBathFinal,
                    amountDBath: amountDBathFinal,
                    amountLoBath: amountLoBathFinal

                };
                result2DFinal.push(key[val.number]);
            } else {
                key[val.number].amountARiel += amountARielFinal;
                key[val.number].amountBRiel += amountBRielFinal;
                key[val.number].amountCRiel += amountCRielFinal;
                key[val.number].amountDRiel += amountDRielFinal;
                key[val.number].amountLoRiel += amountLoRielFinal;

                key[val.number].amountADollar += amountADollarFinal;
                key[val.number].amountBDollar += amountBDollarFinal;
                key[val.number].amountCDollar += amountCDollarFinal;
                key[val.number].amountDDollar += amountDDollarFinal;
                key[val.number].amountLoDollar += amountLoDollarFinal;

                key[val.number].amountABath += amountABathFinal;
                key[val.number].amountBBath += amountBBathFinal;
                key[val.number].amountCBath += amountCBathFinal;
                key[val.number].amountDBath += amountDBathFinal;
                key[val.number].amountLoBath += amountLoBathFinal;


            }
            return key;
        }, {});


        if (result2DFinal.length != 0) {
            var maxARiel = finder(Math.max, result2DFinal, "amountARiel");
            var maxBRiel = finder(Math.max, result2DFinal, "amountBRiel");
            var maxCRiel = finder(Math.max, result2DFinal, "amountCRiel");
            var maxDRiel = finder(Math.max, result2DFinal, "amountDRiel");
            var maxLoRiel = finder(Math.max, result2DFinal, "amountLoRiel");

            var maxADollar = finder(Math.max, result2DFinal, "amountADollar");
            var maxBDollar = finder(Math.max, result2DFinal, "amountBDollar");
            var maxCDollar = finder(Math.max, result2DFinal, "amountCDollar");
            var maxDDollar = finder(Math.max, result2DFinal, "amountDDollar");
            var maxLoDollar = finder(Math.max, result2DFinal, "amountLoDollar");

            var maxABath = finder(Math.max, result2DFinal, "amountABath");
            var maxBBath = finder(Math.max, result2DFinal, "amountBBath");
            var maxCBath = finder(Math.max, result2DFinal, "amountCBath");
            var maxDBath = finder(Math.max, result2DFinal, "amountDBath");
            var maxLoBath = finder(Math.max, result2DFinal, "amountLoBath");
        }
        result3D.reduce(function (key, val) {

            var amountARielFinal = 0;
            var amountBRielFinal = 0;
            var amountCRielFinal = 0;
            var amountDRielFinal = 0;
            var amountLoRielFinal = 0;

            var amountADollarFinal = 0;
            var amountBDollarFinal = 0;
            var amountCDollarFinal = 0;
            var amountDDollarFinal = 0;
            var amountLoDollarFinal = 0;

            var amountABathFinal = 0;
            var amountBBathFinal = 0;
            var amountCBathFinal = 0;
            var amountDBathFinal = 0;
            var amountLoBathFinal = 0;

            if (val.currency == 'KHR') {
                if (val.post == 'A') {
                    amountARielFinal = val.amount;
                } else if (val.post == 'B') {
                    amountBRielFinal = val.amount;
                } else if (val.post == 'C') {
                    amountCRielFinal = val.amount;
                } else if (val.post == 'D') {
                    amountDRielFinal = val.amount;
                } else if (val.post == 'Lo') {
                    amountLoRielFinal = val.amount;
                }
            } else if (val.currency == 'USD') {
                if (val.post == 'A') {
                    amountADollarFinal = val.amount;
                } else if (val.post == 'B') {
                    amountBDollarFinal = val.amount;
                } else if (val.post == 'C') {
                    amountCDollarFinal = val.amount;
                } else if (val.post == 'D') {
                    amountDDollarFinal = val.amount;
                } else if (val.post == 'Lo') {
                    amountLoDollarFinal = val.amount;
                }
            } else if (val.currency == 'THB') {
                if (val.post == 'A') {
                    amountABathFinal = val.amount;
                } else if (val.post == 'B') {
                    amountBBathFinal = val.amount;
                } else if (val.post == 'C') {
                    amountCBathFinal = val.amount;
                } else if (val.post == 'D') {
                    amountDBathFinal = val.amount;
                } else if (val.post == 'Lo') {
                    amountLoBathFinal = val.amount;
                }
            }


            if (!key[val.number]) {
                key[val.number] = {
                    post: val.post,
                    number: val.number,
                    amountARiel: amountARielFinal,
                    amountBRiel: amountBRielFinal,
                    amountCRiel: amountCRielFinal,
                    amountDRiel: amountDRielFinal,
                    amountLoRiel: amountLoRielFinal,

                    amountADollar: amountADollarFinal,
                    amountBDollar: amountBDollarFinal,
                    amountCDollar: amountCDollarFinal,
                    amountDDollar: amountDDollarFinal,
                    amountLoDollar: amountLoDollarFinal,

                    amountABath: amountABathFinal,
                    amountBBath: amountBBathFinal,
                    amountCBath: amountCBathFinal,
                    amountDBath: amountDBathFinal,
                    amountLoBath: amountLoBathFinal

                };
                result3DFinal.push(key[val.number]);
            } else {
                key[val.number].amountARiel += amountARielFinal;
                key[val.number].amountBRiel += amountBRielFinal;
                key[val.number].amountCRiel += amountCRielFinal;
                key[val.number].amountDRiel += amountDRielFinal;
                key[val.number].amountLoRiel += amountLoRielFinal;

                key[val.number].amountADollar += amountADollarFinal;
                key[val.number].amountBDollar += amountBDollarFinal;
                key[val.number].amountCDollar += amountCDollarFinal;
                key[val.number].amountDDollar += amountDDollarFinal;
                key[val.number].amountLoDollar += amountLoDollarFinal;

                key[val.number].amountABath += amountABathFinal;
                key[val.number].amountBBath += amountBBathFinal;
                key[val.number].amountCBath += amountCBathFinal;
                key[val.number].amountDBath += amountDBathFinal;
                key[val.number].amountLoBath += amountLoBathFinal;


            }
            return key;
        }, {});

        if (result3DFinal.length != 0) {
            var max3DARiel = finder(Math.max, result3DFinal, "amountARiel");
            var max3DBRiel = finder(Math.max, result3DFinal, "amountBRiel");
            var max3DCRiel = finder(Math.max, result3DFinal, "amountCRiel");
            var max3DDRiel = finder(Math.max, result3DFinal, "amountDRiel");
            var max3DLoRiel = finder(Math.max, result3DFinal, "amountLoRiel");

            var max3DADollar = finder(Math.max, result3DFinal, "amountADollar");
            var max3DBDollar = finder(Math.max, result3DFinal, "amountBDollar");
            var max3DCDollar = finder(Math.max, result3DFinal, "amountCDollar");
            var max3DDDollar = finder(Math.max, result3DFinal, "amountDDollar");
            var max3DLoDollar = finder(Math.max, result3DFinal, "amountLoDollar");

            var max3DABath = finder(Math.max, result3DFinal, "amountABath");
            var max3DBBath = finder(Math.max, result3DFinal, "amountBBath");
            var max3DCBath = finder(Math.max, result3DFinal, "amountCBath");
            var max3DDBath = finder(Math.max, result3DFinal, "amountDBath");
            var max3DLoBath = finder(Math.max, result3DFinal, "amountLoBath");
        }

        var labelRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px'>Riel</th>" : "";
        var labelDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' >Dollar</th>" : "";
        var labelBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px' >Bath</th>" : "";
        var labelRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px' >Riel</th>" : "";
        var labelDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px' >Dollar</th>" : "";
        var labelBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px'>Bath</th>" : "";

        var currencyLength = !_.isArray(self.currencyId) ? 1 : self.currencyId.length;
        if (self.time == "E") {
            var timeSelect = "Evening";
        } else if (self.time == "N") {
            var timeSelect = "Night";
        } else if (self.time == "T") {
            var timeSelect = "Thai";
        }

        stringPrepare +=
            "<table class='table table-striped table-reportWinLoseMain' style='border-collapse: collapse !important;'>" +
            "<caption><b>" +
            "<span align='left'><font size='2'> Date : " + moment(self.date).format('DD-MM-YYYY') + "    " + timeSelect +
            "</font></span></b></caption>" +
            "<tr><th rowspan='2' style='border: solid 1px' align='center'>Bet In 2D</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'>A</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> B</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> C</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> D</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'>Lo</th></tr>" +
            "<tr>" +
            labelRiel2D +
            labelDollar2D +
            labelBath2D +
            labelRiel3D +
            labelDollar3D +
            labelBath3D +
            labelRiel3D +
            labelDollar3D +
            labelBath3D +
            labelRiel3D +
            labelDollar3D +
            labelBath3D +
            labelRiel3D +
            labelDollar3D +
            labelBath3D +
            "</tr>";

        var grandValueARiel2D = 0;
        var grandValueBRiel2D = 0;
        var grandValueCRiel2D = 0;
        var grandValueDRiel2D = 0;
        var grandValueLoRiel2D = 0;

        var grandValueADollar2D = 0;
        var grandValueBDollar2D = 0;
        var grandValueCDollar2D = 0;
        var grandValueDDollar2D = 0;
        var grandValueLoDollar2D = 0;

        var grandValueABath2D = 0;
        var grandValueBBath2D = 0;
        var grandValueCBath2D = 0;
        var grandValueDBath2D = 0;
        var grandValueLoBath2D = 0;


        result2DFinal.forEach(function (obj) {

            grandValueARiel2D += obj.amountARiel;
            grandValueBRiel2D += obj.amountBRiel;
            grandValueCRiel2D += obj.amountCRiel;
            grandValueDRiel2D += obj.amountDRiel;
            grandValueLoRiel2D += obj.amountLoRiel;

            grandValueADollar2D += obj.amountADollar;
            grandValueBDollar2D += obj.amountBDollar;
            grandValueCDollar2D += obj.amountCDollar;
            grandValueDDollar2D += obj.amountDDollar;
            grandValueLoDollar2D += obj.amountLoDollar;

            grandValueABath2D += obj.amountABath;
            grandValueBBath2D += obj.amountBBath;
            grandValueCBath2D += obj.amountCBath;
            grandValueDBath2D += obj.amountDBath;
            grandValueLoBath2D += obj.amountLoBath;


            if (self.rank == "noRank") {
                var amountARiel = obj.amountARiel == maxARiel ? "<font color='red'>" + obj.amountARiel + "</font>" : obj.amountARiel;
                var amountBRiel = obj.amountBRiel == maxBRiel ? "<font color='red'>" + obj.amountBRiel + "</font>" : obj.amountBRiel;
                var amountCRiel = obj.amountCRiel == maxCRiel ? "<font color='red'>" + obj.amountCRiel + "</font>" : obj.amountCRiel;
                var amountDRiel = obj.amountDRiel == maxDRiel ? "<font color='red'>" + obj.amountDRiel + "</font>" : obj.amountDRiel;
                var amountLoRiel = obj.amountLoRiel == maxLoRiel ? "<font color='red'>" + obj.amountLoRiel + "</font>" : obj.amountLoRiel;

                var amountADollar = obj.amountADollar == maxADollar ? "<font color='red'>" + obj.amountADollar + "</font>" : obj.amountADollar;
                var amountBDollar = obj.amountBDollar == maxBDollar ? "<font color='red'>" + obj.amountBDollar + "</font>" : obj.amountBDollar;
                var amountCDollar = obj.amountCDollar == maxCDollar ? "<font color='red'>" + obj.amountCDollar + "</font>" : obj.amountCDollar;
                var amountDDollar = obj.amountDDollar == maxDDollar ? "<font color='red'>" + obj.amountDDollar + "</font>" : obj.amountDDollar;
                var amountLoDollar = obj.amountLoDollar == maxLoDollar ? "<font color='red'>" + obj.amountLoDollar + "</font>" : obj.amountLoDollar;

                var amountABath = obj.amountABath == maxABath ? "<font color='red'>" + obj.amountABath + "</font>" : obj.amountABath;
                var amountBBath = obj.amountBBath == maxBBath ? "<font color='red'>" + obj.amountBBath + "</font>" : obj.amountBBath;
                var amountCBath = obj.amountCBath == maxCBath ? "<font color='red'>" + obj.amountCBath + "</font>" : obj.amountCBath;
                var amountDBath = obj.amountDBath == maxDBath ? "<font color='red'>" + obj.amountDBath + "</font>" : obj.amountDBath;
                var amountLoBath = obj.amountLoBath == maxLoBath ? "<font color='red'>" + obj.amountLoBath + "</font>" : obj.amountLoBath;
            } else {
                if(obj.amountARiel == maxARiel){
                    var amountARiel = "<font color='red'>" + obj.amountARiel + "</font>";
                }
                else if (obj.amountARiel >= rankInfo.maxKHR) {
                    var amountARiel = "<font color='brown'>" + obj.amountARiel + "</font>";
                } else {
                    var amountARiel = obj.amountARiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountARiel + "</font>" : obj.amountARiel;
                }


                if(obj.amountBRiel == maxBRiel){
                    var amountBRiel = "<font color='red'>" + obj.amountBRiel + "</font>";
                }
                else if (obj.amountBRiel >= rankInfo.maxKHR) {
                    var amountBRiel = "<font color='brown'>" + obj.amountBRiel + "</font>";
                } else {
                    var amountBRiel = obj.amountBRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountBRiel + "</font>" : obj.amountBRiel;

                }


                if(obj.amountCRiel == maxCRiel){
                    var amountCRiel = "<font color='red'>" + obj.amountCRiel + "</font>";
                }
                else if (obj.amountCRiel >= rankInfo.maxKHR) {
                    var amountCRiel = "<font color='brown'>" + obj.amountCRiel + "</font>";

                } else {
                    var amountCRiel = obj.amountCRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountCRiel + "</font>" : obj.amountCRiel;
                }

                if(obj.amountDRiel == maxDRiel){
                    var amountDRiel = "<font color='red'>" + obj.amountDRiel + "</font>";
                }
                else if (obj.amountDRiel >= rankInfo.maxKHR) {
                    var amountDRiel = "<font color='brown'>" + obj.amountDRiel + "</font>";
                } else {
                    var amountDRiel = obj.amountDRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountDRiel + "</font>" : obj.amountDRiel;
                }

                if(obj.amountLoRiel == maxLoRiel){
                    var amountLoRiel = "<font color='red'>" + obj.amountLoRiel + "</font>";
                }
                else if (obj.amountLoRiel >= rankInfo.maxKHR) {
                    var amountLoRiel = "<font color='brown'>" + obj.amountLoRiel + "</font>";
                } else {
                    var amountLoRiel = obj.amountLoRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLoRiel + "</font>" : obj.amountLoRiel;
                }


                if(obj.amountADollar == maxADollar){
                    var amountADollar = "<font color='red'>" + obj.amountADollar + "</font>";
                }
                else if (obj.amountADollar >= rankInfo.maxUSD) {
                    var amountADollar = "<font color='brown'>" + obj.amountADollar + "</font>";

                } else {
                    var amountADollar = obj.amountADollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountADollar + "</font>" : obj.amountADollar;

                }

                if(obj.amountBDollar == maxBDollar){
                    var amountBDollar = "<font color='red'>" + obj.amountBDollar + "</font>";
                }
                else if (obj.amountBDollar >= rankInfo.maxUSD) {
                    var amountBDollar = "<font color='brown'>" + obj.amountBDollar + "</font>";
                } else {
                    var amountBDollar = obj.amountBDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountBDollar + "</font>" : obj.amountBDollar;
                }

                if(obj.amountCDollar == maxCDollar){
                    var amountCDollar = "<font color='red'>" + obj.amountCDollar + "</font>";
                }
                else if (obj.amountCDollar >= rankInfo.maxUSD) {
                    var amountCDollar = "<font color='brown'>" + obj.amountCDollar + "</font>";
                } else {
                    var amountCDollar = obj.amountCDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountCDollar + "</font>" : obj.amountCDollar;
                }

                if(obj.amountDDollar == maxDDollar){
                    var amountDDollar = "<font color='red'>" + obj.amountDDollar + "</font>";
                }
                else if (obj.amountDDollar >= rankInfo.maxUSD) {
                    var amountDDollar = "<font color='brown'>" + obj.amountDDollar + "</font>";
                } else {
                    var amountDDollar = obj.amountDDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountDDollar + "</font>" : obj.amountDDollar;
                }

                if(obj.amountLoDollar == maxLoDollar){
                    var amountLoDollar = "<font color='red'>" + obj.amountLoDollar + "</font>";
                }
                else if (obj.amountLoDollar >= rankInfo.maxUSD) {
                    var amountLoDollar = "<font color='brown'>" + obj.amountLoDollar + "</font>";
                } else {
                    var amountLoDollar = obj.amountLoDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountLoDollar + "</font>" : obj.amountLoDollar;
                }


                if(obj.amountABath== maxABath){
                    var amountABath= "<font color='red'>" + obj.amountABath+ "</font>";
                }
                else if (obj.amountABath >= rankInfo.maxTHB) {
                    var amountABath = "<font color='brown'>" + obj.amountABath + "</font>";
                } else {
                    var amountABath = obj.amountABath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountABath + "</font>" : obj.amountABath;
                }

                if(obj.amountBBath== maxBBath){
                    var amountBBath= "<font color='red'>" + obj.amountBBath+ "</font>";
                }
                else if (obj.amountBBath >= rankInfo.maxTHB) {
                    var amountBBath = "<font color='brown'>" + obj.amountBBath + "</font>";
                } else {
                    var amountBBath = obj.amountBBath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountBBath + "</font>" : obj.amountBBath;
                }


                if(obj.amountCBath== maxCBath){
                    var amountCBath= "<font color='red'>" + obj.amountCBath+ "</font>";
                }
                else if (obj.amountCBath >= rankInfo.maxTHB) {
                    var amountCBath = "<font color='brown'>" + obj.amountCBath + "</font>";
                } else {
                    var amountCBath = obj.amountCBath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountCBath + "</font>" : obj.amountCBath;
                }

                if(obj.amountDBath== maxDBath){
                    var amountDBath= "<font color='red'>" + obj.amountDBath+ "</font>";
                }
                else if (obj.amountDBath >= rankInfo.maxTHB) {
                    var amountDBath = "<font color='brown'>" + obj.amountDBath + "</font>";
                } else {
                    var amountDBath = obj.amountDBath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountDBath + "</font>" : obj.amountDBath;
                }

                if(obj.amountLoBath== maxLoBath){
                    var amountLoBath= "<font color='red'>" + obj.amountLoBath+ "</font>";
                }
                else if (obj.amountLoBath >= rankInfo.maxTHB) {
                    var amountLoBath = "<font color='brown'>" + obj.amountLoBath + "</font>";
                } else {
                    var amountLoBath = obj.amountLoBath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountLoBath + "</font>" : obj.amountLoBath;
                }
            }


            var valueARiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountARiel + "</b</td>" : "";
            var valueBRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountBRiel + "</b></td>" : "";
            var valueCRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountCRiel + "</b></td>" : "";
            var valueDRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountDRiel + "</b></td>" : "";
            var valueLoRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLoRiel + "</b></td>" : "";

            var valueADollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountADollar + "</b></td>" : "";
            var valueBDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountBDollar + "</b></td>" : "";
            var valueCDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountCDollar + "</b></td>" : "";
            var valueDDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountDDollar + "</b></td>" : "";
            var valueLoDollar2D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLoDollar + "</b></td>" : "";

            var valueABath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountABath + "</b></td>" : "";
            var valueBBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountBBath + "</b></td>" : "";
            var valueCBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountCBath + "</b></td>" : "";
            var valueDBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountDBath + "</b></td>" : "";
            var valueLoBath2D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amountLoBath + "</b></td>" : "";

            stringPrepare += "<tr>" +
                "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + obj.number + "</td>" +
                valueARiel2D +
                valueADollar2D +
                valueABath2D +

                valueBRiel2D +
                valueBDollar2D +
                valueBBath2D +


                valueCRiel2D +
                valueCDollar2D +
                valueCBath2D +

                valueDRiel2D +
                valueDDollar2D +
                valueLoBath2D +

                valueLoRiel2D +
                valueLoDollar2D +
                valueDBath2D +
                "</tr>";

        })
        var footerARiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueARiel2D + "</b</th>" : "";
        var footerBRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBRiel2D + "</b></th>" : "";
        var footerCRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCRiel2D + "</b></th>" : "";
        var footerDRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDRiel2D + "</b></th>" : "";
        var footerLoRiel2D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoRiel2D + "</b></th>" : "";

        var footerADollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueADollar2D + "</b></th>" : "";
        var footerBDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBDollar2D + "</b></th>" : "";
        var footerCDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCDollar2D + "</b></th>" : "";
        var footerDDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDDollar2D + "</b></th>" : "";
        var footerLoDollar2D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoDollar2D + "</b></th>" : "";

        var footerABath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueABath2D + "</b></th>" : "";
        var footerBBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBBath2D + "</b></th>" : "";
        var footerCBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCBath2D + "</b></th>" : "";
        var footerDBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDBath2D + "</b></th>" : "";
        var footerLoBath2D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoBath2D + "</b></th>" : "";

        stringPrepare += "<tr class='sumFooter'>" +
            "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +

            footerARiel2D +
            footerADollar2D +
            footerABath2D +

            footerBRiel2D +
            footerBDollar2D +
            footerBBath2D +

            footerCRiel2D +
            footerCDollar2D +
            footerCBath2D +

            footerDRiel2D +
            footerDDollar2D +
            footerDBath2D +

            footerLoRiel2D +
            footerLoDollar2D +
            footerLoBath2D +
            "</tr>" + "</table><footer></footer>";


        stringPrepare +=
            "<table class='table table-striped table-reportWinLoseMain' style='border-collapse: collapse !important;'>" +
            "<tr><th rowspan='2' style='border: solid 1px' align='center'>Bet In 3D</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'>A</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> B</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> C</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'> D</th><th style='border: solid 1px' colspan='" + currencyLength + "' align='center'>Lo</th></tr>" +
            "<tr>" +
            labelRiel2D +
            labelDollar2D +
            labelBath2D +
            labelRiel3D +
            labelDollar3D +
            labelBath3D +
            labelRiel3D +
            labelDollar3D +
            labelBath3D +
            labelRiel3D +
            labelDollar3D +
            labelBath3D +
            labelRiel3D +
            labelDollar3D +
            labelBath3D +
            "</tr>";


        var grandValueARiel3D = 0;
        var grandValueBRiel3D = 0;
        var grandValueCRiel3D = 0;
        var grandValueDRiel3D = 0;
        var grandValueLoRiel3D = 0;

        var grandValueADollar3D = 0;
        var grandValueBDollar3D = 0;
        var grandValueCDollar3D = 0;
        var grandValueDDollar3D = 0;
        var grandValueLoDollar3D = 0;

        var grandValueABath3D = 0;
        var grandValueBBath3D = 0;
        var grandValueCBath3D = 0;
        var grandValueDBath3D = 0;
        var grandValueLoBath3D = 0;


        result3DFinal.forEach(function (obj) {

            grandValueARiel3D += obj.amountARiel;
            grandValueBRiel3D += obj.amountBRiel;
            grandValueCRiel3D += obj.amountCRiel;
            grandValueDRiel3D += obj.amountDRiel;
            grandValueLoRiel3D += obj.amountLoRiel;

            grandValueADollar3D += obj.amountADollar;
            grandValueBDollar3D += obj.amountBDollar;
            grandValueCDollar3D += obj.amountCDollar;
            grandValueDDollar3D += obj.amountDDollar;
            grandValueLoDollar3D += obj.amountLoDollar;

            grandValueABath3D += obj.amountABath;
            grandValueBBath3D += obj.amountBBath;
            grandValueCBath3D += obj.amountCBath;
            grandValueDBath3D += obj.amountDBath;
            grandValueLoBath3D += obj.amountLoBath;


            if (self.rank == "noRank") {
                var amount3DARiel = obj.amountARiel == max3DARiel ? "<font color='red'>" + obj.amountARiel + "</font>" : obj.amountARiel;
                var amount3DBRiel = obj.amountBRiel == max3DBRiel ? "<font color='red'>" + obj.amountBRiel + "</font>" : obj.amountBRiel;
                var amount3DCRiel = obj.amountCRiel == max3DCRiel ? "<font color='red'>" + obj.amountCRiel + "</font>" : obj.amountCRiel;
                var amount3DDRiel = obj.amountDRiel == max3DDRiel ? "<font color='red'>" + obj.amountDRiel + "</font>" : obj.amountDRiel;
                var amount3DLoRiel = obj.amountLoRiel == max3DLoRiel ? "<font color='red'>" + obj.amountLoRiel + "</font>" : obj.amountLoRiel;

                var amount3DADollar = obj.amountADollar == max3DADollar ? "<font color='red'>" + obj.amountADollar + "</font>" : obj.amountADollar;
                var amount3DBDollar = obj.amountBDollar == max3DBDollar ? "<font color='red'>" + obj.amountBDollar + "</font>" : obj.amountBDollar;
                var amount3DCDollar = obj.amountCDollar == max3DCDollar ? "<font color='red'>" + obj.amountCDollar + "</font>" : obj.amountCDollar;
                var amount3DDDollar = obj.amountDDollar == max3DDDollar ? "<font color='red'>" + obj.amountDDollar + "</font>" : obj.amountDDollar;
                var amount3DLoDollar = obj.amountLoDollar == max3DLoDollar ? "<font color='red'>" + obj.amountLoDollar + "</font>" : obj.amountLoDollar;

                var amount3DABath = obj.amountABath == max3DABath ? "<font color='red'>" + obj.amountABath + "</font>" : obj.amountABath;
                var amount3DBBath = obj.amountBBath == max3DBBath ? "<font color='red'>" + obj.amountBBath + "</font>" : obj.amountBBath;
                var amount3DCBath = obj.amountCBath == max3DCBath ? "<font color='red'>" + obj.amountCBath + "</font>" : obj.amountCBath;
                var amount3DDBath = obj.amountDBath == max3DDBath ? "<font color='red'>" + obj.amountDBath + "</font>" : obj.amountDBath;
                var amount3DLoBath = obj.amountLoBath == max3DLoBath ? "<font color='red'>" + obj.amountLoBath + "</font>" : obj.amountLoBath;


            } else {

                if (obj.amountARiel == max3DARiel) {
                    var amount3DARiel = "<font color='red'>" + obj.amountARiel + "</font>";
                }
                else if (obj.amountARiel >= rankInfo.maxKHR) {
                    var amount3DARiel = "<font color='brown'>" + obj.amountARiel + "</font>";
                } else {
                    var amount3DARiel = obj.amountARiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountARiel + "</font>" : obj.amountARiel;
                }


                if (obj.amountBRiel == max3DBRiel) {
                    var amount3DBRiel = "<font color='red'>" + obj.amountBRiel + "</font>";
                }
                else if (obj.amountBRiel >= rankInfo.maxKHR) {
                    var amount3DBRiel = "<font color='brown'>" + obj.amountBRiel + "</font>";
                } else {
                    var amount3DBRiel = obj.amountBRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountBRiel + "</font>" : obj.amountBRiel;

                }


                if (obj.amountCRiel == max3DCRiel) {
                    var amount3DCRiel = "<font color='red'>" + obj.amountCRiel + "</font>";
                }
                else if (obj.amountCRiel >= rankInfo.maxKHR) {
                    var amount3DCRiel = "<font color='brown'>" + obj.amountCRiel + "</font>";

                } else {
                    var amount3DCRiel = obj.amountCRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountCRiel + "</font>" : obj.amountCRiel;
                }

                if (obj.amountDRiel == max3DDRiel) {
                    var amount3DDRiel = "<font color='red'>" + obj.amountDRiel + "</font>";
                }
                else if (obj.amountDRiel >= rankInfo.maxKHR) {
                    var amount3DDRiel = "<font color='brown'>" + obj.amountDRiel + "</font>";
                } else {
                    var amount3DDRiel = obj.amountDRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountDRiel + "</font>" : obj.amountDRiel;
                }

                if (obj.amountLoRiel == max3DLoRiel) {
                    var amount3DLoRiel = "<font color='red'>" + obj.amountLoRiel + "</font>";
                }
                else if (obj.amountLoRiel >= rankInfo.maxKHR) {
                    var amount3DLoRiel = "<font color='brown'>" + obj.amountLoRiel + "</font>";
                } else {
                    var amount3DLoRiel = obj.amountLoRiel >= rankInfo.minKHR ? "<font color='blue '>" + obj.amountLoRiel + "</font>" : obj.amountLoRiel;
                }


                if (obj.amountADollar == max3DADollar) {
                    var amount3DADollar = "<font color='red'>" + obj.amountADollar + "</font>";
                }
                else if (obj.amountADollar >= rankInfo.maxUSD) {
                    var amount3DADollar = "<font color='brown'>" + obj.amountADollar + "</font>";

                } else {
                    var amount3DADollar = obj.amountADollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountADollar + "</font>" : obj.amountADollar;

                }

                if (obj.amountBDollar == max3DBDollar) {
                    var amount3DBDollar = "<font color='red'>" + obj.amountBDollar + "</font>";
                }
                else if (obj.amountBDollar >= rankInfo.maxUSD) {
                    var amount3DBDollar = "<font color='brown'>" + obj.amountBDollar + "</font>";
                } else {
                    var amount3DBDollar = obj.amountBDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountBDollar + "</font>" : obj.amountBDollar;
                }

                if (obj.amountCDollar == max3DCDollar) {
                    var amount3DCDollar = "<font color='red'>" + obj.amountCDollar + "</font>";
                }
                else if (obj.amountCDollar >= rankInfo.maxUSD) {
                    var amount3DCDollar = "<font color='brown'>" + obj.amountCDollar + "</font>";
                } else {
                    var amount3DCDollar = obj.amountCDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountCDollar + "</font>" : obj.amountCDollar;
                }

                if (obj.amountDDollar == max3DDDollar) {
                    var amount3DDDollar = "<font color='red'>" + obj.amountDDollar + "</font>";
                }
                else if (obj.amountDDollar >= rankInfo.maxUSD) {
                    var amount3DDDollar = "<font color='brown'>" + obj.amountDDollar + "</font>";
                } else {
                    var amount3DDDollar = obj.amountDDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountDDollar + "</font>" : obj.amountDDollar;
                }

                if (obj.amountLoDollar == max3DLoDollar) {
                    var amount3DLoDollar = "<font color='red'>" + obj.amountLoDollar + "</font>";
                }
                else if (obj.amountLoDollar >= rankInfo.maxUSD) {
                    var amount3DLoDollar = "<font color='brown'>" + obj.amountLoDollar + "</font>";
                } else {
                    var amount3DLoDollar = obj.amountLoDollar >= rankInfo.minUSD ? "<font color='blue '>" + obj.amountLoDollar + "</font>" : obj.amountLoDollar;
                }


                if (obj.amountABath == max3DABath) {
                    var amount3DABath= "<font color='red'>" + obj.amountABath+ "</font>";
                }
                else if (obj.amountABath >= rankInfo.maxTHB) {
                    var amount3DABath = "<font color='brown'>" + obj.amountABath + "</font>";
                } else {
                    var amount3DABath = obj.amountABath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountABath + "</font>" : obj.amountABath;
                }

                if (obj.amountBBath == max3DBBath) {
                    var amount3DBBath= "<font color='red'>" + obj.amountBBath+ "</font>";
                }
                else if (obj.amountBBath >= rankInfo.maxTHB) {
                    var amount3DBBath = "<font color='brown'>" + obj.amountBBath + "</font>";
                } else {
                    var amount3DBBath = obj.amountBBath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountBBath + "</font>" : obj.amountBBath;
                }


                if (obj.amountCBath == max3DCBath) {
                    var amount3DCBath= "<font color='red'>" + obj.amountCBath+ "</font>";
                }
                else if (obj.amountCBath >= rankInfo.maxTHB) {
                    var amount3DCBath = "<font color='brown'>" + obj.amountCBath + "</font>";
                } else {
                    var amount3DCBath = obj.amountCBath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountCBath + "</font>" : obj.amountCBath;
                }

                if (obj.amountDBath == max3DDBath) {
                    var amount3DDBath= "<font color='red'>" + obj.amountDBath+ "</font>";
                }
                else if (obj.amountDBath >= rankInfo.maxTHB) {
                    var amount3DDBath = "<font color='brown'>" + obj.amountDBath + "</font>";
                } else {
                    var amount3DDBath = obj.amountDBath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountDBath + "</font>" : obj.amountDBath;
                }

                if (obj.amountLoBath == max3DLoBath) {
                    var amount3DLoBath= "<font color='red'>" + obj.amountLoBath+ "</font>";
                }
                else if (obj.amountLoBath >= rankInfo.maxTHB) {
                    var amount3DLoBath = "<font color='brown'>" + obj.amountLoBath + "</font>";
                } else {
                    var amount3DLoBath = obj.amountLoBath >= rankInfo.minTHB ? "<font color='blue '>" + obj.amountLoBath + "</font>" : obj.amountLoBath;
                }

            }
            var valueARiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DARiel + "</b</td>" : "";
            var valueBRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DBRiel + "</b></td>" : "";
            var valueCRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DCRiel + "</b></td>" : "";
            var valueDRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DDRiel + "</b></td>" : "";
            var valueLoRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLoRiel + "</b></td>" : "";

            var valueADollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DADollar + "</b></td>" : "";
            var valueBDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DBDollar + "</b></td>" : "";
            var valueCDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DCDollar + "</b></td>" : "";
            var valueDDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DDDollar + "</b></td>" : "";
            var valueLoDollar3D = self.currencyId.indexOf("USD") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLoDollar + "</b></td>" : "";

            var valueABath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DABath + "</b></td>" : "";
            var valueBBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DBBath + "</b></td>" : "";
            var valueCBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DCBath + "</b></td>" : "";
            var valueDBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DDBath + "</b></td>" : "";
            var valueLoBath3D = self.currencyId.indexOf("THB") > -1 ? "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'><b>" + amount3DLoBath + "</b></td>" : "";

            stringPrepare += "<tr>" +
                "<td style='border-left: solid 1px;border-right: solid 1px;' align='center'>" + obj.number + "</td>" +
                valueARiel3D +
                valueADollar3D +
                valueABath3D +

                valueBRiel3D +
                valueBDollar3D +
                valueBBath3D +


                valueCRiel3D +
                valueCDollar3D +
                valueCBath3D +

                valueDRiel3D +
                valueDDollar3D +
                valueLoBath3D +

                valueLoRiel3D +
                valueLoDollar3D +
                valueDBath3D +
                "</tr>";

        })
        var footerARiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueARiel3D + "</b</th>" : "";
        var footerBRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBRiel3D + "</b></th>" : "";
        var footerCRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCRiel3D + "</b></th>" : "";
        var footerDRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDRiel3D + "</b></th>" : "";
        var footerLoRiel3D = self.currencyId.indexOf("KHR") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoRiel3D + "</b></th>" : "";

        var footerADollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueADollar3D + "</b></th>" : "";
        var footerBDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBDollar3D + "</b></th>" : "";
        var footerCDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCDollar3D + "</b></th>" : "";
        var footerDDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDDollar3D + "</b></th>" : "";
        var footerLoDollar3D = self.currencyId.indexOf("USD") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoDollar3D + "</b></th>" : "";

        var footerABath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueABath3D + "</b></th>" : "";
        var footerBBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueBBath3D + "</b></th>" : "";
        var footerCBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueCBath3D + "</b></th>" : "";
        var footerDBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueDBath3D + "</b></th>" : "";
        var footerLoBath3D = self.currencyId.indexOf("THB") > -1 ? "<th style='border: solid 1px;' align='center'><b>" + grandValueLoBath3D + "</b></th>" : "";

        stringPrepare += "<tr class='sumFooter'>" +
            "<th style='border: solid 1px;' align='center';><font size='1'>TTL</font></th>" +

            footerARiel3D +
            footerADollar3D +
            footerABath3D +

            footerBRiel3D +
            footerBDollar3D +
            footerBBath3D +

            footerCRiel3D +
            footerCDollar3D +
            footerCBath3D +

            footerDRiel3D +
            footerDDollar3D +
            footerDBath3D +

            footerLoRiel3D +
            footerLoDollar3D +
            footerLoBath3D +
            "</tr>" + "</table>";

        data.content = stringPrepare;
        return data;
    }
})

var formatNumberToSeperate = function (val) {
    var data = "";
    if (val >= 0) {
        data = numeral(val).format('(0,0)');
    } else {
        data = "<font color='red'>" + numeral(val).format('(0,0)') + "</font>";
    }
    return data;
};

function compare(a, b) {
    if (a.date == b.date) {
        return (a.country < b.country) ? -1 : (a.country > b.country) ? 1 : 0;
    }
    else {
        return (a.date < b.date) ? -1 : 1;
    }
};

function finder(cmp, arr, attr) {
    var val = arr[0][attr];
    for (var i = 1; i < arr.length; i++) {
        val = cmp(val, arr[i][attr])
    }
    return val;
}
