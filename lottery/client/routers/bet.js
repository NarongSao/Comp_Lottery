var subs = new SubsManager();

lotteryRoutes.route('/bet/:agentId', {
    name: 'lottery.bet',
    subscriptions: function (params, queryParams) {
        // Order
        //this.register(
        //    'lottery_orderByCustomer',
        //    subs.subscribe('lottery_orderByCustomer', params.customerId)
        //);
    },
    action: function (params, queryParams) {
        Layout.main('lottery_bet');
    },
    breadcrumb: {
        params: ['agentId'],
        //queryParams: ['show', 'color'],
        title: 'Bet',
        parent: 'lottery.agent'
    }
});
lotteryRoutes.route('/betInsert', {
    name: 'lottery.betInsert',
    subscriptions: function (params, queryParams) {
        // Order
        //this.register(
        //    'lottery_orderByCustomer',
        //    subs.subscribe('lottery_orderByCustomer', params.customerId)
        //);
    },
    action: function (params, queryParams) {
        Layout.main('lottery_betInsert');
    },
    breadcrumb: {
        params: ['agentId'],
        //queryParams: ['show', 'color'],
        title: 'Bet',
        parent: 'lottery.bet'
    }
});
lotteryRoutes.route('/betUpdate/:betId', {
    name: 'lottery.betUpdate',
    subscriptions: function (params, queryParams) {
        // Order
        //this.register(
        //    'lottery_orderByCustomer',
        //    subs.subscribe('lottery_orderByCustomer', params.customerId)
        //);
    },
    action: function (params, queryParams) {
        Layout.main('lottery_betUpdate');
    },
    breadcrumb: {
        params: ['betId'],
        //queryParams: ['show', 'color'],
        title: 'Bet',
        parent: 'lottery.bet'
    }
});

