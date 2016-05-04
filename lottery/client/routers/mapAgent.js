var subs = new SubsManager();

lotteryRoutes.route('/mapAgent', {
    name: 'lottery.mapAgent',
    subscriptions: function (params, queryParams) {
        //this.register('lottery_location', subs.subscribe('lottery_location'));
    },
    action: function (params, queryParams) {
        Layout.main('lottery_mapAgent');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Map Agent',
        parent: 'lottery.home'
    }
});
