// Collection
Lottery.Collection.Bet = new Mongo.Collection("lottery_bet");

// Schema
Lottery.Schema.Bet = new SimpleSchema({
    betDate: {
        type: Date/*,
         defaultValue: function () {
         return moment().format('YYYY-MM-DD');
         }*/
    },
    page: {
        type: Number,
        label: 'Page'
    },
    line: {
        type: Number,
        label: 'Line'
    },
    time: {
        type: String,
        label: 'Time',
        autoform: {
            type: "select2",
            options: function () {
                return Lottery.List.timeList();
            }
        }
    },
    items: {
        type: [Object]
    },
    'items.$.number': {
        type: String
    },
    'items.$.amount': {
        type: Number,
        decimal: true
    },
    'items.$.currencyId': {
        type: String
    },
    'items.$.post': {
        type: String
    },
    'items.$.betDetailId': {
        type: String,
        optional: true
    },
    totalRiel2D: {
        type: Number,
        decimal: true
    },
    totalRiel3D: {
        type: Number,
        decimal: true
    }, totalDollar2D: {
        type: Number,
        decimal: true
    }, totalDollar3D: {
        type: Number,
        decimal: true
    }, totalBath2D: {
        type: Number,
        decimal: true
    }, totalBath3D: {
        type: Number,
        decimal: true
    },
    agentId: {
        type: String,
        label: 'Agent'
    },
    branchId: {
        type: String,
        label: "Branch"
    },
    updateCount: {
        type: Number
    }
});

// Attach schema
Lottery.Collection.Bet.attachSchema(Lottery.Schema.Bet);

/*
// Attach soft remove
Lottery.Collection.Bet.attachBehaviour('softRemovable');*/

