lotteryRoutes.route('/outStandingReport', {
  name: 'lottery.dailySummaryReport',
  /*subscriptions: function (params, queryParams) {
    this.register(
        'lottery_agent',
        Meteor.subscribe('lottery_agent')
    );
  },*/
  action: function(params, queryParams) {
    Layout.main('lottery_outStandingReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Daily Summary Report',
    parent: 'lottery.home'
  }
});

lotteryRoutes.route('/outStandingReportGen', {
  name: 'lottery.profitLossReportGen',
  action: function(params, queryParams) {
      Layout.report('lottery_outStandingReportGen');
  }
});

