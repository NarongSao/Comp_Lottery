// Customer
Lottery.TabularTable.Rank = new Tabular.Table({
    name: "lottery_postList",
    collection: Lottery.Collection.Rank,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.lottery_rankAction},
        {data: "_id", title: "ID"},
        {data: "minKHR", title: "Min KHR"},
        {data: "maxKHR", title: "Max KHR"},
        {data: "minUSD", title: "Min USD"},
        {data: "maxUSD", title: "Max USD"},
        {data: "minTHB", title: "Min THB"},
        {data: "maxTHB", title: "Max THB"}
    ]
});