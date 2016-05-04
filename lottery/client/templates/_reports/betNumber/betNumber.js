var reportTpl = Template.lottery_betNumberReport,
    generateTpl = Template.lottery_betNumberReportGen,
    agentTabular=Template.tabularModal,
    rankAddonTpl = Template.lottery_rankAddon;

var state = new ReactiveObj();
reportTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.date(name);

    name.on('dp.change',function(e){
        Session.set('dateParam', e.date);
    })

    // SEO
    SEO.set({
        title: 'Daily Report',
        description: 'Description for this page'
    });
});


reportTpl.onCreated(function () {


    // Create new  alertify
    createNewAlertify(["rankAddon"], {size: 'sm'});
});

generateTpl.onRendered(function(){
    // SEO
    SEO.set({
        title: 'Bet Number Report',
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
            //orientation: 'portrait'
            orientation: 'landscape'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        Fetcher.setDefault('data',false);
        Fetcher.retrieve('data','lottery_betNumberReport',q);

        return Fetcher.get('data');
        /*var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'acc_journalReport', q);

        if (!call.ready()) {
            return false;
        }
        return call.result();*/
    }
});




reportTpl.events({
    'click .rankAddon': function (e, t) {
        alertify.rankAddon(fa("plus", "Rank"), renderTemplate(rankAddonTpl));
    }
});

AutoForm.hooks({
   lottery_rankAddon:{
        onSuccess: function (formType, result) {
            alertify.rankAddon().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
