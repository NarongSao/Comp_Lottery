// Location
Lottery.TabularTable.MapAgent = new Tabular.Table({
    name: "lottery_mapAgentList",
    collection: Lottery.Collection.MapAgent,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.lottery_mapAgentAction},
        {data: "_id", title: "ID"},
        {data: "mainAgent", title: "Main Agent"},
        {
            data: "detail", title: "Agent",
            render: function (val, type, doc) {
                var re = "";
                if (val.length != 0) {
                    val.forEach(function (obj) {
                        re += obj.agent + '<br>';
                    })
                }
                return re;

            }
        }
    ]
});