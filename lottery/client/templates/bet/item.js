/**
 * Declare template
 */
var itemTpl = Template.lottery_betItem;

/**
 * Define state
 */
itemsStateList = new ReactiveList();
stateCss = new ReactiveObj({
    amount: 0,
    cssClassForAddMore: 'disabled',
    cssClassForSubmit: 'disabled'
});


itemTpl.onRendered(function () {
    /* itemsInputmask();*/
    $('.tmpPost').selectize({
        maxItems: 5
    });
    $('.tmpCurrency').selectize();
    $('.tmpNumber').tagsinput({
        /*tagClass: 'label label-'*/
        allowDuplicates: true
    })
    clearSelectize($('[name="tmpPost"]'));
    $('[name="tmpNumber"]').tagsinput('focus');

});

itemTpl.helpers({
    cssClassForAddMore: function () {
        return stateCss.get('cssClassForAddMore');
    },
    items: function () {
        return itemsStateList.fetch();
    },
    totalRiel2D: function () {
        var totalVal = 0;
        var timeSelect = stateTime.get('selectTime');
        _.each(itemsStateList.fetch(), function (o) {
            if (o.currencyId == "KHR") {
                var isTwoDR = false;
                var postLength = 0;
                if (timeSelect == "N") {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "A") {
                                postLength = postLength + 4;
                            } else if (obj == "4P") {
                                postLength = postLength + 7;
                            } else if (obj == "Lo") {
                                postLength = postLength + 32;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "A") {
                                postLength += 4;
                            } else if (postFin == "4P") {
                                postLength += 7;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 32;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                } else {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "4P") {
                                postLength = postLength + 4;
                            } else if (obj == "Lo") {
                                postLength = postLength + 23;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "4P") {
                                postLength += 4;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 23;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                }


                var betLen = 1;
                if (/-/.test(o.number)) {
                    var num = o.number.split("-");
                    if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) == num[1].substr(num[1].length - 1, 1)) {
                        var dataReang = ReactiveMethod.call('ousKot', o.number);
                    } else if (num[0].length == 2 && (parseInt(num[1]) % 11 == 0 && parseInt(num[0]) % 11 == 0) && parseInt(num[1]) >= 10) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else if (num[0].length == 3 && (parseInt(num[1]) % 111 == 0 && parseInt(num[0]) % 111 == 0) && parseInt(num[1]) >= 111) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else {
                        var dataReang = ReactiveMethod.call('reang', o.number);
                    }
                    if (Array.isArray(dataReang)) {
                        betLen = dataReang.length;
                    }
                    if ((num[0]).length == 2) {
                        isTwoDR = true;
                    } else if ((num[0]).length == 3) {
                        isTwoDR = false;
                    }
                } else if (/0>/.test(o.number)) {
                    var dataOuskbal = ReactiveMethod.call('ouskbal', o.number);
                    if (Array.isArray(dataOuskbal)) {
                        betLen = dataOuskbal.length;
                    }
                    isTwoDR = true;

                } else if (/>/.test(o.number) && o.number.search(/0>/) == -1) {
                    var dataouskontoy = ReactiveMethod.call('ouskontoy', o.number);
                    if (Array.isArray(dataouskontoy)) {
                        betLen = dataouskontoy.length;
                    }
                    isTwoDR = true;

                } else if (o.number.substr(o.number.length - 1, o.number.length) == "*") {
                    var dataTrolob = ReactiveMethod.call('trolob', o.number);
                    if (Array.isArray(dataTrolob)) {
                        betLen = dataTrolob.length;
                    }
                    if (o.number.length == 4) {
                        isTwoDR = false;
                    } else {
                        isTwoDR = true;
                    }
                } else {
                    if (o.number.length == 2) {
                        isTwoDR = true
                    }
                }

                if (isTwoDR == true) {
                    totalVal += betLen * postLength * o.amount;
                }
            }
        });
        $('.loading-box').addClass('hidden');
        return totalVal;
    },
    totalRiel3D: function () {
        var totalVal = 0;

        var timeSelect = stateTime.get('selectTime');
        _.each(itemsStateList.fetch(), function (o) {
            if (o.currencyId == "KHR") {
                var isThreeDR = false;
                var postLength = 0;
                if (timeSelect == "N") {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "A") {
                                postLength = postLength + 3;
                            } else if (obj == "4P") {
                                postLength = postLength + 6;
                            } else if (obj == "Lo") {
                                postLength = postLength + 25;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "A") {
                                postLength += 3;
                            } else if (postFin == "4P") {
                                postLength += 6;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 25;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                } else {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "4P") {
                                postLength = postLength + 4;
                            } else if (obj == "Lo") {
                                postLength = postLength + 19;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "4P") {
                                postLength += 4;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 19;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                }

                var betLen = 1;
                if (/-/.test(o.number)) {
                    var num = o.number.split("-");
                    if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) == num[1].substr(num[1].length - 1, 1)) {
                        var dataReang = ReactiveMethod.call('ousKot', o.number);
                    } else if (num[0].length == 2 && (parseInt(num[1]) % 11 == 0 && parseInt(num[0]) % 11 == 0) && parseInt(num[1]) >= 10) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else if (num[0].length == 3 && (parseInt(num[1]) % 111 == 0 && parseInt(num[0]) % 111 == 0) && parseInt(num[1]) >= 111) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else {
                        var dataReang = ReactiveMethod.call('reang', o.number);
                    }
                    if (Array.isArray(dataReang)) {
                        betLen = dataReang.length;
                    }
                    if ((num[0]).length == 3) {
                        isThreeDR = true;
                    } else if ((num[0]).length == 2) {
                        isThreeDR = false;
                    }
                } else if (/0>/.test(o.number)) {
                    var dataOuskbal = ReactiveMethod.call('ouskbal', o.number);
                    if (Array.isArray(dataOuskbal)) {
                        betLen = dataOuskbal.length;
                    }
                } else if (/>/.test(o.number) && o.number.search(/0>/) == -1) {
                    var dataouskontoy = ReactiveMethod.call('ouskontoy', o.number);
                    if (Array.isArray(dataouskontoy)) {
                        betLen = dataouskontoy.length;
                    }
                } else if (o.number.substr(o.number.length - 1, o.number.length) == "*") {
                    var dataTrolob = ReactiveMethod.call('trolob', o.number);
                    if (Array.isArray(dataTrolob)) {
                        betLen = dataTrolob.length;
                    }
                    if (o.number.length == 4) {
                        isThreeDR = true;
                    } else {
                        isThreeDR = false;
                    }
                } else {
                    if (o.number.length == 3) {
                        isThreeDR = true
                    }
                }
                if (isThreeDR == true) {
                    totalVal += betLen * postLength * o.amount;
                }
            }
        });
        $('.loading-box').addClass('hidden');
        return totalVal;
    }, totalDollar2D: function () {
        var totalVal = 0;
        var timeSelect = stateTime.get('selectTime');
        _.each(itemsStateList.fetch(), function (o) {
            if (o.currencyId == "USD") {
                var isTwoDD = false;
                var postLength = 0;
                if (timeSelect == "N") {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "A") {
                                postLength = postLength + 4;
                            } else if (obj == "4P") {
                                postLength = postLength + 7;
                            } else if (obj == "Lo") {
                                postLength = postLength + 32;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "A") {
                                postLength += 4;
                            } else if (postFin == "4P") {
                                postLength += 7;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 32;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                } else {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "4P") {
                                postLength = postLength + 4;
                            } else if (obj == "Lo") {
                                postLength = postLength + 23;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "4P") {
                                postLength += 4;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 23;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                }


                var betLen = 1;
                if (/-/.test(o.number)) {
                    var num = o.number.split("-");
                    if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) == num[1].substr(num[1].length - 1, 1)) {
                        var dataReang = ReactiveMethod.call('ousKot', o.number);
                    } else if (num[0].length == 2 && (parseInt(num[1]) % 11 == 0 && parseInt(num[0]) % 11 == 0) && parseInt(num[1]) >= 10) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else if (num[0].length == 3 && (parseInt(num[1]) % 111 == 0 && parseInt(num[0]) % 111 == 0) && parseInt(num[1]) >= 111) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else {
                        var dataReang = ReactiveMethod.call('reang', o.number);
                    }
                    if (Array.isArray(dataReang)) {
                        betLen = dataReang.length;
                    }
                    if ((num[0]).length == 2) {
                        isTwoDD = true;
                    } else if ((num[0]).length == 3) {
                        isTwoDD = false;
                    }
                } else if (/0>/.test(o.number)) {
                    var dataOuskbal = ReactiveMethod.call('ouskbal', o.number);
                    if (Array.isArray(dataOuskbal)) {
                        betLen = dataOuskbal.length;
                    }
                    isTwoDD = true;
                } else if (/>/.test(o.number) && o.number.search(/0>/) == -1) {
                    var dataouskontoy = ReactiveMethod.call('ouskontoy', o.number);
                    if (Array.isArray(dataouskontoy)) {
                        betLen = dataouskontoy.length;
                    }
                    isTwoDD = true;
                } else if (o.number.substr(o.number.length - 1, o.number.length) == "*") {
                    var dataTrolob = ReactiveMethod.call('trolob', o.number);
                    if (Array.isArray(dataTrolob)) {
                        betLen = dataTrolob.length;
                    }
                    if (o.number.length == 4) {
                        isTwoDD = false;
                    } else {
                        isTwoDD = true;
                    }
                } else {
                    if (o.number.length == 2) {
                        isTwoDD = true
                    }
                }
                if (isTwoDD == true) {
                    totalVal += betLen * postLength * o.amount;
                }
            }
        });
        $('.loading-box').addClass('hidden');
        return totalVal;
    },
    totalDollar3D: function () {
        var totalVal = 0;

        var timeSelect = stateTime.get('selectTime');
        _.each(itemsStateList.fetch(), function (o) {
            if (o.currencyId == "USD") {
                var isThreeDD = false;
                var postLength = 0;
                if (timeSelect == "N") {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "A") {
                                postLength = postLength + 3;
                            } else if (obj == "4P") {
                                postLength = postLength + 6;
                            } else if (obj == "Lo") {
                                postLength = postLength + 25;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "A") {
                                postLength += 3;
                            } else if (postFin == "4P") {
                                postLength += 6;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 25;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                } else {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "4P") {
                                postLength = postLength + 4;
                            } else if (obj == "Lo") {
                                postLength = postLength + 19;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "4P") {
                                postLength += 4;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 19;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                }

                var betLen = 1;
                if (/-/.test(o.number)) {
                    var num = o.number.split("-");
                    if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) == num[1].substr(num[1].length - 1, 1)) {
                        var dataReang = ReactiveMethod.call('ousKot', o.number);
                    } else if (num[0].length == 2 && (parseInt(num[1]) % 11 == 0 && parseInt(num[0]) % 11 == 0) && parseInt(num[1]) >= 10) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else if (num[0].length == 3 && (parseInt(num[1]) % 111 == 0 && parseInt(num[0]) % 111 == 0) && parseInt(num[1]) >= 111) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else {
                        var dataReang = ReactiveMethod.call('reang', o.number);
                    }
                    if (Array.isArray(dataReang)) {
                        betLen = dataReang.length;
                    }
                    if ((num[0]).length == 3) {
                        isThreeDD = true;
                    } else if ((num[0]).length == 2) {
                        isThreeDD = false;
                    }
                } else if (/0>/.test(o.number)) {
                    var dataOuskbal = ReactiveMethod.call('ouskbal', o.number);
                    if (Array.isArray(dataOuskbal)) {
                        betLen = dataOuskbal.length;
                    }
                } else if (/>/.test(o.number) && o.number.search(/0>/) == -1) {
                    var dataouskontoy = ReactiveMethod.call('ouskontoy', o.number);
                    if (Array.isArray(dataouskontoy)) {
                        betLen = dataouskontoy.length;
                    }
                } else if (o.number.substr(o.number.length - 1, o.number.length) == "*") {
                    var dataTrolob = ReactiveMethod.call('trolob', o.number);
                    if (Array.isArray(dataTrolob)) {
                        betLen = dataTrolob.length;
                    }
                    if (o.number.length == 4) {
                        isThreeDD = true;
                    } else {
                        isThreeDD = false;
                    }
                } else {
                    if (o.number.length == 3) {
                        isThreeDD = true
                    }
                }
                if (isThreeDD == true) {
                    totalVal += betLen * postLength * o.amount;
                }
            }
        });
        return totalVal;
    }, totalBath2D: function () {
        var totalVal = 0;
        var timeSelect = stateTime.get('selectTime');
        _.each(itemsStateList.fetch(), function (o) {
            if (o.currencyId == "THB") {
                var isTwoDB = false;
                var postLength = 0;
                if (timeSelect == "N") {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "A") {
                                postLength = postLength + 4;
                            } else if (obj == "4P") {
                                postLength = postLength + 7;
                            } else if (obj == "Lo") {
                                postLength = postLength + 32;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "A") {
                                postLength += 4;
                            } else if (postFin == "4P") {
                                postLength += 7;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 32;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                } else {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "4P") {
                                postLength = postLength + 4;
                            } else if (obj == "Lo") {
                                postLength = postLength + 23;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "4P") {
                                postLength += 4;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 23;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                }


                var betLen = 1;
                if (/-/.test(o.number)) {
                    var num = o.number.split("-");
                    if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) == num[1].substr(num[1].length - 1, 1)) {
                        var dataReang = ReactiveMethod.call('ousKot', o.number);
                    } else if (num[0].length == 2 && (parseInt(num[1]) % 11 == 0 && parseInt(num[0]) % 11 == 0) && parseInt(num[1]) >= 10) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else if (num[0].length == 3 && (parseInt(num[1]) % 111 == 0 && parseInt(num[0]) % 111 == 0) && parseInt(num[1]) >= 111) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else {
                        var dataReang = ReactiveMethod.call('reang', o.number);
                    }
                    if (Array.isArray(dataReang)) {
                        betLen = dataReang.length;
                    }
                    if ((num[0]).length == 2) {
                        isTwoDB = true;
                    } else if ((num[0]).length == 3) {
                        isTwoDB = false;
                    }
                } else if (/0>/.test(o.number)) {
                    var dataOuskbal = ReactiveMethod.call('ouskbal', o.number);
                    if (Array.isArray(dataOuskbal)) {
                        betLen = dataOuskbal.length;
                    }
                    isTwoDB = true;

                } else if (/>/.test(o.number) && o.number.search(/0>/) == -1) {
                    var dataouskontoy = ReactiveMethod.call('ouskontoy', o.number);
                    if (Array.isArray(dataouskontoy)) {
                        betLen = dataouskontoy.length;
                    }
                    isTwoDB = true;

                } else if (o.number.substr(o.number.length - 1, o.number.length) == "*") {
                    var dataTrolob = ReactiveMethod.call('trolob', o.number);
                    if (Array.isArray(dataTrolob)) {
                        betLen = dataTrolob.length;
                    }
                    if (o.number.length == 4) {
                        isTwoDB = false;
                    } else {
                        isTwoDB = true;
                    }
                } else {
                    if (o.number.length == 2) {
                        isTwoDB = true
                    }
                }
                if (isTwoDB == true) {
                    totalVal += betLen * postLength * o.amount;
                }
            }
        });
        $('.loading-box').addClass('hidden');
        return totalVal;
    },
    totalBath3D: function () {
        var totalVal = 0;

        var timeSelect = stateTime.get('selectTime');
        _.each(itemsStateList.fetch(), function (o) {
            if (o.currencyId == "THB") {
                var isThreeDB = false;
                var postLength = 0;
                if (timeSelect == "N") {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "A") {
                                postLength = postLength + 3;
                            } else if (obj == "4P") {
                                postLength = postLength + 6;
                            } else if (obj == "Lo") {
                                postLength = postLength + 25;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "A") {
                                postLength += 3;
                            } else if (postFin == "4P") {
                                postLength += 6;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 25;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                } else {
                    if (Array.isArray(o.post)) {
                        o.post.forEach(function (obj) {
                            if (obj == "4P") {
                                postLength = postLength + 4;
                            } else if (obj == "Lo") {
                                postLength = postLength + 19;
                            } else {
                                postLength = postLength + 1;
                            }
                        })
                    } else {
                        o.post.split(",").forEach(function (postFin) {
                            if (postFin == "4P") {
                                postLength += 4;
                            } else if (postFin == "Lo") {
                                postLength = postLength + 19;
                            } else {
                                postLength += 1;
                            }
                        })
                    }
                }

                var betLen = 1;
                if (/-/.test(o.number)) {
                    var num = o.number.split("-");
                    if (parseInt(num[1]) - parseInt(num[0]) >= 10 && num[0].substr(num[0].length - 1, 1) == num[1].substr(num[1].length - 1, 1)) {
                        var dataReang = ReactiveMethod.call('ousKot', o.number);
                    } else if (num[0].length == 2 && (parseInt(num[1]) % 11 == 0 && parseInt(num[0]) % 11 == 0) && parseInt(num[1]) >= 10) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else if (num[0].length == 3 && (parseInt(num[1]) % 111 == 0 && parseInt(num[0]) % 111 == 0) && parseInt(num[1]) >= 111) {
                        var dataReang = ReactiveMethod.call('ousPhe', o.number);
                    } else {
                        var dataReang = ReactiveMethod.call('reang', o.number);
                    }
                    if (Array.isArray(dataReang)) {
                        betLen = dataReang.length;
                    }

                    if ((num[0]).length == 3) {
                        isThreeDB = true;
                    } else if ((num[0]).length == 2) {
                        isThreeDB = false;
                    }
                } else if (/0>/.test(o.number)) {
                    var dataOuskbal = ReactiveMethod.call('ouskbal', o.number);
                    if (Array.isArray(dataOuskbal)) {
                        betLen = dataOuskbal.length;
                    }
                } else if (/>/.test(o.number) && o.number.search(/0>/) == -1) {
                    var dataouskontoy = ReactiveMethod.call('ouskontoy', o.number);
                    if (Array.isArray(dataouskontoy)) {
                        betLen = dataouskontoy.length;
                    }
                } else if (o.number.substr(o.number.length - 1, o.number.length) == "*") {
                    var dataTrolob = ReactiveMethod.call('trolob', o.number);
                    if (Array.isArray(dataTrolob)) {
                        betLen = dataTrolob.length;
                    }
                    if (o.number.length == 4) {
                        isThreeDB = true;
                    } else {
                        isThreeDB = false;
                    }
                } else {
                    if (o.number.length == 3) {
                        isThreeDB = true
                    }
                }
                if (isThreeDB == true) {
                    totalVal += betLen * postLength * o.amount;
                }
            }
        });
        $('.loading-box').addClass('hidden');
        return totalVal;
    },
    postList: function () {
        if(stateTime.get('selectTime')=="T"){
            $("[name='tmpPost']").val("A").trigger("change");
        }
        return Lottery.List.postList();
    },
    currencyList: function () {
        return Lottery.List.currencyList();
    }
});

itemTpl.events({
    'click .disabled': function (e) {
        e.preventDefault();
    },
    'click .js-add-item': function (e, t) {
        $('.loading-box').removeClass('hidden');
        var index = 0;

        var numberList = $('[name="tmpNumber"]').tagsinput('items')
        numberList.forEach(function (obj) {
            var item = {};
            item.number = obj;

            item.amount = parseInt(t.$('[name="tmpAmount"]').val());
            item.post = t.$('[name="tmpPost"]').val();
            item.currencyId = t.$('[name="tmpCurrency"]').val();

            if (itemsStateList.length() > 0) {
                index = itemsStateList.last().index + 1;
            }
            item.indexUniqueNumber = index;

            item.indexNumber = 'items.' + index + '.number';
            item.indexAmount = 'items.' + index + '.amount';
            item.indexPost = 'items.' + index + '.post';
            item.indexCurrency = 'items.' + index + '.currencyId';
            item.indexUniqueNumber = 'items.' + index + ".indexUniqueNumber";
            itemsStateList.insert(item.indexUniqueNumber, item);
        });
        $('[name="tmpAmount"]').val("");
        clearSelectize($('[name="tmpPost"]'));
        $('[name="tmpNumber"]').tagsinput('removeAll');
        /*$('[name="tmpNumber"]').focus();*/
        stateCss.set('cssClassForSubmit', '');
        Meteor.setTimeout(function () {
            $('[name="tmpNumber"]').tagsinput('focus');
        }, 100)
    },
    'click .js-remove-item': function (e, t) {
        $('.loading-box').removeClass('hidden');
        var self = this;
        if (!_.isUndefined(self.betDetailId)) {
            Meteor.call('lottery_betDetailRemove', self.betDetailId);
        }
        itemsStateList.remove(self.indexUniqueNumber);
        $('[name="tmpNumber"]').tagsinput('focus');
       stateCss.set('cssClassForSubmit','');
    },
    'keypress .tmpAmount': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'keypress .bootstrap-tagsinput': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        /*if ($(evt.currentTarget).val().indexOf('.') != -1) {
         if (charCode == 46) {
         return false;
         }
         }*/
        //return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
        return !(/*charCode != 46 &&*/ charCode != 42 && charCode != 45 && charCode != 62 && charCode > 31 && (charCode < 48 || charCode > 57));

    },
    'keypress .js-number': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        /*if ($(evt.currentTarget).val().indexOf('.') != -1) {
         if (charCode == 46) {
         return false;
         }
         }*/
        //return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
        return !(/*charCode != 46 &&*/ charCode != 42 && charCode != 45 && charCode != 62 && charCode > 31 && (charCode < 48 || charCode > 57));
    },
    'keypress .js-amount': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
    , 'keyup .js-amount': function (e, t) {
        $('.loading-box').removeClass('hidden');
        var elm = $(e.currentTarget);

        var indexUniqueNumber = elm.parents('div.list').find('.js-index').val();

        var number = elm.parents('div.list').find('.js-number').val();
        var amount = elm.parents('div.list').find('.js-amount').val();
        //var getItem = itemsStateList.get(index);
        var item = {};
        item.number = number;
        item.amount = amount;

        itemsStateList.update(indexUniqueNumber, item);
        stateCss.set('cssClassForSubmit', '');
    }
    , 'keyup .js-number': function (e, t) {
        $('.loading-box').removeClass('hidden');
        var elm = $(e.currentTarget);

        var indexUniqueNumber = elm.parents('div.list').find('.js-index').val();

        var number = elm.parents('div.list').find('.js-number').val();
        var amount = elm.parents('div.list').find('.js-amount').val();
        //var getItem = itemsStateList.get(index);
        var item = {};
        item.number = number;
        item.amount = amount;

        itemsStateList.update(indexUniqueNumber, item);
        stateCss.set('cssClassForSubmit', '');
    },
    'keyup [name="tmpAmount"]': function () {
        stateCss.set('cssClassForSubmit', 'disabled');

        if ($('[name="tmpNumber"]').val() != null
            && $('[name="tmpAmount"]').val() != null
            && $('[name="tmpAmount"]').val() != ""
            && $('[name="tmpPost"]').val() != null
        ) {
            stateCss.set('cssClassForAddMore', 'js-add-item');
        } else {
            stateCss.set('cssClassForAddMore', 'disabled');
        }
    },
    'change [name="tmpPost"],[name="tmpCurrency"]': function () {
        if ($('[name="tmpNumber"]').val() != null
            && $('[name="tmpAmount"]').val() != null
            && $('[name="tmpAmount"]').val() != ""
            && $('[name="tmpPost"]').val() != null
        ) {
            stateCss.set('cssClassForAddMore', 'js-add-item');
        } else {
            stateCss.set('cssClassForAddMore', 'disabled');
        }
    }
});
