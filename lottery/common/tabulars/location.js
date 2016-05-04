// Location
Lottery.TabularTable.Location = new Tabular.Table({
    name: "lottery_locationList",
    collection: Lottery.Collection.Location,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.lottery_locationAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {
            data: "detail", title: "Date",
            render: function (val, type, doc) {
                var re = "";
                if (val.length != 0) {
                    val.forEach(function (obj) {
                        re += moment(obj.date).format('DD-MM-YYYY') + '<br>';
                    })
                }
                return re;
            }
        },
        {
            data: "detail", title: "Off Value 2D %",
            render: function (val, type, doc) {
                var re = "";
                if (val.length != 0) {
                    val.forEach(function (obj) {
                        re += obj.offValue2D + '<br>';
                    })
                }
                return re;

            }
        },
        {
            data: "detail", title: "Off Value 3D %",
            render: function (val, type, doc) {
                var re = "";
                if (val.length != 0) {
                    val.forEach(function (obj) {
                        re += obj.offValue3D + '<br>';
                    })
                }
                return re;

            }
        },
        {
            data: "detail", title: "Win 2D",
            render: function (val, type, doc) {
                var re = "";
                if (val.length != 0) {
                    val.forEach(function (obj) {
                        re += obj.win2D + '<br>';
                    })
                }
                return re;

            }
        },
        {
            data: "detail", title: "Win 3D",
            render: function (val, type, doc) {
                var re = "";
                if (val.length != 0) {
                    val.forEach(function (obj) {
                        re += obj.win3D + '<br>';
                    })
                }
                return re;

            }
        },
        {
            data: "detail", title: "Add",
            render: function (val, type, doc) {
                var re = "";
                if (val.length != 0) {
                    val.forEach(function (obj) {
                        re += obj.add + '<br>';
                    })
                }
                return re;

            }
        },
        {
            data: "detail", title: "Share(%)",
            render: function (val, type, doc) {
                var re = "";
                if (val.length != 0) {
                    val.forEach(function (obj) {
                        re += obj.share + '<br>';
                    })
                }
                return re;
            }
        },
        {data: "_agentCount", title: "Agent Count"}
    ]
});