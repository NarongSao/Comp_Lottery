var reportTpl = Template.lottery_dailyByDayReport,
    generateTpl = Template.lottery_dailyByDayReportGen


reportTpl.onRendered(function () {
    var name = $('[name="date"]');
    DateTimePicker.dateRange(name);

    name.on('dp.change',function(e){
        Session.set('dateParam', e.date);
    })

    // SEO
    SEO.set({
        title: 'Daily By Day Report',
        description: 'Description for this page'
    });
});


generateTpl.onRendered(function(){
    // SEO
    SEO.set({
        title: 'Daily By Day Report',
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
            orientation: 'portrait'
            //orientation: 'landscape'
        };
    },
    data: function () {
        // Get query params
        //FlowRouter.watchPathChange();
        var q = FlowRouter.current().queryParams;

        Fetcher.setDefault('data',false);
        Fetcher.retrieve('data','lottery_dailyByDayReport',q);

        return Fetcher.get('data');
        /*var callId = JSON.stringify(q);
        var call = Meteor.callAsync(callId, 'acc_journalReport', q);

        if (!call.ready()) {
            return false;
        }
        return call.result();*/
    }
});



