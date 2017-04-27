/**
 * Declare template
 */
var indexTpl = Template.lottery_removeData,
    insertTpl = Template.lottery_removeDataInsert;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Remove Data',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(['removeData']);
});


indexTpl.events({
    'click .insert': function (e, t) {
        alertify.removeData(fa("plus", "Remove Data"), renderTemplate(insertTpl));
    }
});

insertTpl.onRendered(function () {
    var removeDate = $('[name="removeDate"]');
    DateTimePicker.date(removeDate);
})


// Hook
AutoForm.hooks({
    // Order
    lottery_removeDataInsert: {
        before: {
            insert: function (doc) {
                debugger;
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.removeData().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }

    }
});

