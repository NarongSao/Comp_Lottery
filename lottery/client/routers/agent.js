var subs = new SubsManager();

lotteryRoutes.route('/agent', {
    name: 'lottery.agent',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('lottery_customer', subs.subscribe('lottery_customer', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('lottery_agent');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Agent',
        parent: 'lottery.home'
    }
});
