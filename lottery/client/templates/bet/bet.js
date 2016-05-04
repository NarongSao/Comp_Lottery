/**
 * Declare template
 */
var indexTpl = Template.lottery_bet,
    insertTpl = Template.lottery_betInsert,
    updateTpl = Template.lottery_betUpdate,
    showTpl = Template.lottery_betShow,
    agentShowTpl = Template.lottery_agentShow;

stateTime = new ReactiveObj({
    time: "E"
});
var state = new ReactiveObj({
    betDate: moment().format('YYYY-MM-DD'),
    page: 1,
    line: 1
});
stateFilter = new ReactiveObj({
    dateFilter: "",
    timeFilter: "All",
    pageFilter: "",
    isSearch: false
})

stateHightLight = new ReactiveObj({
    isHighLight: false
})

stateValidateEndDate = new ReactiveObj({
    validateEndOfDate: undefined
})
/**
 * Index
 */


indexTpl.onCreated(function () {

    // SEO
    SEO.set({
        title: 'Bet',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(['bet'], {
        size: 'lg'
    });
    createNewAlertify(['betShow', 'agentShow']);

    // Subscription
    var agentId = FlowRouter.getParam('agentId');
    Meteor.setTimeout(function () {
        configDateFilter();
    }, 200)

    stateFilter.set('dateFilter', "");
    stateFilter.set('timeFilter', "All");
    stateFilter.set('pageFilter', "");

    stateFilter.set('isSearch', false);

});
indexTpl.onRendered(function () {
    var elem = document.querySelector('.js-switch');
    var init = new Switchery(elem, {
        color: '#7c8bc7',
        jackColor: '#9decff'
    });
});

indexTpl.helpers({
    tabularSelector: function () {
        var selector = {};
        selector.agentId = FlowRouter.getParam('agentId');
        Session.set('currentAgent', FlowRouter.getParam('agentId'));
        var roleName = ReactiveMethod.call('getRoleByUserId', Meteor.userId());
        if (roleName != "admin") {
            selector.createdBy = Meteor.userId();
        }


        var isSearch = stateFilter.get('isSearch');
        var date = stateFilter.get('dateFilter');
        var time = stateFilter.get('timeFilter');
        var page = stateFilter.get('pageFilter');
        if (isSearch == true) {
            if (date != "" && date != "Invalid date") {
                selector.betDate = new Date(date);
            }
            if (time != "All") {
                selector.time = time;
            }
            if (page != "") {
                selector.page = parseInt(page);
            }
        } else {
            $('[name="dateFilter"]').val('');
            $('[name="timeFilter"]').val('All');
            $('[name="pageFilter"]').val('');

            stateFilter.set('dateFilter', "");
            stateFilter.set('timeFilter', "All");
            stateFilter.set('pageFilter', "");
        }
        /*return {agentId: FlowRouter.getParam('agentId')};*/
        return selector;
    },
    agent: function () {
        var id = FlowRouter.getParam('agentId');
        return ReactiveMethod.call('lottery_agentById', id);
    },
    timeList: function () {
        var list = [];
        list.push({
            label: "All",
            value: "All"
        }, {
            label: "E",
            value: "E"
        }, {
            label: "N",
            value: "N"
        }, {
            label: "T",
            value: "T"
        })
        return list;
    }
});
indexTpl.events({
    'click .testReport': function () {
        Meteor.call('lottery_betReport');
    },
    'click .js-agentInfo': function (e, t) {
        alertify.agentShow(fa("eye", "Agent​"), renderTemplate(agentShowTpl,
            this));
    },
    'click .insert': function (e, t) {
        itemsStateList.clear();
        state.set('betDate', moment().format("YYYY-MM-DD"));
        alertify.bet(fa("plus", 'Bet​'), renderTemplate(insertTpl)).maximize();

        var selectorValidateEndDate = {};
        var branchId = Session.get("currentBranch");
        selectorValidateEndDate.branchId = branchId;
        selectorValidateEndDate.time = stateTime.get('selectTime');
        selectorValidateEndDate.closeDate = new Date(state.get('betDate'));

        var agentListValidate = [];
        agentListValidate.push(Session.get('currentAgent'));
        agentListValidate.push('All');
        selectorValidateEndDate.agentId = {$in: agentListValidate};

        Meteor.call('lottery_endOfProcessLastDate', selectorValidateEndDate, function (error, endDate) {
            if (!_.isUndefined(endDate)) {
                stateValidateEndDate.set('validateEndOfDate', true);
            } else {
                stateValidateEndDate.set('validateEndOfDate', false);
            }
        })
    },
    'click .update': function (e, t) {
        itemsStateList.clear();
        var self = this;
        Meteor.call('lottery_betById', this._id, function (error, result) {
            stateTime.set('selectTime', result.time);
            state.set('betDate', result.betDate);
            stateValidateEndDate.set('validateEndOfDate', false);

            var selector = {};
            var branchId = Session.get("currentBranch");
            selector.branchId = branchId;
            selector.time = result.time;
            selector.closeDate = new Date(result.betDate);

            var agentList = [];
            agentList.push(Session.get('currentAgent'));
            agentList.push('All');
            selector.agentId = {$in: agentList};

            Meteor.call('lottery_endOfProcessLastDate', selector, function (error, endDate) {
                if (!_.isUndefined(endDate)) {
                    alertify.error(
                        "Can not Update, you already end of process!!!");
                } else {
                    alertify.bet(fa("pencil", "Bet"), renderTemplate(
                        updateTpl, self)).maximize();
                }
            })

            if (result) {
                _.each(result.items, function (obj, key) {
                    obj.indexNumber = 'items.' + key + '.number';
                    obj.indexAmount = 'items.' + key + '.amount';
                    obj.indexCurrency = 'items.' + key + '.currencyId';
                    obj.indexPost = 'items.' + key + '.post';
                    obj.indexBetDetailId = 'items.' + key + '.betDetailId';
                    obj.indexUniqueNumber = 'items.' + key +
                        "indexUniqueNumber";
                    itemsStateList.insert(obj.indexUniqueNumber, obj);
                })
            }
        });
    },
    'click .remove': function (e, t) {
        var self = this;

        Meteor.call('lottery_betById', this._id, function (error, result) {
            var selectorGetLastDate = {};
            var branchId = Session.get("currentBranch");
            selectorGetLastDate.branchId = branchId;

            selectorGetLastDate.time = self.time;
            var agentList = [];
            agentList.push(Session.get('currentAgent'));
            agentList.push('All');
            selectorGetLastDate.agentId = {$in: agentList};

            selectorGetLastDate.closeDate = new Date(result.betDate);


            Meteor.call('lottery_endOfProcessLastDate', selectorGetLastDate,
                function (err, lastDate) {

                    if (!_.isUndefined(lastDate)) {
                        alertify.error(
                            "Can not Remove, you already end of process!!!");
                    } else {
                        alertify.confirm(
                            fa("remove", "Bet"),
                            "Are you sure to delete [" + self._id + "]?",
                            function () {

                                Meteor.call('lottery_berDetailRemoveByBetId',
                                    self._id);

                                Lottery.Collection.Bet.remove(self._id, function (error) {
                                    if (error) {
                                        alertify.error(error.message);
                                    } else {
                                        alertify.success("Success");
                                    }
                                });
                            },
                            null
                        );
                    }
                })
        });
    },
    'click .show': function (e, t) {
        alertify.betShow(fa("eye", "Bet"), renderTemplate(showTpl, this));
    },
    'keyup .pageFilter': function (e, t) {
        var pageFilter = e.currentTarget.value;
        stateFilter.set('pageFilter', pageFilter);
        var search = stateFilter.get('isSearch');
        if (search == false) {
            $('.js-switch').trigger("click")
            event.preventDefault();
        }
        stateFilter.set('isSearch', true);


    },
    'change .timeFilter': function (e, t) {
        var timeFilter = e.currentTarget.value;
        stateFilter.set('timeFilter', timeFilter);
        var search = stateFilter.get('isSearch');
        if (search == false) {
            $('.js-switch').trigger("click")
            event.preventDefault();
        }
        stateFilter.set('isSearch', true);
    },
    'change .js-switch': function () {
        configCheckFilter();
    }
});

insertTpl.onRendered(function () {

    Meteor.setTimeout(function () {
        $(".page").focus();
        $("[name='time']").val("E").trigger("change");
    }, 400);

    stateTime.set('selectTime', "E");


    $(window).keydown(function (event) {
        if (event.ctrlKey && (event.which == 13)) {
            $('.save').trigger("click")
            $('.loading-box').removeClass('hidden');
            event.preventDefault();
        }
    });
    /*$('.save').click( function(){
     alert("hello");
     });*/

    //disableDate(stateTime.get('selectTime'));
    configOnRendered();

    var elemInsert = document.querySelector('.js-switch-highLightInsert');
    var initInsert = new Switchery(elemInsert, {
        color: '#7c8bc7',
        jackColor: '#9decff'
    });

    stateHightLight.set('isHighLight', false);

});

insertTpl.helpers({
    cssClassForSubmit: function () {
        return stateCss.get('cssClassForSubmit');
    },
    agent: function () {
        var id = FlowRouter.getParam('agentId');
        state.set('agentId', id);
        return ReactiveMethod.call('lottery_agentById', id);
    },
    defaultPage: function () {
        var selector = {};
        var page = 1;

        selector.time = stateTime.get('selectTime');
        selector.betDate = new Date(state.get('betDate'));
        selector.agentId = state.get('agentId');
        selector.createdBy = Meteor.userId();
        if (!_.isUndefined(state.get('betDate')) && !_.isEmpty(state.get(
                'betDate'))) {
            page = ReactiveMethod.call('getTotalPage', selector);
            state.set('page', page)
        }
        return page;
    },
    defaultLine: function () {
        var selector = {};
        var line = 1;
        selector.page = state.get('page');
        selector.time = stateTime.get('selectTime');
        selector.betDate = new Date(state.get('betDate'));
        selector.agentId = state.get('agentId');
        if (!_.isUndefined(state.get('betDate')) && !_.isEmpty(state.get(
                'betDate'))) {
            line = ReactiveMethod.call('getTotalLine', selector);
        }
        return line;
    },
    betDate: function () {
        return state.get('betDate');
    }

});


insertTpl.events({
    'keypress [name="page"],[name="line"]': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 ||
        charCode > 57));
    },
    //'blur [name="betDate"]': function (event) {
    //    state.set('betDate', event.currentTarget.value);
    //},
    'keyup [name="page"]': function (e) {
        state.set('page', parseInt(e.currentTarget.value));
    },
    'click .save': function (e) {
        $('.loading-box').removeClass('hidden')
        //$('[name="tmpNumber"]').tagsinput('focus');
        //state.set('betDate', moment().format("YYYY-MM-DD"));
    },
    'change [name="time"]': function (e) {
        var defaultTime = e.currentTarget.value;
        stateTime.set('selectTime', defaultTime);

        var selectorValidateEndDate = {};
        var branchId = Session.get("currentBranch");
        selectorValidateEndDate.branchId = branchId;
        selectorValidateEndDate.time = stateTime.get('selectTime');
        selectorValidateEndDate.closeDate = new Date(state.get('betDate'));

        var agentListValidate = [];
        agentListValidate.push(Session.get('currentAgent'));
        agentListValidate.push('All');
        selectorValidateEndDate.agentId = {$in: agentListValidate};

        Meteor.call('lottery_endOfProcessLastDate', selectorValidateEndDate, function (error, endDate) {
            if (!_.isUndefined(endDate)) {
                stateValidateEndDate.set('validateEndOfDate', true);
                alertify.error('Date already End OF  Process!!!');
            } else {
                stateValidateEndDate.set('validateEndOfDate', false);
            }
        })

    },
    'change .js-switch-highLightInsert': function () {
        var elem = document.querySelector('.js-switch-highLightInsert');
        stateHightLight.set('isHighLight', elem.checked);
    }
})

insertTpl.onDestroyed(function () {
    stateValidateEndDate.set('validateEndOfDate', undefined);
})


updateTpl.events({
    'keypress [name="page"],[name="line"]': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 ||
        charCode > 57));
    },
    'change [name="time"]': function (e) {
        var defaultTime = e.currentTarget.value;
        stateTime.set('selectTime', defaultTime);
        stateCss.set('cssClassForSubmit', '');

        var selectorValidateEndDate = {};
        var branchId = Session.get("currentBranch");
        selectorValidateEndDate.branchId = branchId;
        selectorValidateEndDate.time = stateTime.get('selectTime');
        selectorValidateEndDate.closeDate = new Date(state.get('betDate'));

        var agentListValidate = [];
        agentListValidate.push(Session.get('currentAgent'));
        agentListValidate.push('All');
        selectorValidateEndDate.agentId = {$in: agentListValidate};

        Meteor.call('lottery_endOfProcessLastDate', selectorValidateEndDate, function (error, endDate) {
            if (!_.isUndefined(endDate)) {
                stateValidateEndDate.set('validateEndOfDate', true);
                alertify.error('Date already End OF  Process!!!');
            } else {
                stateValidateEndDate.set('validateEndOfDate', false);
            }
        })
    },
    'click .save': function (e) {
        $('.loading-box').removeClass('hidden');
    },
    'change .js-switch-highLightUpdate': function () {
        var elem = document.querySelector('.js-switch-highLightUpdate');
        stateHightLight.set('isHighLight', elem.checked);
    }
})
/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('lottery_betById', this.data._id);
    stateHightLight.set('isHighLight', false);
});
updateTpl.onRendered(function () {
    $(window).keydown(function (event) {
        if (event.ctrlKey && (event.which == 13)) {
            $('.save').trigger("click");
            $('.loading-box').removeClass('hidden');
            event.preventDefault();
        }
    });

    $("[name='time']").val("E").trigger("change");

    Meteor.setTimeout(function () {
        configOnRendered();

        var elemUpdate = document.querySelector('.js-switch-highLightUpdate');
        var initUpdate = new Switchery(elemUpdate, {
            color: '#7c8bc7',
            jackColor: '#9decff'
        });

    }, 400);


});
updateTpl.helpers({
    data: function () {
        return ReactiveMethod.call('lottery_betById', this._id);
    },
    cssClassForSubmit: function () {
        return stateCss.get('cssClassForSubmit');
    },
    agent: function () {
        var id = FlowRouter.getParam('agentId');
        return ReactiveMethod.call('lottery_agentById', id);
    }
});
/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('lottery_betById', this.data._id);
});
showTpl.helpers({
    data: function () {
        var doc = ReactiveMethod.call('lottery_betById', this._id);
        var items = [];
        doc.items.forEach(function (obj) {
            obj.currencyId = obj.currencyId == "KHR" ?
                "<font size='3pt'> ៛ </font>" : obj.currencyId == "USD" ? "$" :
                "<span>&#3647;</span>";
            items.push(obj);
        })
        doc.items = items;
        return doc;
    }
});
// Hook
AutoForm.hooks({
    // Order
    lottery_betInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');

                if (stateHightLight.get('isHighLight') == true) {
                    doc.updateCount = 1;
                } else {
                    doc.updateCount = 0;
                }

                if (stateValidateEndDate.get('validateEndOfDate') == false) {
                    return doc;
                } else if (stateValidateEndDate.get('validateEndOfDate') == true) {
                    Meteor.setTimeout(function () {
                        $('.loading-box').addClass('hidden');
                        alertify.error('Can not Insert , you already End OF Process!!!');
                    }, 400);
                    return false;
                }
            }
        },
        onSuccess: function (formType, result) {
            $('.loading-box').addClass('hidden');
            itemsStateList.clear(); // Clear items state list from item template
            alertify.success('Success');
            var tmpBetDate = _.clone(state.get('betDate'));
            state.set('betDate', '');
            $('[name="tmpNumber"]').tagsinput('focus');
            Meteor.setTimeout(function () {
                state.set('betDate', tmpBetDate);
            }, 100)
            event.preventDefault();
        },
        onError: function (formType, error) {
            $('.loading-box').addClass('hidden');
            alertify.error(error.message);
        }
    },
    lottery_betUpdate: {
        /*docToForm: function (doc, ss) {


            return doc;
         },*/
        before: {
            update: function (doc) {
                doc.betDate = moment(doc.betDate).format('YYYY-MM-DD');
                if (stateHightLight.get('isHighLight') == true) {
                    doc.$set.updateCount = 1;
                } else {
                    doc.$set.updateCount = 0;
                }
                if (stateValidateEndDate.get('validateEndOfDate') == false) {
                    return doc;
                } else if (stateValidateEndDate.get('validateEndOfDate') == true) {
                    Meteor.setTimeout(function () {
                        $('.loading-box').addClass('hidden');
                        alertify.error('Can not Update , you already End OF Process!!!');
                    }, 400);
                    return false;
                }
            }
        },
        onSuccess: function (formType, result) {
            $('.loading-box').addClass('hidden');
            alertify.bet().close();
            itemsStateList.clear();
            alertify.success('Success');
            event.preventDefault();
        },
        onError: function (formType, error) {
            $('.loading-box').addClass('hidden');
            alertify.error(error.message);
        }
    }
});
// Config date picker
var configOnRendered = function () {
    var betDate = $('[name="betDate"]');
    DateTimePicker.date(betDate);

    betDate.on('dp.change', function (e) {
        state.set('betDate', moment(e.date).format('YYYY-MM-DD'));

        var selectorValidateEndDate = {};
        var branchId = Session.get("currentBranch");
        selectorValidateEndDate.branchId = branchId;
        selectorValidateEndDate.time = stateTime.get('selectTime');
        selectorValidateEndDate.closeDate = new Date(state.get('betDate'));

        var agentListValidate = [];
        agentListValidate.push(Session.get('currentAgent'));
        agentListValidate.push('All');
        selectorValidateEndDate.agentId = {$in: agentListValidate};

        Meteor.call('lottery_endOfProcessLastDate', selectorValidateEndDate, function (error, endDate) {
            if (!_.isUndefined(endDate)) {
                stateValidateEndDate.set('validateEndOfDate', true);
                alertify.error('Date already End Of Process!!!');

            } else {
                stateValidateEndDate.set('validateEndOfDate', false);
            }
        })
    })
};

var configDateFilter = function () {
    var dateForFilter = $('[name="dateFilter"]');
    DateTimePicker.date(dateForFilter);

    dateForFilter.on('dp.change', function (e) {
        stateFilter.set('dateFilter', moment(e.date).format('YYYY-MM-DD'));
        var search = stateFilter.get('isSearch');
        if (search == false) {
            $('.js-switch').trigger("click")
            event.preventDefault();
        }
        stateFilter.set('isSearch', true);
    })
}

var configCheckFilter = function () {
        var elem = document.querySelector('.js-switch');
        stateFilter.set('isSearch', elem.checked);
    },
    disableDate = function (time) {
        var selectorGetLastDate = {};
        var branchId = Session.get("currentBranch");
        selectorGetLastDate.branchId = branchId;
        selectorGetLastDate.time = time;
        var agentList = [];
        agentList.push(Session.get('currentAgent'));
        agentList.push('All');

        selectorGetLastDate.agentId = {$in: agentList}
        Meteor.call('lottery_endOfProcessLastDate', selectorGetLastDate, function (err, lastDate) {
            if (lastDate != null) {
                var dateVal = moment(lastDate.closeDate).add(1, "days").format(
                    'YYYY-MM-DD');
                $("[name='betDate']").data('DateTimePicker').minDate(dateVal);
                if (moment().format('YYYY-MM-DD') < dateVal) {
                    state.set('betDate', dateVal);
                } else {
                    state.set('betDate', moment().format('YYYY-MM-DD'));
                }
            } else {
                $("[name='betDate']").data('DateTimePicker').minDate(
                    '1900-01-01 00:00');
                state.set('betDate', moment().format("YYYY-MM-DD"));
            }
        })
    }
