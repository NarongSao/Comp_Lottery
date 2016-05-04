/**
 * Declare template
 */
var indexTpl = Template.lottery_endPerMonth,
    insertTpl = Template.lottery_endPerMonthInsert;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'End Per Month',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(['endPerMonth']);
});

insertTpl.onRendered(function () {
    var closeDate = $('[name="endDate"]');
    DateTimePicker.date(closeDate);

    disableDate();
});


indexTpl.events({
    'click .insert': function (e, t) {
        alertify.endPerMonth(fa("plus", "End Per Month"), renderTemplate(insertTpl));
    },
    'click .remove': function (e, t) {
        var self = this;

        Meteor.call('getEndPerMonthLastDate', function (err, lastDate) {
            if (lastDate != null) {
                if (moment(lastDate.endDate).format('YYYY-MM-DD') <= moment(self.endDate).format("YYYY-MM-DD")) {
                    alertify.confirm(
                        fa("remove", "Enf Per Month"),
                        "Are you sure to delete [" + self._id + "]?",
                        function () {
                            Lottery.Collection.EndPerMonth.remove(self._id, function (error) {
                                if (error) {
                                    alertify.error(error.message);
                                } else {
                                    alertify.success("Success");
                                }
                            });
                        },
                        null
                    );
                } else {
                    alertify.error(
                        "Can not Remove, you already end per month!!!");
                }
            }else{
                alertify.confirm(
                    fa("remove", "Enf Per Month"),
                    "Are you sure to delete [" + self._id + "]?",
                    function () {
                        Lottery.Collection.EndPerMonth.remove(self._id, function (error) {
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

    }
});


// Hook
AutoForm.hooks({
    // Order
    lottery_endPerMonthInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.endPerMonth().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }

    }
});

var disableDate = function () {
    Meteor.call('getEndPerMonthLastDate', function (err, lastDate) {
        if (lastDate != null) {
            var dateVal = moment(lastDate.endDate).add(1, "days").format(
                'YYYY-MM-DD');
            $("[name='endDate']").data('DateTimePicker').minDate(dateVal);
        } else {
            $("[name='endDate']").data('DateTimePicker').minDate(
                '1900-01-01 00:00');
        }
    })
}

