// Collection
Lottery.Collection.TransferMoney = new Mongo.Collection("lottery_transferMoney");

// Schema
Lottery.Schema.TransferMoney = new SimpleSchema({
    transferDate: {
        type: Date,
        label: "Transfer Date",
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    transferFrom: {
        type:String,
        label: "Transfer From",
        autoform: {
            type: "selectize",
            options: function () {
                return Lottery.ListForReport.agentListTransfer();
            }
        }
    },
    transferTo: {
        type:String,
        label: "Transfer To",
        autoform: {
            type: "selectize",
            options: function () {
                return Lottery.ListForReport.agentListTransfer();
            }
        }
    },
    amount: {
        type: Number,
        decimal: true,
        label: "Amount"
    },
    currencyId: {
        type: String,
        label: "Currency",
        autoform: {
            type: "select2",
            defaultValue: "KHR",
            options: function () {
                return Lottery.List.currencyList();
            }
        }
    },
    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Lottery.Collection.TransferMoney.attachSchema(Lottery.Schema.TransferMoney);

