lotteryRoutes.route('/dailyByDayReport', {
  name: 'lottery.dailyByDayReport',
  /*subscriptions: function (params, queryParams) {
    this.register(
        'lottery_agent',
        Meteor.subscribe('lottery_agent')
    );
  },*/
  action: function(params, queryParams) {
    Layout.main('lottery_dailyByDayReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Daily By Day Report',
    parent: 'lottery.home'
  }
});

lotteryRoutes.route('/dailyByDayReportGen', {
  name: 'lottery.dailyByDayReportGen',
  action: function(params, queryParams) {
      Layout.report('lottery_dailyByDayReportGen');
  }
});

