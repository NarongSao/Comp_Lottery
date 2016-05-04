// Schema
Lottery.Schema.BetNumberReport = new SimpleSchema({
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
    },time: {
        type: String,
        autoform: {
            type: "select2",
            defaultValue: "E",
            options: function () {
                return Lottery.List.timeList();
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
    rank: {
        type: String,
        autoform: {
            type: "select2",
            defaultValue: "noRank",
            options: function () {
                return Lottery.ListForReport.rankList();
            }
        }
    }
});