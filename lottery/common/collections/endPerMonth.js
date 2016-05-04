// Collection
Lottery.Collection.EndPerMonth = new Mongo.Collection("lottery_endPerMonth");

// Schema
Lottery.Schema.EndPerMonth = new SimpleSchema({
    endDate: {
        type: Date,
        label: "End Date",
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    detail: {
        type: [Object],
        optional: true
    },
    'detail.$.agentId': {
        type: String,
        label: "Agent",
        autoform: {
            type: "selectize",
            options: function () {
                return Lottery.ListForReport.agentListEndOfProcess();
            }
        }
    },
    'detail.$.remainRiel': {
        type: Number,
        decimal: true,
        label: "Amount Riel"
    },
    'detail.$.remainDollar': {
        type: Number,
        decimal: true,
        label: "Amount Dollar"
    },
    'detail.$.remainBath': {
        type: Number,
        decimal: true,
        label: "Amount Bath"
    }
    ,
    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Lottery.Collection.EndPerMonth.attachSchema(Lottery.Schema.EndPerMonth);

/*
 // Attach soft remove
 Lottery.Collection.Bet.attachBehaviour('softRemovable');*/

