var subs = new SubsManager();

lotteryRoutes.route('/rank', {
    name: 'lottery.rank',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('lottery_customer', subs.subscribe('lottery_customer', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('lottery_rank');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Rank',
        parent: 'lottery.home'
    }
});
