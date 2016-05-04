// Customer
Lottery.TabularTable.Post = new Tabular.Table({
    name: "lottery_postList",
    collection: Lottery.Collection.Post,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.lottery_postAction},
        {data: "_id", title: "ID"},
        {data: "postName", title: "Post Name"},
        {data: "payment2D", title: "Payment 2D"},
        {data: "payment3D", title: "Payment 3D"}
    ]
});