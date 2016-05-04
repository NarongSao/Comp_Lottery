lotteryRoutes.route('/betNumberReport', {
  name: 'lottery.betNumberReport',
  subscriptions: function (params, queryParams) {
    this.register(
        'lottery_rank',
        Meteor.subscribe('lottery_rank')
    ),this.register(
        'lottery_agent',
        Meteor.subscribe('lottery_agent')
    );
  },
  action: function(params, queryParams) {
    Layout.main('lottery_betNumberReport');
  },
  breadcrumb: {
    //params: ['id'],
    //queryParams: ['show', 'color'],
    title: 'Bet Number Report',
    parent: 'lottery.home'
  }
});

lotteryRoutes.route('/betNumberReportGen', {
  name: 'lottery.betNumberReportGen',
  action: function(params, queryParams) {
      Layout.report('lottery_betNumberReportGen');
  }
});

