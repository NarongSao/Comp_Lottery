lotteryRoutes.route('/home', {
    name: 'lottery.home',
    action: function (params, queryParams) {
        Layout.main('lottery_home');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Home'
        //parent: 'Home'
    }
});
