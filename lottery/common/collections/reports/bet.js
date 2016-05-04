// Schema
Lottery.Schema.BetReport = new SimpleSchema({
    branchId: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Lottery.ListForReport.branch();
            }
        },
        optional: true
    },
    date: {
        type: String,
        defaultValue: function () {
            var current = moment().format('YYYY-MM-DD');
            return current;
        }
    },
    agentId: {
        type: String,
        optional: true
        /*,
        autoform: {
            type: "select2",
            options: function () {
                return Lottery.ListForReport.agent();
            }
        }*/
    },time: {
        type: String,
        autoform: {
            type: "select2",
            defaultValue: "E",
            options: function () {
                return Lottery.List.timeList();
            }
        }
    },
    page: {
        type: [Number],
        autoform: {
            type: "selectize",
            multiple: true,
            defaultValue: 0,
            options: function () {
                var list=[];
                var i=1;
                list.push({label: "All Page",value: 0});
                for(i;i<15;i++){
                    list.push({
                        label: i,
                        value: i
                    })
                }
                return list;
            }
        },
        optional: true
    }
});