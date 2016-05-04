// Schema
Lottery.Schema.WinLossReport = new SimpleSchema({
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
        type: [String],
        optional: true,
        autoform: {
            type: "select2",
            multiple: true,
            defaultValue: "All",
            options: function () {
                return Lottery.List.agentList();
            }
        }
    }, currencyId: {
        type: [String],
        autoform: {
            type: "selectize",
            multiple: true,
            maxItems: 2,
            options: function () {
                return Lottery.List.currencyList();
            }
        }
    },
    country: {
        type: String,
        autoform: {
            type: "select2",
            defaultValue: "Vietnam",
            options: function () {
                var list = [];
                list.push({
                    label: "Vietnam",
                    value: "Vietnam"
                },{
                    label: "Thai",
                    value: "Thai"
                })
                return list;
            }
        }
    }
});