/**
 * Declare template
 */
var indexTpl = Template.lottery_result,
    insertTpl = Template.lottery_resultInsert,
    updateTpl = Template.lottery_resultUpdate,
    updateTplE = Template.lottery_resultEveningUpdate,
    updateTplN = Template.lottery_resultNightUpdate,
    showTpl = Template.lottery_resultShow

/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Result',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(['result'], {size: 'lg'});
    createNewAlertify(['resultShow']);

});
indexTpl.events({

    'click .insert': function (e, t) {
        alertify.result(fa("plus", "Result"), renderTemplate(insertTpl)).maximize();
    },
    'click .update': function (e, t) {
        var self = this;
        Meteor.call('lottery_resultById', self._id, function (error, obj) {
            if (obj.time == "E" || obj.time == "T") {
                Meteor.call('lottery_resultEveningById', obj._id, function (err, ob) {
                    if (ob != null) {
                        alertify.result(fa("pencil", "Result"), renderTemplate(updateTplE, ob)).maximize();
                    } else {
                        alertify.result(fa("pencil", "Result"), renderTemplate(updateTpl, obj)).maximize();
                    }
                })
            } else if (obj.time == "N") {
                Meteor.call('lottery_resultNightById', obj._id, function (err, ob) {
                    if (ob != null) {
                        alertify.result(fa("pencil", "Result"), renderTemplate(updateTplN, ob)).maximize();
                    } else {
                        alertify.result(fa("pencil", "Result"), renderTemplate(updateTpl, obj)).maximize();
                    }
                })
            }
        })
    },
    'click .remove': function (e, t) {
        var self = this;
        alertify.confirm(
            fa("remove", "Result"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Lottery.Collection.Result.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                        Meteor.call('lottery_resultEveningRemoveByResultId', self._id);
                        Meteor.call('lottery_resultNightRemoveByResultId', self._id);
                    }
                });
            },
            null
        );

    },
    'click .show': function (e, t) {
        alertify.resultShow(fa("eye", "Result"), renderTemplate(showTpl, this));
    }
});

/**
 * Insert
 */
insertTpl.onRendered(function () {
    configOnRendered();
    $('[name="postA.result2D"]').tagsinput({
        /*tagClass: 'label label-'*/
        allowDuplicates: true
    })
    $('[name="postA.result3D"]').tagsinput({
        /*tagClass: 'label label-'*/
        allowDuplicates: true
    })

    $('[name="postLo.result2D"]').tagsinput({
        /*tagClass: 'label label-'*/
        allowDuplicates: true
    })
    $('[name="postLo.result3D"]').tagsinput({
        /*tagClass: 'label label-'*/
        allowDuplicates: true
    })
});

insertTpl.events({
    'keypress [name="postA.result2D"],[name="postA.result3D"],[name="postB.result2D"],[name="postB.result3D"],[name="postC.result2D"],[name="postC.result3D"],[name="postD.result2D"],[name="postD.result3D"],[name="postLo.result2D"],[name="postLo.result3D"]': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
})

/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('lottery_resultById', this.data._id);
});

updateTpl.onRendered(function () {
    configOnRendered();
    $('[name="postA.result2D"]').tagsinput({
        /*tagClass: 'label label-'*/
        allowDuplicates: true
    })
    $('[name="postA.result3D"]').tagsinput({
        /*tagClass: 'label label-'*/
        allowDuplicates: true
    })

    $('[name="postLo.result2D"]').tagsinput({
        /*tagClass: 'label label-'*/
        allowDuplicates: true
    })
    $('[name="postLo.result3D"]').tagsinput({
        /*tagClass: 'label label-'*/
        allowDuplicates: true
    })
});

updateTpl.helpers({
    data: function () {
        return ReactiveMethod.call('lottery_resultById', this._id);
    }
});


updateTpl.events({
    'keypress [name="postA.result2D"],[name="postA.result3D"],[name="postB.result2D"],[name="postB.result3D"],[name="postC.result2D"],[name="postC.result3D"],[name="postD.result2D"],[name="postD.result3D"],[name="postLo.result2D"],[name="postLo.result3D"]': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
})

/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('lottery_resultById', this.data._id);
});

showTpl.helpers({
    data: function () {
        return ReactiveMethod.call('lottery_resultById', this._id);
    }
});

// Hook
AutoForm.hooks({
    // Order
    lottery_resultInsert: {
        onSuccess: function (formType, result) {
            alertify.result().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    lottery_resultUpdate: {
        docToForm: function (doc, ss) {
            doc.resultDate = moment(doc.resultDate).format('YYYY-MM-DD');
            return doc;
        },
        onSuccess: function (formType, result) {
            alertify.result().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var configOnRendered = function () {
    var resultDate = $('[name="resultDate"]');
    DateTimePicker.date(resultDate);
};
