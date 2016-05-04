// Schema
Lottery.Schema.DailyByDayReport = new SimpleSchema({
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
            var today = new Date();
            var year = today.getFullYear();
            var month = today.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var lastDayOfMonth = (new Date(today.getFullYear(), today.getMonth() +
                1, 1)).getUTCDate();
            var currentDate = year + '-' + month + '-' + "01" + " To " + year +
                '-' + month + '-' + lastDayOfMonth;
            return currentDate;
        }
    }
    , currencyId: {
        type: [String],
        autoform: {
            type: "selectize",
            multiple: true,
            maxItems: 2,
            options: function () {
                return Lottery.List.currencyList();
            }
        }
    }
});