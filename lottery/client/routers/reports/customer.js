/**
 * Browser view
 */
lotteryRoutes.route('/customerReport', {
    name: 'lottery.customerReport',
    action: function (params, queryParams) {
        Layout.main('lottery_customerReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Report',
        parent: 'lottery.home'
    }
});

lotteryRoutes.route('/customerReportGen', {
    name: 'lottery.customerReportGen',
    action: function (params, queryParams) {
        Layout.report('lottery_customerReportGen');
    }
});

/**
 * Excel
 */
lotteryRoutes.route('/customerExcelReport', {
    name: 'lottery.customerExcelReport',
    action: function (params, queryParams) {
        Layout.main('lottery_customerExcelReport');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Customer Excel Report',
        parent: 'lottery.home'
    }
});
