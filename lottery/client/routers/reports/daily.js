lotteryRoutes.route('/dailyReport', {
  name: 'lottery.dailyReport',
  subscriptions: function (params, queryParams) {
    this.register(
        'lottery_agent',
        Meteor.subscribe('lottery_agent')
    );
  },
  action: function(params, queryParams) {
    Layout.main('lottery_dailyReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Daily Report',
    parent: 'lottery.home'
  }
});

lotteryRoutes.route('/dailyReportGen', {
  name: 'lottery.dailyReportGen',
  action: function(params, queryParams) {
      Layout.report('lottery_dailyReportGen');
  }
});

