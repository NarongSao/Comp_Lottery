// Order
Lottery.TabularTable.Result = new Tabular.Table({
    name: "lottery_resultList",
    collection: Lottery.Collection.Result,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    order: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.lottery_resultAction},
        /*        {data: "_id", title: "ID"},*/
        {
            data: "resultDate",
            title: "Date",
            render: function (val, type, doc) {
                return moment(val).format('YYYY-MM-DD');
            }
        },
        {data: "time", title: "Time"},
        {
            data: "postA",
            title: "Post A",
            render: function (val, type, doc) {
                var re = "<b>2D :</b> ";
                re += val.result2D
                re += "<br><b>3D :</b> "
                re += val.result3D
                return re;
            }
        },
        {
            data: "postB",
            title: "Post B",
            render: function (val, type, doc) {
                if (val.result2D != null) {
                    var re = "<b>2D :</b> ";
                    re += val.result2D
                }
                if (val.result3D != null) {
                    re += "<br><b>3D :</b> "
                    re += val.result3D
                }
                return re;

            }
        },
        {
            data: "postC",
            title: "Post C",
            render: function (val, type, doc) {
                if (val != null) {
                    var re = "<b>2D :</b> ";
                    re += val.result2D
                    re += "<br><b>3D :</b> "
                    re += val.result3D
                    return re;
                }
            }
        },
        {
            data: "postD",
            title: "Post D",
            render: function (val, type, doc) {
                if (val != null) {
                    var re = "<b>2D :</b> ";
                    re += val.result2D
                    re += "<br><b>3D :</b> "
                    re += val.result3D
                    return re;

                }
            }
        },
        {
            data: "postLo",
            title: "Post Lo",
            render: function (val, type, doc) {
                if (val != null) {
                    var re = "<b>2D :</b> ";
                    var i = 1;
                    var j = 1;
                    var newResult2D = "";
                    var newResult3D = "";
                    val.result2D.split(",").forEach(function (obj) {
                        if (i % 2 == 0) {
                            if (i == 24) {
                                newResult2D += "<br>";
                            }
                            newResult2D += "<span class='label label-warning' style='font-size: 8pt'>" + obj + "</span>&nbsp;";
                        } else {
                            newResult2D += obj;
                        }
                        i++
                    })
                    re += newResult2D;
                    re += "<br><b>3D :</b> "
                    val.result3D.split(",").forEach(function (obj) {
                        if (j % 2 == 0) {
                            if (j == 18) {
                                newResult3D += "<br>";
                            }
                            newResult3D += "<span class='label label-warning' style='font-size: 8pt'>" + obj + "</span>&nbsp;";
                        } else {
                            newResult3D += obj;
                        }
                        j++
                    })
                    re += newResult3D;
                    return re;
                }

            }
        }
        /*,
         {data: "des", title: "Description"}*/
        //{data: "customerId", title: "Customer ID"},
        //{
        //    data: "_customer",
        //    title: "Customer Info",
        //    render: function (val, type, doc) {
        //        return JSON.stringify(val, null, ' ');
        //    }
        //}
    ],
    extraFields: ["_id"]
});