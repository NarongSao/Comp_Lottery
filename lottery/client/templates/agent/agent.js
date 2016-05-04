/**
 * Declare template
 */
var indexTpl = Template.lottery_agent,
    insertTpl = Template.lottery_agentInsert,
    updateTpl = Template.lottery_agentUpdate,
    showTpl = Template.lottery_agentShow,

    locationAddOnTpl = Template.lottery_locationAddOnAgent;

/**
 * State
 */
var state = new ReactiveObj({
    location: {}
});

/**
 * Index
 */
indexTpl.onCreated(function () {

    // SEO
    SEO.set({
        title: 'Agent',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["agent"], {size: 'lg'});
    createNewAlertify(["agentShow"]);
    createNewAlertify(["locationAddon"], {transition: 'zoom', size: 'lg'});
});

indexTpl.onRendered(function () {
    //
});

indexTpl.helpers({
    selector: function () {
        return {branchId: Session.get('currentBranch')};
    }
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.agent(fa("plus", "Agent"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.agent(fa("pencil", "Agent"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Agent"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Lottery.Collection.Agent.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    },
    'click .js-show': function (e, t) {
        alertify.agentShow(fa("eye", "Agent"), renderTemplate(showTpl, this));
    },
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target)
            .closest('table')
            .DataTable();
        var rowData = dataTable.row(event.currentTarget)
            .data();
        FlowRouter.go('lottery.bet', {agentId: rowData._id});
    }
});

/**
 * Insert
 */
insertTpl.onCreated(function () {

});
insertTpl.onRendered(function () {
    configOnRender();
});

insertTpl.helpers({
    location: function () {
        return state.get('location');
    }
});

insertTpl.events({
    'click .js-location-addon': function (e, t) {
        alertify.locationAddon(fa("plus", "Location"), renderTemplate(locationAddOnTpl));
    }
});

insertTpl.onDestroyed(function () {
    state.set('location', {});
});

/**
 * Update
 */
updateTpl.onCreated(function () {
    this.subscribe('lottery_agentById', this.data._id);
    state.set('location', {
        _id: this.data.locationId,
        name: this.data._location.name
    });
});

updateTpl.onRendered(function () {
    configOnRender();
});

updateTpl.helpers({
    location: function () {
        return state.get('location');
    },
    data: function () {
        return ReactiveMethod.call('lottery_agentById',this._id);
    }
});

updateTpl.events({
    'click .js-location-addon': function (e, t) {
        alertify.locationAddon(fa("plus", "Location"), renderTemplate(locationAddOnTpl));
    }
});

updateTpl.onDestroyed(function () {
    state.set('location', {});
});

/**
 * Show
 */
showTpl.onCreated(function () {
    this.subscribe('lottery_agentById', this.data._id);
});

showTpl.helpers({
    data: function () {
        return ReactiveMethod.call('lottery_agentById',this._id);
    }
});

/**
 * Location add on
 */
locationAddOnTpl.events({
    'dblclick tbody > tr': function (event) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();

        //$('label [for="locationId"]').val('Lcation: ' + rowData._id);
        //$('[name="locationId"]').val(rowData._id);
        state.set('location', rowData);
        alertify.locationAddon().close();
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    lottery_agentInsert: {
        before: {
            insert: function (doc) {
                doc.branchId = Session.get('currentBranch');
                return doc;
            }
        },
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    lottery_agentUpdate: {
        onSuccess: function (formType, result) {
            alertify.agent().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

// Config date picker
var configOnRender = function () {
    var dob = $('[name="dob"]');
    DateTimePicker.date(dob);

    // Remote select2 (Meteor method)
    //$('[name="locationId"]')
    //    .select2({
    //        placeholder: "Search location",
    //        allowClear: true,
    //        minimumInputLength: 3,
    //        ajax: {
    //            data: function (params) {
    //                return params;
    //            },
    //            transport: function (args) {
    //                // Meteor method call
    //                Meteor.call('school_listAddress', args.data, function (err, results) {
    //                    if (err) {
    //                        args.error(err);
    //                        return;
    //                    }
    //
    //                    args.success(results);
    //                });
    //            },
    //            results: function (data) {
    //                var results = [];
    //                _.each(data, function (result) {
    //                    results.push({
    //                        id: result.value,
    //                        text: result.label
    //                    });
    //                });
    //
    //                return {results: results};
    //            }
    //        }
    //    });
};
