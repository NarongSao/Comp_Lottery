lotteryRoutes.route('/winLossReport', {
  name: 'lottery.winLossReport',
  subscriptions: function (params, queryParams) {
    this.register(
        'lottery_agent',
        Meteor.subscribe('lottery_agent')
    );
  },
  action: function(params, queryParams) {
    Layout.main('lottery_winLossReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Win Loss Report',
    parent: 'lottery.home'
  }
});

lotteryRoutes.route('/winLossReportGen', {
  name: 'lottery.winLossReportGen',
  action: function(params, queryParams) {
      Layout.report('lottery_winLossReportGen');
  }
});

