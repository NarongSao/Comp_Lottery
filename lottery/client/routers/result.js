var subs = new SubsManager();

lotteryRoutes.route('/result', {
    name: 'lottery.result',
    subscriptions: function (params, queryParams) {
        // Order
        //this.register(
        //    'lottery_orderByCustomer',
        //    subs.subscribe('lottery_orderByCustomer', params.customerId)
        //);
    },
    action: function (params, queryParams) {
        Layout.main('lottery_result');
    },
    breadcrumb: {

        //queryParams: ['show', 'color'],
        title: 'Result',
        parent: 'lottery.home'
    }
});