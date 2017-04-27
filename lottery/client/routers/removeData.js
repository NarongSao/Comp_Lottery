var subs = new SubsManager();

lotteryRoutes.route('/removeData', {
    name: 'lottery.removeData',
    action: function (params, queryParams) {
        Layout.main('lottery_removeData');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Remove Data',
        parent: 'lottery.home'
    }
});
