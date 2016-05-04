/**
 * Declare template
 */
var indexTpl = Template.lottery_endOfProcess,
    insertTpl = Template.lottery_endOfProcessInsert;

var statEndOfProcess = new ReactiveObj({
    closeDate: moment().format("YYYY-MM-DD"),
    time: "E"
})

var stateAgentList = new ReactiveArray();

/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'End Of Process',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(['endOfProcess']);
});

insertTpl.onRendered(function () {
    configCloseDateOnRendered();
});


indexTpl.events({
    'click .insert': function (e, t) {
        alertify.endOfProcess(fa("plus", "End Of Process"), renderTemplate(insertTpl));
    },
    'click .remove': function (e, t) {
        var self = this;

        Meteor.call('getEndPerMonthLastDate', function (err, lastDate) {
            if (lastDate != null) {
                if (self.closeDate > lastDate.endDate) {
                    alertify.confirm(
                        fa("remove", "Enf Of Process"),
                        "Are you sure to delete [" + self._id + "]?",
                        function () {
                            Lottery.Collection.EndOfProcess.remove(self._id, function (error) {
                                if (error) {
                                    alertify.error(error.message);
                                } else {
                                    Meteor.call('lottery_lossRemoveByEndOfProcessId', self._id);
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
                    fa("remove", "Enf Of Process"),
                    "Are you sure to delete [" + self._id + "]?",
                    function () {
                        Lottery.Collection.EndOfProcess.remove(self._id, function (error) {
                            if (error) {
                                alertify.error(error.message);
                            } else {
                                Meteor.call('lottery_lossRemoveByEndOfProcessId', self._id);
                                alertify.success("Success");
                            }
                        });
                    },
                    null
                );
            }
        })


    }
});


// Hook
AutoForm.hooks({
    // Order
    lottery_endOfProcessInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.endOfProcess().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }

    }
});

// Config date picker
var configCloseDateOnRendered = function () {
    var closeDate = $('[name="closeDate"]');
    DateTimePicker.date(closeDate);

    Meteor.call('getEndPerMonthLastDate', function (err, lastDate) {
        if (lastDate != null) {
            var dateVal = moment(lastDate.endDate).add(1, "days").format(
                'YYYY-MM-DD');
            $("[name='closeDate']").data('DateTimePicker').minDate(dateVal);
        } else {
            $("[name='closeDate']").data('DateTimePicker').minDate(
                '1900-01-01 00:00');
        }
    })
};

