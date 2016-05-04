lotteryRoutes.route('/betReport', {
  name: 'lottery.betReport',
  /*subscriptions: function (params, queryParams) {
    this.register(
        'lottery_agent',
        Meteor.subscribe('lottery_agent')
    );
  },*/
  action: function(params, queryParams) {
    Layout.main('lottery_betReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Bet Report',
    parent: 'lottery.home'
  }
});

lotteryRoutes.route('/betReportGen', {
  name: 'lottery.betReportGen',
  action: function(params, queryParams) {
      Layout.report('lottery_betReportGen');
  }
});

