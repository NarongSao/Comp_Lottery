var reportTpl = Template.lottery_winLossReport,
    generateTpl = Template.lottery_winLossReportGen,
    agentTabular = Template.tabularModal;

var state = new ReactiveObj();
reportTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);

    name.on('dp.change', function (e) {
        Session.set('dateParam', e.date);
    })
    state.set('agentId', {
        _id: 'All',
        name: 'All'
    });
    // SEO
    SEO.set({
        title: 'Win Loss',
        description: 'Description for this page'
    });
});
reportTpl.helpers({
    agentId: function () {
        return state.get('agentId');
    }

});

reportTpl.events({
    'click .clear-agent': function () {
        state.set('agentId', {
            _id: 'All',
            name: 'All'
        });
    }
})
/*
 reportTpl.events({
 'change [name="date"]':function(e){
 Session.set('dateSession',$(e.currentTarget).val());
 }
 });
 */

agentTabular.events({
    "click tbody > tr": function (event, template) {
        var dataTable = $(event.target).closest('table').DataTable();
        var rowData = dataTable.row(event.currentTarget).data();
        state.set('agentId', rowData);
        $('.tabularModal').modal('hide');
        // alertify.listCustomer().close();
    }
});

generateTpl.onRendered(function () {
    // SEO
    SEO.set({
        title: 'Win/Loss Report',
        description: 'Description for this page'
    });
});


generateTpl.helpers({
    options: function () {
        // font size = null (default), bg
        // paper = a4, a5, mini
        // orientation = portrait, landscape
        return {
            //fontSize: 'bg',
            paper: 'a4',
            size : '9',
            //orientation: 'portrait'
            orientation: 'landscape'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        Fetcher.setDefault('data', false);
        Fetcher.retrieve('data', 'lottery_winLossReport', q);

        return Fetcher.get('data');
        /*var callId = JSON.stringify(q);
         var call = Meteor.callAsync(callId, 'acc_journalReport', q);

         if (!call.ready()) {
         return false;
         }
         return call.result();*/
    }
});



