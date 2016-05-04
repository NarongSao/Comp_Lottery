// Collection
Lottery.Collection.EndOfProcess = new Mongo.Collection("lottery_endOfProcess");

// Schema
Lottery.Schema.EndOfProcess = new SimpleSchema({
    closeDate: {
        type: Date,
        label: "Close Date",
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    time: {
        type: String,
        label: "Time",
        defaultValue: "E",
        autoform: {
            type: "select2",
            options: function () {
                return Lottery.List.timeList();
            }
        }
    },
    agentId: {
        type:String,
        label: "Agent",
        autoform: {
            type: "selectize",
            options: function () {
                return Lottery.ListForReport.agentListEndOfProcess();
            }
        }
    }
    ,
    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Lottery.Collection.EndOfProcess.attachSchema(Lottery.Schema.EndOfProcess);

/*
 // Attach soft remove
 Lottery.Collection.Bet.attachBehaviour('softRemovable');*/

