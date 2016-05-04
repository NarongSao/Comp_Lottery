var subs = new SubsManager();

lotteryRoutes.route('/location', {
    name: 'lottery.location',
    subscriptions: function (params, queryParams) {
        //this.register('lottery_location', subs.subscribe('lottery_location'));
    },
    action: function (params, queryParams) {
        Layout.main('lottery_location');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Location',
        parent: 'lottery.home'
    }
});
