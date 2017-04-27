// Customer
Lottery.TabularTable.RemoveData = new Tabular.Table({
    name: "lottery_endOfProcessList",
    collection: Lottery.Collection.RemoveData,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.lottery_removeDataAction},
        {data: "_id", title: "ID"},
        {
            data: "closeDate", title: "Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {
            data: "createdBy", title: "User Created",
            render: function (val, type, doc) {
                return Meteor.users.findOne(val).username;
            }
        }
    ]
});