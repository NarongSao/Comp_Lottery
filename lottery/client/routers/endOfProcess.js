var subs = new SubsManager();

lotteryRoutes.route('/endOfProcess', {
    name: 'lottery.endOfProcess',
    subscriptions: function (params, queryParams) {
        // Customer
        this.register('lottery_agent', subs.subscribe('lottery_agent'));
    },
    action: function (params, queryParams) {
        Layout.main('lottery_endOfProcess');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'End Of Process',
        parent: 'lottery.home'
    }
});
