var subs = new SubsManager();

lotteryRoutes.route('/post', {
    name: 'lottery.post',
    subscriptions: function (params, queryParams) {
        // Customer
        //this.register('lottery_customer', subs.subscribe('lottery_customer', Session.get('currentBranch')));
    },
    action: function (params, queryParams) {
        Layout.main('lottery_post');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Post',
        parent: 'lottery.home'
    }
});
