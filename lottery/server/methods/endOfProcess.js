Meteor.methods({
    lottery_endOfProcess: function (params) {

        var self = params;
        var selector = {};

        var selectorLo = {};
        var selectorA = {};
        var selectorB = {};
        var selectorC = {};
        var selectorD = {};
        var selector4P = {};

        if (self.branchId != "") {
            selector.branchId = self.branchId;
            selectorLo.branchId = self.branchId;
            selectorA.branchId = self.branchId;
            selectorB.branchId = self.branchId;
            selectorC.branchId = self.branchId;
            selectorD.branchId = self.branchId;
            selector4P.branchId = self.branchId;
        }
        var agentName = "";

        selector.agentId = self.agentId;
        selectorA.agentId = self.agentId;
        selectorB.agentId = self.agentId;
        selectorC.agentId = self.agentId;
        selectorD.agentId = self.agentId;
        selector4P.agentId = self.agentId;
        selectorLo.agentId = self.agentId;
        agentName = Lottery.Collection.Agent.findOne(self.agentId).name;

        selector.betDate = new Date(self.date);
        selector.time = self.time;

        var totalPage = Meteor.call('getTotalPage', selector);
        var pageList = [];

        var i = 1;
        for (i; i <= parseInt(totalPage); i++) {
            pageList.push(i.toString());
        }


        /*Result */
        var selectorResult = {};
        selectorResult.time = self.time;
        selectorResult.resultDate = new Date(self.date);
        var resultThisDay = Lottery.Collection.Result.findOne(selectorResult);
        var betDetailList = [];
        if (resultThisDay != null) {

            var resultA = [];
            var resultA2D = [];
            var resultA3D = [];
            var resultB = [];
            var resultB2D = [];
            var resultB3D = [];
            var resultC = [];
            var resultC2D = [];
            var resultC3D = [];
            var resultD = [];
            var resultD2D = [];
            var resultD3D = [];
            var result4P = [];
            var result4P2D = [];
            var result4P3D = [];
            var resultLo = [];
            var resultLo2D = [];
            var resultLo3D = [];
            /*2D*/
            resultThisDay.postA.result2D.split(",").forEach(function (obj) {
                resultA.push(obj);
                resultA2D.push(obj);
                result4P.push(obj);
                result4P2D.push(obj);
            })

            resultThisDay.postB.result2D.split(",").forEach(function (obj) {
                resultB.push(obj);
                resultB2D.push(obj);
                result4P.push(obj);
                result4P2D.push(obj);
            })

            if (self.time != "T") {

                resultThisDay.postC.result2D.split(",").forEach(function (obj) {
                    resultC.push(obj);
                    resultC2D.push(obj);
                    result4P.push(obj);
                    result4P2D.push(obj);
                })
                resultThisDay.postD.result2D.split(",").forEach(function (obj) {
                    resultD.push(obj);
                    resultD2D.push(obj);
                    result4P.push(obj);
                    result4P2D.push(obj);
                })
            }
            /*3D*/
            resultThisDay.postA.result3D.split(",").forEach(function (obj) {
                resultA.push(obj);
                resultA3D.push(obj);
                result4P.push(obj);
                result4P3D.push(obj);
            })
            if (self.time != "T") {
                resultThisDay.postB.result3D.split(",").forEach(function (obj) {
                    resultB.push(obj);
                    resultB3D.push(obj);
                    result4P.push(obj);
                    result4P3D.push(obj);
                })
                resultThisDay.postC.result3D.split(",").forEach(function (obj) {
                    resultC.push(obj);
                    resultC3D.push(obj);
                    result4P.push(obj);
                    result4P3D.push(obj);
                })
                resultThisDay.postD.result3D.split(",").forEach(function (obj) {
                    resultD.push(obj);
                    resultD3D.push(obj);
                    result4P.push(obj);
                    result4P3D.push(obj);
                })


                /*Lo*/
                if (resultThisDay.postLo != undefined) {
                    resultThisDay.postLo.result2D.split(",").forEach(function (obj) {
                        resultLo.push(obj);
                        resultLo2D.push(obj);
                    })
                    resultThisDay.postLo.result3D.split(",").forEach(function (obj) {
                        resultLo.push(obj);
                        resultLo3D.push(obj);
                    })
                }
            }

            /*Right Number*/


            selectorA['items.number'] = {$in: resultA};
            selectorA.time = self.time;
            selectorA.betDetailDate = new Date(self.date);
            selectorA.post = {$regex: "A"};
            var rightA = Lottery.Collection.BetDetail.find(selectorA).fetch();

            rightA.forEach(function (obj) {
                betDetailList.push(obj._id);
            })

            selectorB['items.number'] = {$in: resultB};
            selectorB.post = {$regex: "B"};
            selectorB.time = self.time;
            selectorB.betDetailDate = new Date(self.date);
            var rightB = Lottery.Collection.BetDetail.find(selectorB).fetch();

            rightB.forEach(function (obj) {
                betDetailList.push(obj._id);
            })

            selectorC['items.number'] = {$in: resultC};
            selectorC.post = {$regex: "C"};
            selectorC.time = self.time;
            selectorC.betDetailDate = new Date(self.date);
            var rightC = Lottery.Collection.BetDetail.find(selectorC).fetch();

            rightC.forEach(function (obj) {
                betDetailList.push(obj._id);
            })

            selectorD['items.number'] = {$in: resultD};
            selectorD.post = {$regex: "D"};
            selectorD.time = self.time;
            selectorD.betDetailDate = new Date(self.date);
            var rightD = Lottery.Collection.BetDetail.find(selectorD).fetch();

            rightD.forEach(function (obj) {
                betDetailList.push(obj._id);
            })

            selector4P['items.number'] = {$in: result4P};
            selector4P.post = {$regex: "4P"};
            selector4P.time = self.time;
            selector4P.betDetailDate = new Date(self.date);
            var right4P = Lottery.Collection.BetDetail.find(selector4P).fetch();

            right4P.forEach(function (obj) {
                betDetailList.push(obj._id);
            })

            selectorLo['items.number'] = {$in: resultLo};
            selectorLo.post = {$regex: "Lo"};
            selectorLo.time = self.time;
            selectorLo.betDetailDate = new Date(self.date);
            var rightLo = Lottery.Collection.BetDetail.find(selectorLo).fetch();

            rightLo.forEach(function (obj) {
                betDetailList.push(obj._id);
            })
        }

        var betDetailListUnique = betDetailList.filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })

        var loseDetail = {};
        var detail = [];
        pageList.forEach(function (pageParam) {

            var totalRiel2DPerPage = 0;
            var totalRiel3DPerPage = 0;
            var totalDollar2DPerPage = 0;
            var totalDollar3DPerPage = 0;
            var totalBath2DPerPage = 0;
            var totalBath3DPerPage = 0;

            var returnTotalRiel2DPerPage = 0;
            var returnTotalRiel3DPerPage = 0;
            var returnTotalDollar2DPerPage = 0;
            var returnTotalDollar3DPerPage = 0;
            var returnTotalBath2DPerPage = 0;
            var returnTotalBath3DPerPage = 0;

            selector.page = parseInt(pageParam);
            var doc = Lottery.Collection.Bet.find(selector, {$sort: {line: 1}}).fetch();
            if (doc.length != 0) {
                var sumUpdateCount = 0;
                doc.forEach(function (obj) {
                    sumUpdateCount += parseInt(obj.updateCount);
                    var i = 0;
                    obj.items.forEach(function (ob) {
                        if (betDetailListUnique.indexOf(ob.betDetailId) > -1) {
                            var betDetailNumber = Lottery.Collection.BetDetail.findOne(ob.betDetailId);

                            if (betDetailNumber.currencyId == "KHR") {
                                betDetailNumber.items.forEach(function (detail) {
                                        if (betDetailNumber.post.split(",").indexOf("4P") > -1) {
                                            if (detail.number.length == 2) {
                                                if (resultA2D.indexOf(detail.number) > -1) {
                                                    resultA2D.forEach(function (timeRight) {
                                                        if (timeRight == detail.number) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    })
                                                }
                                                if (resultB2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;

                                                }
                                                if (resultC2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;

                                                }
                                                if (resultD2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;

                                                }
                                            } else if (detail.number.length == 3) {
                                                if (resultA3D.indexOf(detail.number) > -1) {
                                                    resultA3D.forEach(function (timeRight) {
                                                        if (timeRight == detail.number) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    })
                                                }
                                                if (resultB3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;

                                                }
                                                if (resultC3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;

                                                }
                                                if (resultD3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;

                                                }
                                            }
                                        }
                                        if (betDetailNumber.post.split(",").indexOf("A") > -1) {
                                            if (detail.number.length == 2) {
                                                if (resultA2D.indexOf(detail.number) > -1) {
                                                    resultA2D.forEach(function (timeRight) {
                                                        if (timeRight == detail.number) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    })
                                                }
                                            } else if (detail.number.length == 3) {
                                                if (resultA3D.indexOf(detail.number) > -1) {
                                                    resultA3D.forEach(function (timeRight) {
                                                        if (timeRight == detail.number) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    })
                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.split(",").indexOf("B") > -1) {
                                            if (detail.number.length == 2) {
                                                if (resultB2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;

                                                }
                                            } else if (detail.number.length == 3) {
                                                if (resultB3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;

                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.split(",").indexOf("C") > -1) {
                                            if (detail.number.length == 2) {
                                                if (resultC2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;

                                                }
                                            } else if (detail.number.length == 3) {
                                                if (resultC3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;

                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.split(",").indexOf("D") > -1) {
                                            if (detail.number.length == 2) {
                                                if (resultD2D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel2DPerPage += detail.amount;

                                                }
                                            } else if (detail.number.length == 3) {
                                                if (resultD3D.indexOf(detail.number) > -1) {
                                                    returnTotalRiel3DPerPage += detail.amount;

                                                }
                                            }
                                        }

                                        if (betDetailNumber.post.split(",").indexOf("Lo") > -1) {
                                            if (detail.number.length == 2) {
                                                if (resultLo2D.indexOf(detail.number) > -1) {
                                                    resultLo2D.forEach(function (timeRight) {
                                                        if (timeRight == detail.number) {
                                                            returnTotalRiel2DPerPage += detail.amount;

                                                        }
                                                    })
                                                }
                                            } else if (detail.number.length == 3) {
                                                if (resultLo3D.indexOf(detail.number) > -1) {
                                                    resultA3D.forEach(function (timeRight) {
                                                        if (timeRight == detail.number) {
                                                            returnTotalRiel3DPerPage += detail.amount;

                                                        }
                                                    })
                                                }

                                            }
                                        }
                                    }
                                )
                            }
                            else if (betDetailNumber.currencyId == "USD") {
                                betDetailNumber.items.forEach(function (detail) {

                                    if (betDetailNumber.post.split(",").indexOf("4P") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultA2D.indexOf(detail.number) > -1) {
                                                resultA2D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;

                                            }
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;

                                            }
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;

                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;

                                            }
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;

                                            }
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;

                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.split(",").indexOf("A") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultA2D.indexOf(detail.number) > -1) {
                                                resultA2D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("B") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;

                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;

                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("C") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;

                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;

                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("D") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalDollar2DPerPage += detail.amount;

                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalDollar3DPerPage += detail.amount;

                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("Lo") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultLo2D.indexOf(detail.number) > -1) {
                                                resultLo2D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalDollar2DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultLo3D.indexOf(detail.number) > -1) {
                                                resultLo3D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalDollar3DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                        }
                                    }
                                })
                            }
                            else if (betDetailNumber.currencyId == "THB") {
                                betDetailNumber.items.forEach(function (detail) {

                                    if (betDetailNumber.post.split(",").indexOf("4P") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultA2D.indexOf(detail.number) > -1) {
                                                resultA2D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalBath2DPerPage += detail.amount;
                                                    }
                                                })
                                            }
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalBath2DPerPage += detail.amount;

                                            }
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalBath2DPerPage += detail.amount;

                                            }
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalBath2DPerPage += detail.amount;

                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalBath3DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalBath3DPerPage += detail.amount;

                                            }
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalBath3DPerPage += detail.amount;

                                            }
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalBath3DPerPage += detail.amount;

                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.split(",").indexOf("A") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultA2D.indexOf(detail.number) > -1) {
                                                resultA2D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalBath2DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalBath3DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.split(",").indexOf("B") > -1) {

                                        if (detail.number.length == 2) {
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalBath2DPerPage += detail.amount;

                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalBath3DPerPage += detail.amount;

                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("C") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalBath2DPerPage += detail.amount;

                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalBath3DPerPage += detail.amount;

                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("D") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalBath2DPerPage += detail.amount;

                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalBath3DPerPage += detail.amount;

                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("Lo") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultLo2D.indexOf(detail.number) > -1) {
                                                resultLo2D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalBath2DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultLo3D.indexOf(detail.number) > -1) {
                                                resultLo3D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalBath3DPerPage += detail.amount;

                                                    }
                                                })
                                            }
                                        }
                                    }

                                })
                            }
                        }
                    })

                    totalRiel2DPerPage = totalRiel2DPerPage + obj.totalRiel2D;
                    totalRiel3DPerPage = totalRiel3DPerPage + obj.totalRiel3D;
                    totalDollar2DPerPage = totalDollar2DPerPage + obj.totalDollar2D;
                    totalDollar3DPerPage = totalDollar3DPerPage + obj.totalDollar3D;
                    totalBath2DPerPage = totalBath2DPerPage + obj.totalBath2D;
                    totalBath3DPerPage = totalBath3DPerPage + obj.totalBath3D;
                })

                detail.push({
                    page: pageParam,
                    updateCount: sumUpdateCount,

                    totalRiel2D: totalRiel2DPerPage,
                    totalRiel3D: totalRiel3DPerPage,
                    totalDollar2D: totalDollar2DPerPage,
                    totalDollar3D: totalDollar3DPerPage,
                    totalBath2D: totalBath2DPerPage,
                    totalBath3D: totalBath3DPerPage,

                    lossRiel2D: returnTotalRiel2DPerPage,
                    lossRiel3D: returnTotalRiel3DPerPage,
                    lossDollar2D: returnTotalDollar2DPerPage,
                    lossDollar3D: returnTotalDollar3DPerPage,
                    lossBath2D: returnTotalBath2DPerPage,
                    lossBath3D: returnTotalBath3DPerPage
                })

            }
        });

        loseDetail.lossDate = self.date;
        loseDetail.time = self.time;
        loseDetail.agentId = self.agentId;
        loseDetail.branchId = self.branchId;
        loseDetail.endOfProcessId = self.endOfProcessId;

        loseDetail.detail = detail;

        Lottery.Collection.Loss.insert(loseDetail);
    }
    ,
    lottery_lossRemoveByEndOfProcessId: function (id) {
        return Lottery.Collection.Loss.remove({endOfProcessId: id});
    }
    ,
    lottery_endOfProcessLastDate: function (selector) {
        return Lottery.Collection.EndOfProcess.findOne(selector, {sort: {closeDate: -1}});
    }
})
