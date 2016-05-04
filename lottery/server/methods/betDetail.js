Meteor.methods({
    lottery_betDetailInsert: function (data) {
        var dataEntry = {};
        dataEntry.betDetailDate = data.betDetailDate;
        dataEntry.page = data.page;
        dataEntry.line = data.line;
        dataEntry.agentId = data.agentId;
        dataEntry.time = data.time;

        dataEntry.branchId = data.branchId;
        dataEntry.currencyId = data.currencyId;

        dataEntry._id = data._id;
        //Must correct this condition

        var isThreeDB = false;
        var postLen = 0;
        var postLen2D = 0;
        var postLen3D = 0;
        if (data.time == "N") {
            if (Array.isArray(data.post)) {
                data.post.forEach(function (obj) {
                    if (obj == "A") {
                        postLen2D = postLen2D + 4;
                    } else if (obj == "4P") {
                        postLen2D = postLen2D + 7;
                    } else if (obj == "Lo") {
                        postLen2D = postLen2D + 32;
                    } else {
                        postLen2D = postLen2D + 1;
                    }
                })
            } else {
                data.post.split(",").forEach(function (postFin) {
                    if (postFin == "A") {
                        postLen2D += 4;
                    } else if (postFin == "4P") {
                        postLen2D += 7;
                    } else if (postFin == "Lo") {
                        postLen2D = postLen2D + 32;
                    } else {
                        postLen2D += 1;
                    }
                })
            }
        } else {
            if (Array.isArray(data.post)) {
                data.post.forEach(function (obj) {
                    if (obj == "4P") {
                        postLen2D = postLen2D + 4;
                    } else if (obj == "Lo") {
                        postLen2D = postLen2D + 23;
                    } else {
                        postLen2D = postLen2D + 1;
                    }
                })
            } else {
                data.post.split(",").forEach(function (postFin) {
                    if (postFin == "4P") {
                        postLen2D += 4;
                    } else if (postFin == "Lo") {
                        postLen2D = postLen2D + 23;
                    } else {
                        postLen2D += 1;
                    }
                })
            }
        }


        if (data.time == "N") {
            if (Array.isArray(data.post)) {
                data.post.forEach(function (obj) {
                    if (obj == "A") {
                        postLen3D = postLen3D + 3;
                    } else if (obj == "4P") {
                        postLen3D = postLen3D + 6;
                    } else if (obj == "Lo") {
                        postLen3D = postLen3D + 25;
                    } else {
                        postLen3D = postLen3D + 1;
                    }
                })
            } else {
                data.post.split(",").forEach(function (postFin) {
                    if (postFin == "A") {
                        postLen3D += 3;
                    } else if (postFin == "4P") {
                        postLen3D += 6;
                    } else if (postFin == "Lo") {
                        postLen3D = postLen3D + 25;
                    } else {
                        postLen3D += 1;
                    }
                })
            }
        } else {
            if (Array.isArray(data.post)) {
                data.post.forEach(function (obj) {
                    if (obj == "4P") {
                        postLen3D = postLen3D + 4;
                    } else if (obj == "Lo") {
                        postLen3D = postLen3D + 19;
                    } else {
                        postLen3D = postLen3D + 1;
                    }
                })
            } else {
                data.post.split(",").forEach(function (postFin) {
                    if (postFin == "4P") {
                        postLen3D += 4;
                    } else if (postFin == "Lo") {
                        postLen3D = postLen3D + 19;
                    } else {
                        postLen3D += 1;
                    }
                })
            }
        }


        if (data.number.substr(data.number.length - 1, data.number.length) == "*") {
            if (data.number.length == 4) {
                isThreeDB = true;
            } else {
                isThreeDB = false;
            }
        } else {
            if (data.number.length == 3) {
                isThreeDB = true
            } else {
                isThreeDB = false;
            }
        }


        if (isThreeDB == true) {
            postLen = postLen3D;
        } else {
            postLen = postLen2D;
        }

        var amount = 0;

        var items = [];
        if (/-/.test(data.number)) {
            var num = data.number.split("-");
            if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) == num[1].substr(num[1].length - 1, 1)) {
                var doc = Meteor.call('ousKot', data.number);
            } else if (num[0].length==2 && parseInt(num[1]) % 11 == 0 && parseInt(num[0]) % 11 == 0 && parseInt(num[1]) >= 10) {
                var doc = Meteor.call('ousPhe', data.number);
            } else if (num[0].length==3 && parseInt(num[1]) % 111 == 0 && parseInt(num[0]) % 111 == 0 && parseInt(num[1]) >= 111) {
                var doc = Meteor.call('ousPhe', data.number);
            } else {
                var doc = Meteor.call('reang', data.number);
            }

            doc.forEach(function (obj) {
                items.push({
                    number: obj,
                    amount: data.amount,
                    totalPerNumber: data.amount * postLen
                })
                amount += data.amount;
            })

            dataEntry.total = postLen * amount;
        } else if (/0>/.test(data.number)) {
            var doc = Meteor.call('ouskbal', data.number);
            doc.forEach(function (obj) {
                items.push({
                    number: obj,
                    amount: data.amount,
                    totalPerNumber: data.amount * postLen
                })
                amount += data.amount;
            })
            dataEntry.total = postLen * amount;
        } else if (/>/.test(data.number) && data.number.search(/0>/) == -1) {
            var doc = Meteor.call('ouskontoy', data.number);
            doc.forEach(function (obj) {
                items.push({
                    number: obj,
                    amount: data.amount,
                    totalPerNumber: data.amount * postLen
                })
                amount += data.amount;
            })
            dataEntry.total = postLen * amount;
        } else if (data.number.substr(data.number.length - 1, data.number.length) == "*") {
            var doc = Meteor.call('trolob', data.number);
            doc.forEach(function (obj) {
                items.push({
                    number: obj,
                    amount: data.amount,
                    totalPerNumber: data.amount * postLen
                })
                amount += data.amount;
            })
            dataEntry.total = postLen * amount;
        } else {
            items.push({
                number: data.number,
                amount: data.amount,
                totalPerNumber: data.amount * postLen
            })
            dataEntry.total = postLen * data.amount;
        }

        dataEntry.post = data.post;
        dataEntry.items = items;
        return Lottery.Collection.BetDetail.insert(dataEntry);
    },
    lottery_betDetailRemove: function (id) {
        return Lottery.Collection.BetDetail.remove(id);
    },
    ousKot: function (data) {
        var list = [];
        var num = data.split("-");
        var i = 0;
        if ((num[0]).length == 2) {
            for (i = parseInt(num[0]); i <= parseInt(num[1]); i = i + 10) {
                if (i.toString().length == 1) {
                    list.push('0' + i);
                } else {
                    list.push(i);
                }
            }
        } else if ((num[0]).length == 3) {
            if (parseInt(num[1]) < parseInt(num[0]) + 100) {
                for (i = parseInt(num[0]); i <= parseInt(num[1]); i = i + 10) {
                    if (i.toString().length == 1) {
                        list.push('00' + i);
                    } else if (i.toString().length == 2) {
                        list.push('0' + i);
                    } else {
                        list.push(i);
                    }
                }
            }else{
                for (i = parseInt(num[0]); i <= parseInt(num[1]); i = i + 100) {
                    if (i.toString().length == 1) {
                        list.push('00' + i);
                    } else if (i.toString().length == 2) {
                        list.push('0' + i);
                    } else {
                        list.push(i);
                    }
                }
            }

        }
        return list;
    },
    ousPhe: function (data) {
        var list = [];
        var num = data.split("-");

        if ((num[0]).length == 2) {
            if (0 >= parseInt(num[0]) && 0 <= parseInt(num[1])) {
                list.push("00");
            }
            if (11 >= parseInt(num[0]) && 11 <= parseInt(num[1])) {
                list.push("11");
            }
            if (22 >= parseInt(num[0]) && 22 <= parseInt(num[1])) {
                list.push("22");
            }
            if (33 >= parseInt(num[0]) && 33 <= parseInt(num[1])) {
                list.push("33");
            }
            if (44 >= parseInt(num[0]) && 44 <= parseInt(num[1])) {
                list.push("44");
            }
            if (55 >= parseInt(num[0]) && 55 <= parseInt(num[1])) {
                list.push("55");
            }
            if (66 >= parseInt(num[0]) && 66 <= parseInt(num[1])) {
                list.push("66");
            }
            if (77 >= parseInt(num[0]) && 77 <= parseInt(num[1])) {
                list.push("77");
            }
            if (88 >= parseInt(num[0]) && 88 <= parseInt(num[1])) {
                list.push("88");
            }
            if (99 >= parseInt(num[0]) && 99 <= parseInt(num[1])) {
                list.push("99");
            }
        } else if ((num[0]).length == 3) {
            if (0 >= parseInt(num[0]) && 0 <= parseInt(num[1])) {
                list.push("000");
            }
            if (111 >= parseInt(num[0]) && 111 <= parseInt(num[1])) {
                list.push("111");
            }
            if (222 >= parseInt(num[0]) && 222 <= parseInt(num[1])) {
                list.push("222");
            }
            if (333 >= parseInt(num[0]) && 333 <= parseInt(num[1])) {
                list.push("333");
            }
            if (444 >= parseInt(num[0]) && 444 <= parseInt(num[1])) {
                list.push("444");
            }
            if (555 >= parseInt(num[0]) && 555 <= parseInt(num[1])) {
                list.push("555");
            }
            if (666 >= parseInt(num[0]) && 666 <= parseInt(num[1])) {
                list.push("666");
            }
            if (777 >= parseInt(num[0]) && 777 <= parseInt(num[1])) {
                list.push("777");
            }
            if (888 >= parseInt(num[0]) && 888 <= parseInt(num[1])) {
                list.push("888");
            }
            if (999 >= parseInt(num[0]) && 999 <= parseInt(num[1])) {
                list.push("999");
            }
        }
        return list;
    },
    reang: function (data) {
        var list = [];
        var num = data.split("-");
        var i = 0;
        if ((num[0]).length == 2) {
            for (i = parseInt(num[0]); i <= parseInt(num[1]); i++) {
                if (i.toString().length == 1) {
                    list.push('0' + i);
                } else {
                    list.push(i);
                }
            }
        } else if ((num[0]).length == 3) {
            for (i = parseInt(num[0]); i <= parseInt(num[1]); i++) {
                if (i.toString().length == 1) {
                    list.push('00' + i);
                } else if (i.toString().length == 2) {
                    list.push('0' + i);
                } else {
                    list.push(i);
                }
            }
        }
        return list;
    },
    ouskbal: function (data) {
        var list = [];
        var num = data.split(">");
        var i = 0;
        for (i = parseInt(num[0]); i < parseInt(num[0]) + 10; i++) {
            if (i.toString().length == 1) {
                list.push('0' + i);
            } else {
                list.push(i);
            }
        }
        return list;
    },
    ouskontoy: function (data) {
        var list = [];
        var num = data.split(">");
        var i = 0;
        for (i = parseInt(num[0]); i < 100; i = i + 10) {
            if (i.toString().length == 1) {
                list.push('0' + i);
            } else {
                list.push(i);
            }
        }
        return list;
    },
    trolob: function (data) {
        var list = [];
        var num = data.split("*");
        var numArray = num[0].split("");
        var numLength = numArray.length;

        if (numLength == 2) {
            var i = 0;
            for (i; i < numLength; i++) {
                var j = 0;
                var numPrepare = numArray[i];
                for (j; j < numLength; j++) {
                    if (j != i) {
                        numPrepare += numArray[j];
                    }
                }
                list.push(numPrepare);
            }

        } else if (numLength == 3) {
            var i = 0;
            for (i; i < numLength; i++) {
                var j = 0;
                for (j; j < numLength; j++) {
                    if (j != i) {
                        var k = 0;
                        for (k; k < numLength; k++) {
                            if (k != i && k != j) {
                                var numPrepare = numArray[i] + numArray[j] + numArray[k];
                            }
                        }
                        list.push(numPrepare);
                    }
                }
            }
        }

        //a.filter( onlyUnique );
        return list.filter(onlyUnique);

    },
    factorial: function (n) {
        if (n === 0) {
            return 1;
        }
        return n * Meteor.call('factorial', n - 1);
    },
    lottery_berDetailRemoveByBetId: function (id) {
        var doc = Lottery.Collection.Bet.findOne(id);

        doc.items.map(function (obj) {
            Lottery.Collection.BetDetail.remove(obj.betDetailId);
        })
        return true;
    },
    lottery_betDetailGroupByNumber: function (selector) {
        return Lottery.Collection.BetDetail.aggregate([
            {
                $unwind: "$items"
            }, {
                $match: selector
            }, {
                $group: {
                    _id: {
                        betNumber: "$items.number"
                    },
                    total: {
                        $sum: "$items.amount"
                    }
                }
            },
            {
                $sort: {
                    "_id.betNumber": 1
                }
            }
        ]);
    }
});


var onlyUnique = function (value, index, self) {
    return self.indexOf(value) === index;
}