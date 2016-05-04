Meteor.methods({
    lottery_betReport: function (params) {
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
        var allPage = false;
        if (Array.isArray(self.page)) {
            self.page.forEach(function (obj) {
                if (obj == 0) {
                    allPage = true;
                } else {
                    pageList.push(obj.toString());
                }
            })
        } else {
            if (self.page == 0) {
                allPage = true;
            } else {
                pageList.push(self.page.toString());
            }
        }
        if (allPage == true) {
            pageList = [];
            var i = 1;
            for (i; i <= parseInt(totalPage); i++) {
                pageList.push(i.toString());
            }
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


            if (resultThisDay.postA.result2D != null) {
                resultThisDay.postA.result2D.split(",").forEach(function (obj) {
                    resultA.push(obj);
                    resultA2D.push(obj);
                    result4P.push(obj);
                    result4P2D.push(obj);
                })
            }


            if (resultThisDay.postB.result2D != null) {
                resultThisDay.postB.result2D.split(",").forEach(function (obj) {
                    resultB.push(obj);
                    resultB2D.push(obj);
                    result4P.push(obj);
                    result4P2D.push(obj);
                })
            }
            if (self.time != "T") {
                if (resultThisDay.postC.result2D != null) {
                    resultThisDay.postC.result2D.split(",").forEach(function (obj) {
                        resultC.push(obj);
                        resultC2D.push(obj);
                        result4P.push(obj);
                        result4P2D.push(obj);
                    })
                }
                if (resultThisDay.postD.result2D != null) {
                    resultThisDay.postD.result2D.split(",").forEach(function (obj) {
                        resultD.push(obj);
                        resultD2D.push(obj);
                        result4P.push(obj);
                        result4P2D.push(obj);
                    })
                }
            }


            /*3D*/
            if (resultThisDay.postA.result3D != null) {
                resultThisDay.postA.result3D.split(",").forEach(function (obj) {
                    resultA.push(obj);
                    resultA3D.push(obj);
                    result4P.push(obj);
                    result4P3D.push(obj);
                })
            }
            if (self.time != "T") {
                if (resultThisDay.postB.result3D != null) {
                    resultThisDay.postB.result3D.split(",").forEach(function (obj) {
                        resultB.push(obj);
                        resultB3D.push(obj);
                        result4P.push(obj);
                        result4P3D.push(obj);
                    })
                }
                if (resultThisDay.postC.result3D != null) {
                    resultThisDay.postC.result3D.split(",").forEach(function (obj) {
                        resultC.push(obj);
                        resultC3D.push(obj);
                        result4P.push(obj);
                        result4P3D.push(obj);
                    })
                }
                if (resultThisDay.postD.result3D != null) {
                    resultThisDay.postD.result3D.split(",").forEach(function (obj) {
                        resultD.push(obj);
                        resultD3D.push(obj);
                        result4P.push(obj);
                        result4P3D.push(obj);
                    })
                }


                /*Lo*/
                if (resultThisDay.postLo != undefined) {
                    if (resultThisDay.postLo.result2D != null) {
                        resultThisDay.postLo.result2D.split(",").forEach(function (obj) {
                            resultLo.push(obj);
                            resultLo2D.push(obj);
                        })
                    }
                    if (resultThisDay.postLo.result3D != null) {
                        resultThisDay.postLo.result3D.split(",").forEach(function (obj) {
                            resultLo.push(obj);
                            resultLo3D.push(obj);
                        })
                    }
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


        var stringPrepare = "";
        pageList.forEach(function (pageParam) {
            var dataList = [];
            var dataListFooter = [];
            var totalLine = 0;

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
            doc.forEach(function (obj) {
                var i = 0;
                obj.items.forEach(function (ob) {
                    if (betDetailListUnique.indexOf(ob.betDetailId) > -1) {

                        var superScript = 0;
                        var betDetailNumber = Lottery.Collection.BetDetail.findOne(ob.betDetailId);
                        if (betDetailNumber.currencyId == "KHR") {
                            betDetailNumber.items.forEach(function (detail) {
                                    if (betDetailNumber.post.split(",").indexOf("4P") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultA2D.indexOf(detail.number) > -1) {
                                                resultA2D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalRiel2DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalRiel2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalRiel2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalRiel2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalRiel3DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalRiel3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalRiel3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalRiel3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }
                                    if (betDetailNumber.post.split(",").indexOf("A") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultA2D.indexOf(detail.number) > -1) {
                                                resultA2D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalRiel2DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultA3D.indexOf(detail.number) > -1) {
                                                resultA3D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalRiel3DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("B") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultB2D.indexOf(detail.number) > -1) {
                                                returnTotalRiel2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultB3D.indexOf(detail.number) > -1) {
                                                returnTotalRiel3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("C") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultC2D.indexOf(detail.number) > -1) {
                                                returnTotalRiel2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultC3D.indexOf(detail.number) > -1) {
                                                returnTotalRiel3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("D") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultD2D.indexOf(detail.number) > -1) {
                                                returnTotalRiel2DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultD3D.indexOf(detail.number) > -1) {
                                                returnTotalRiel3DPerPage += detail.amount;
                                                superScript += 1;
                                            }
                                        }
                                    }

                                    if (betDetailNumber.post.split(",").indexOf("Lo") > -1) {
                                        if (detail.number.length == 2) {
                                            if (resultLo2D.indexOf(detail.number) > -1) {
                                                resultLo2D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalRiel2DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }
                                        } else if (detail.number.length == 3) {
                                            if (resultLo3D.indexOf(detail.number) > -1) {
                                                resultLo3D.forEach(function (timeRight) {
                                                    if (timeRight == detail.number) {
                                                        returnTotalRiel3DPerPage += detail.amount;
                                                        superScript += 1;
                                                    }
                                                })
                                            }

                                        }
                                    }
                                }
                            )
                        } else if (betDetailNumber.currencyId == "USD") {
                            betDetailNumber.items.forEach(function (detail) {

                                if (betDetailNumber.post.split(",").indexOf("4P") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultA2D.indexOf(detail.number) > -1) {
                                            resultA2D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalDollar2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                        if (resultB2D.indexOf(detail.number) > -1) {
                                            returnTotalDollar2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                        if (resultC2D.indexOf(detail.number) > -1) {
                                            returnTotalDollar2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                        if (resultD2D.indexOf(detail.number) > -1) {
                                            returnTotalDollar2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultA3D.indexOf(detail.number) > -1) {
                                            resultA3D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalDollar3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                        if (resultB3D.indexOf(detail.number) > -1) {
                                            returnTotalDollar3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                        if (resultC3D.indexOf(detail.number) > -1) {
                                            returnTotalDollar3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                        if (resultD3D.indexOf(detail.number) > -1) {
                                            returnTotalDollar3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }
                                }
                                if (betDetailNumber.post.split(",").indexOf("A") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultA2D.indexOf(detail.number) > -1) {
                                            resultA2D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalDollar2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultA3D.indexOf(detail.number) > -1) {
                                            resultA3D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalDollar3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                    }
                                }

                                if (betDetailNumber.post.split(",").indexOf("B") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultB2D.indexOf(detail.number) > -1) {
                                            returnTotalDollar2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultB3D.indexOf(detail.number) > -1) {
                                            returnTotalDollar3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }
                                }

                                if (betDetailNumber.post.split(",").indexOf("C") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultC2D.indexOf(detail.number) > -1) {
                                            returnTotalDollar2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultC3D.indexOf(detail.number) > -1) {
                                            returnTotalDollar3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }
                                }

                                if (betDetailNumber.post.split(",").indexOf("D") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultD2D.indexOf(detail.number) > -1) {
                                            returnTotalDollar2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultD3D.indexOf(detail.number) > -1) {
                                            returnTotalDollar3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }
                                }

                                if (betDetailNumber.post.split(",").indexOf("Lo") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultLo2D.indexOf(detail.number) > -1) {
                                            resultLo2D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalDollar2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultLo3D.indexOf(detail.number) > -1) {
                                            resultLo3D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalDollar3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                    }
                                }
                            })
                        } else if (betDetailNumber.currencyId == "THB") {
                            betDetailNumber.items.forEach(function (detail) {

                                if (betDetailNumber.post.split(",").indexOf("4P") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultA2D.indexOf(detail.number) > -1) {
                                            resultA2D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalBath2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                        if (resultB2D.indexOf(detail.number) > -1) {
                                            returnTotalBath2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                        if (resultC2D.indexOf(detail.number) > -1) {
                                            returnTotalBath2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                        if (resultD2D.indexOf(detail.number) > -1) {
                                            returnTotalBath2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultA3D.indexOf(detail.number) > -1) {
                                            resultA3D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalBath3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                        if (resultB3D.indexOf(detail.number) > -1) {
                                            returnTotalBath3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                        if (resultC3D.indexOf(detail.number) > -1) {
                                            returnTotalBath3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                        if (resultD3D.indexOf(detail.number) > -1) {
                                            returnTotalBath3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }
                                }
                                if (betDetailNumber.post.split(",").indexOf("A") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultA2D.indexOf(detail.number) > -1) {
                                            resultA2D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalBath2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultA3D.indexOf(detail.number) > -1) {
                                            resultA3D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalBath3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                    }
                                }

                                if (betDetailNumber.post.split(",").indexOf("B") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultB2D.indexOf(detail.number) > -1) {
                                            returnTotalBath2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultB3D.indexOf(detail.number) > -1) {
                                            returnTotalBath3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }
                                }

                                if (betDetailNumber.post.split(",").indexOf("C") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultC2D.indexOf(detail.number) > -1) {
                                            returnTotalBath2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultC3D.indexOf(detail.number) > -1) {
                                            returnTotalBath3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }
                                }

                                if (betDetailNumber.post.split(",").indexOf("D") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultD2D.indexOf(detail.number) > -1) {
                                            returnTotalBath2DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultD3D.indexOf(detail.number) > -1) {
                                            returnTotalBath3DPerPage += detail.amount;
                                            superScript += 1;
                                        }
                                    }
                                }
                                if (betDetailNumber.post.split(",").indexOf("Lo") > -1) {
                                    if (detail.number.length == 2) {
                                        if (resultLo2D.indexOf(detail.number) > -1) {
                                            resultLo2D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalBath2DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                    } else if (detail.number.length == 3) {
                                        if (resultLo3D.indexOf(detail.number) > -1) {
                                            resultLo3D.forEach(function (timeRight) {
                                                if (timeRight == detail.number) {
                                                    returnTotalBath3DPerPage += detail.amount;
                                                    superScript += 1;
                                                }
                                            })
                                        }
                                    }
                                }

                            })
                        }

                        if (superScript > 1) {
                            dataList.push({
                                page: obj.page,
                                line: obj.line,
                                currency: ob.currencyId == "KHR" ? "<font size= '2'> ៛  </font>" : ob.currencyId == "USD" ? "$" : "<span>&#3647;</span>",
                                row: i,
                                number: "<span class='label label-danger' style='font-size:9pt'> " + ob.number,
                                amount: ob.amount + "<sup>" + superScript + "</sup></span>",
                                post: ob.post,
                                time: obj.time
                            });
                        } else {
                            dataList.push({
                                page: obj.page,
                                line: obj.line,
                                currency: ob.currencyId == "KHR" ? "<font size= '2'> ៛  </font>" : ob.currencyId == "USD" ? "$" : "<span>&#3647;</span>",
                                row: i,
                                number: "<span class='label label-danger' style='font-size:9pt'> " + ob.number,
                                amount: ob.amount + "</span>",
                                post: ob.post,
                                time: obj.time
                            });
                        }
                    } else {
                        dataList.push({
                            page: obj.page,
                            line: obj.line,
                            currency: ob.currencyId == "KHR" ? "<font size= '2'> ៛  </font>" : ob.currencyId == "USD" ? "$" : "<span>&#3647;</span>",
                            row: i,
                            number: ob.number,
                            amount: ob.amount,
                            post: ob.post,
                            time: obj.time
                        });
                    }
                    i++;
                })

                dataListFooter.push({
                    page: obj.page,
                    line: obj.line,
                    totalRiel2D: obj.totalRiel2D,
                    totalRiel3D: obj.totalRiel3D,
                    totalDollar2D: obj.totalDollar2D,
                    totalDollar3D: obj.totalDollar3D,
                    totalBath2D: obj.totalBath2D,
                    totalBath3D: obj.totalBath3D
                })

                totalRiel2DPerPage = totalRiel2DPerPage + obj.totalRiel2D;
                totalRiel3DPerPage = totalRiel3DPerPage + obj.totalRiel3D;
                totalDollar2DPerPage = totalDollar2DPerPage + obj.totalDollar2D;
                totalDollar3DPerPage = totalDollar3DPerPage + obj.totalDollar3D;
                totalBath2DPerPage = totalBath2DPerPage + obj.totalBath2D;
                totalBath3DPerPage = totalBath3DPerPage + obj.totalBath3D;

                totalLine++;
            })
            dataList.sort(compare);

            if (dataList.length > 0) {
                var oldRow = 0;
                var oldLine = 0;
                stringPrepare += '<table class="table table-report" style="border-collapse: collapse !important;"><caption><b>' +

                    '<span align="left">Page : ' + pageParam +

                    "</b><table align='right'  class='label label-danger' style='font-size:8pt'><tr><th>Win&nbsp;&nbsp;</th><th>2D</th><th>3D</th></tr><tr><td><font size= '2'> ៛  </font>: </td><td>" + returnTotalRiel2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + returnTotalRiel3DPerPage +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr><tr><td>$: </td><td>" + returnTotalDollar2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + returnTotalDollar3DPerPage +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><tr><td><span>&#3647;</span>: </td><td>" + returnTotalBath2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + returnTotalBath3DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><tr></table>"

                    + "&nbsp;<table class='label label-warning' style='font-size:8pt' align='right'><tr><th>Total&nbsp;&nbsp;&nbsp;&nbsp;</th><th>2D</th><th>3D</th></tr><tr><td><font size= '2'> ៛  </font>: </td><td>" + totalRiel2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + totalRiel3DPerPage +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr><tr><td>$: </td><td>" + totalDollar2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + totalDollar3DPerPage +
                    "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><tr><td><span>&#3647;</span>: </td><td>" + totalBath2DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + totalBath3DPerPage + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><tr></table></caption>";
                dataList.forEach(function (obj) {
                    if (oldRow != obj.row) {
                        stringPrepare += "</tr>";
                        stringPrepare += '<tr style="border: none;">';
                        oldLine = 0;
                    }
                    var k = 1;
                    for (k; k < obj.line - oldLine; k++) {
                        stringPrepare += '<td style="border-right: solid 1px"></td>';
                    }
                    stringPrepare += '<td style="border-right: solid 1px">' + obj.number + " = " + obj.amount + obj.currency + " (" + obj.post + ")</td>";
                    oldRow = obj.row;
                    oldLine = obj.line;
                })
                var oldFooterLine = 0;
                var footer = "<tr>";
                dataListFooter.forEach(function (obj) {
                    var m = 1;
                    for (m; m < obj.line - oldFooterLine; m++) {
                        stringPrepare += "<td></td>";
                    }

                    footer += "<td><table class='bg-primary'><tr><th></th><th>2D</th><th>3D</th></tr><tr><td><font size= '3'> ៛  </font>: </td><td>" + obj.totalRiel2D + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + obj.totalRiel3D +
                        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr><tr><td>$: </td><td>" + obj.totalDollar2D + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + obj.totalDollar3D +
                        "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr><tr><td><span>&#3647;</span>: </td><td>" + obj.totalBath2D + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td>" + obj.totalBath3D + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td></tr></table></td>";

                    oldFooterLine = obj.line;
                });
                stringPrepare += "</tr>" + footer + "</tr></tbody></table><footer></footer>";
            }
        });
        data.header.agentName = agentName;
        data.content = stringPrepare;
        return data;
    },
    getTotalPage: function (selector) {
        var allPage = Lottery.Collection.Bet.findOne(selector, {fields: {page: 1}, sort: {page: -1}});
        if (allPage != null) {
            return allPage.page;
        } else {
            return 1;
        }
    }
    ,
    getTotalLine: function (selector) {
        var allLine = Lottery.Collection.Bet.findOne(selector, {fields: {line: 1}, sort: {line: -1}});
        if (allLine != null) {
            return allLine.line + 1;
        } else {
            return 1;
        }
    }
})

/*function compare(a, b) {
 if (a.row < b.row) {
 return -1;
 } else if (a.row > b.row) {
 return 1;
 } else {
 return 0;
 }
 }*/


function compare(a, b) {
    if (a.row == b.row) {
        return (a.line < b.line) ? -1 : (a.line > b.line) ? 1 : 0;
    }
    else {
        return (a.row < b.row) ? -1 : 1;
    }
};
