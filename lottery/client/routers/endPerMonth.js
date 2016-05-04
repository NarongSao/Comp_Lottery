var subs = new SubsManager();

lotteryRoutes.route('/endPerMonth', {
    name: 'lottery.endPerMonth',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('lottery_agent', subs.subscribe('lottery_agent'));
    },
    action: function (params, queryParams) {
        Layout.main('lottery_endPerMonth');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'End Per Month',
        parent: 'lottery.home'
    }
});
