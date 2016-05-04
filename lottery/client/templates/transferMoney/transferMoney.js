/**
 * Declare template
 */
var indexTpl = Template.lottery_transferMoney,
    insertTpl = Template.lottery_transferMoneyInsert,
    updateTpl = Template.lottery_transferMoneyUpdate,
    showTpl = Template.lottery_transferMoneyShow;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'TransferMoney',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["transferMoney"], {size: 'sm'});
    createNewAlertify(["transferMoneyShow"]);
});

indexTpl.onRendered(function () {
    //
});

insertTpl.onRendered(function () {
    var transferDate = $('[name="transferDate"]');
    DateTimePicker.date(transferDate);
    Meteor.call('getEndPerMonthLastDate', function (err, lastDate) {
        if (lastDate != null) {
            var dateVal = moment(lastDate.endDate).add(1, "days").format(
                'YYYY-MM-DD');
            $("[name='transferDate']").data('DateTimePicker').minDate(dateVal);
        } else {
            $("[name='transferDate']").data('DateTimePicker').minDate(
                '1900-01-01 00:00');
        }
    })

})
updateTpl.onRendered(function () {
    var transferDate = $('[name="transferDate"]');
    DateTimePicker.date(transferDate);

    Meteor.call('getEndPerMonthLastDate', function (err, lastDate) {
        if (lastDate != null) {
            var dateVal = moment(lastDate.endDate).add(1, "days").format(
                'YYYY-MM-DD');
            $("[name='transferDate']").data('DateTimePicker').minDate(dateVal);
        } else {
            $("[name='transferDate']").data('DateTimePicker').minDate(
                '1900-01-01 00:00');
        }
    })
})

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.transferMoney(fa("plus", "TransferMoney"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        var self=this;
        Meteor.call('getEndPerMonthLastDate', function (err, lastDate) {
            if (lastDate != null) {
                if (moment(self.transferDate).format('YYYY-MM-DD') > lastDate.endDate) {
                    alertify.transferMoney(fa("pencil", "TransferMoney"), renderTemplate(updateTpl, self));
                }else{
                    alertify.error('You already End Per Month!!!');
                }
            } else {
                alertify.transferMoney(fa("pencil", "TransferMoney"), renderTemplate(updateTpl, self));
            }
        })
    },
    'click .js-remove': function (e, t) {
        var self = this;
        Meteor.call('getEndPerMonthLastDate', function (err, lastDate) {
            if (lastDate != null) {
                if (moment(self.transferDate).format('YYYY-MM-DD') > lastDate.endDate) {
                    alertify.confirm(
                        fa("remove", "Transfer Money"),
                        "Are you sure to delete [" + self._id + "]?",
                        function () {
                            Lottery.Collection.TransferMoney.remove(self._id, function (error) {
                                if (error) {
                                    alertify.error(error.message);
                                } else {
                                    alertify.success("Success");
                                }
                            });
                        },
                        null
                    );

                }else{
                    alertify.error('You already End Per Month!!!');
                }
            } else {
                alertify.confirm(
                    fa("remove", "Transfer Money"),
                    "Are you sure to delete [" + self._id + "]?",
                    function () {
                        Lottery.Collection.TransferMoney.remove(self._id, function (error) {
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

    },
    'click .js-show': function (e, t) {
        alertify.transferMoneyShow(fa("eye", "TransferMoney"), renderTemplate(showTpl, this));
    }
});



updateTpl.helpers({
    data: function () {
        return ReactiveMethod.call('getTransferMoneyById',this._id);
    }
});

/**
 * Show
 */

showTpl.helpers({
    data: function () {
        return ReactiveMethod.call('getTransferMoneyById',this._id);
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    lottery_transferMoneyInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.transferMoney().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    lottery_transferMoneyUpdate: {
        onSuccess: function (formType, result) {
            alertify.transferMoney().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

