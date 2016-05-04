// Order
Lottery.TabularTable.Bet = new Tabular.Table({
    name: "lottery_betList",
    collection: Lottery.Collection.Bet,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.lottery_betAction},
        {data: "_id", title: "ID"},
        {
            data: "betDate",
            title: "Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "time", title: "Time"},
        {data: "page", title: "Page"},
        {data: "line", title: "Line"},
        {
            data: "totalRiel2D", title: "Total Riel",
            render: function (val, type, doc) {
                return val + doc.totalRiel3D;
            }
        },
        {
            data: "totalDollar2D", title: "Total Dollar",
            render: function (val, type, doc) {
                return val + doc.totalDollar3D;
            }
        },
        {
            data: "totalBath2D", title: "Total Bath",
            render: function (val, type, doc) {
                return val + doc.totalBath3D;
            }
        },
        {
            data:"createdBy", title: "User Entry",
            render: function(val,type,doc){
                return Meteor.users.findOne(val).username;
            }
        }
    ],
    extraFields: ["totalRiel3D", "totalBath3D", "totalDollar3D"]
});