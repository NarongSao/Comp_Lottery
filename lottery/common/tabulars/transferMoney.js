// Customer
Lottery.TabularTable.TransferMoney = new Tabular.Table({
    name: "lottery_transferMoneyList",
    collection: Lottery.Collection.TransferMoney,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.lottery_transferMoneyAction},
        {data: "_id", title: "ID"},
        {
            data: "transferDate", title: "Transfer Date",
            render: function (val, type, doc) {
                return moment(val).format('DD-MM-YYYY');
            }
        },
        {data: "transferFromName.mainAgent", title: "Transfer From"},
        {data: "transferToName.mainAgent", title: "Transfer To"},
        {data: "amount", title: "Amount"},
        {data: "currencyId", title: "Currency"}
    ]
});