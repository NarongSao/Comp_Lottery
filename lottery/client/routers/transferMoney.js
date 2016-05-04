var subs = new SubsManager();

lotteryRoutes.route('/transferMoney', {
    name: 'lottery.transferMoney',
    subscriptions: function (params, queryParams) {
        this.register('lottery_mapAgent', subs.subscribe('lottery_mapAgent'));
    },
    action: function (params, queryParams) {
        Layout.main('lottery_transferMoney');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Transfer Money',
        parent: 'lottery.home'
    }
});
