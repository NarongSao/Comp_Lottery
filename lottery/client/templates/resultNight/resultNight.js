/**
 * Declare template
 */
var indexTpl = Template.lottery_result,
    insertTpl = Template.lottery_resultNightInsert,
    updateTpl = Template.lottery_resultNightUpdate,
    showTpl = Template.lottery_resultNightShow

var state=new ReactiveObj({
    c: "",
    d: ""
});

/**
 * Index
 */
indexTpl.onCreated(function () {
    // Create new  alertify
    createNewAlertify(['resultNight'], {size: 'lg'});
    createNewAlertify(['resultNightShow']);
});

indexTpl.events({
    'click .insertNight': function (e, t) {
        alertify.resultNight(fa("plus", "Result Night"), renderTemplate(insertTpl)).maximize();
    }
});

/**
 * Insert
 */
insertTpl.onRendered(function () {
    configOnRendered();
    $(window).keydown(function (event) {
        if (event.ctrlKey && (event.which == 13 )) {
            $('.save').trigger("click")
            event.preventDefault();
        }
    });
});

insertTpl.helpers({
    defaultTime: function(){
        return "N";
    },
    c: function(){
        return state.get("c");
    },
    d: function(){
        return state.get("d");
    }
})

insertTpl.events({
    'blur [name="B27"]': function(e) {

        var data = e.currentTarget.value;
        var c2 = data.substr(3,2);
        var c3 = data.substr(0,3);

        var d3 = data.substr(1,3);
        var d2 = data.substr(0,1) + data.substr(4,1);

        state.set("c",c2+c3);
        state.set("d",d2+d3);
    },
    'keypress [name="A1"],[name="A2"],[name="A3"],[name="A4"],[name="A5"],[name="A6"],[name="A7"],[name="T8"],[name="T9"],[name="T10"],[name="T11"],[name="T12"],[name="T13"],[name="T14"],[name="T15"],[name="T16"],[name="T17"],[name="T18"],[name="T19"],[name="T20"],[name="T21"],[name="T22"],[name="T23"],[name="T24"],[name="T25"],[name="T26"],[name="B27"],[name="C"],[name="D"]': function (evt) {
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

updateTpl.onRendered(function () {
    configOnRendered();
    var data=$('[name="B27"]').val();
    var c2 = data.substr(3,2);
    var c3 = data.substr(0,3);

    var d3 = data.substr(1,3);
    var d2 = data.substr(0,1) + data.substr(4,1);

    state.set("c",c2+c3);
    state.set("d",d2+d3);


    $(window).keydown(function (event) {
        if (event.ctrlKey && (event.which == 13 )) {
            $('.save').trigger("click")
            event.preventDefault();
        }
    });
});

updateTpl.helpers({
    c: function(){
        return state.get("c");
    },
    d: function(){
        return state.get("d");
    }
});


updateTpl.events({
    'blur [name="B27"]': function(e) {

        var data = e.currentTarget.value;
        var c2 = data.substr(3,2);
        var c3 = data.substr(0,3);

        var d3 = data.substr(1,3);
        var d2 = data.substr(0,1) + data.substr(4,1);

        state.set("c",c2+c3);
        state.set("d",d2+d3);
    },
    'keypress [name="A1"],[name="A2"],[name="A3"],[name="A4"],[name="A5"],[name="A6"],[name="A7"],[name="T8"],[name="T9"],[name="T10"],[name="T11"],[name="T12"],[name="T13"],[name="T14"],[name="T15"],[name="T16"],[name="T17"],[name="T18"],[name="T19"],[name="T20"],[name="T21"],[name="T22"],[name="T23"],[name="T24"],[name="T25"],[name="T26"],[name="B27"],[name="C"],[name="D"]': function (evt) {
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ($(evt.currentTarget).val().indexOf('.') != -1) {
            if (charCode == 46) {
                return false;
            }
        }
        return !(charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57));
    }
})

// Hook
AutoForm.hooks({
    // Order
    lottery_resultNightInsert: {
        onSuccess: function (formType, result) {
            alertify.result().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    lottery_resultNightUpdate: {
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
