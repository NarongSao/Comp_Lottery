// Customer
Lottery.TabularTable.EndPerMonth = new Tabular.Table({
    name: "lottery_endPerMonthList",
    collection: Lottery.Collection.EndPerMonth,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.lottery_endPerMonthAction},
        {data: "_id", title: "ID"},
        {
            data: "endDate", title: "Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        }
        ,
        {
            data: "createdBy", title: "User Created",
            render: function (val, type, doc) {
                return Meteor.users.findOne(val).username;
            }
        }
    ]
});