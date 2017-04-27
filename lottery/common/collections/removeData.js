// Collection
Lottery.Collection.RemoveData = new Mongo.Collection("lottery_removeData");

// Schema
Lottery.Schema.RemoveData = new SimpleSchema({
    removeDate: {
        type: Date,
        label: "Remove Date",
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Lottery.Collection.RemoveData.attachSchema(Lottery.Schema.RemoveData);
