// Collection
Lottery.Collection.BetDetail = new Mongo.Collection("lottery_betDetail");

// Schema
Lottery.Schema.BetDetail = new SimpleSchema({
    betDetailDate: {
        type: Date,
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    page: {
        type: Number,
        label: 'Page'
    },
    line: {
        type: Number,
        label: 'Line'
    }, time: {
        type: String,
        label: 'Time'
    }, currencyId: {
        type: String,
        label: 'Time'
    },
    post: {
        type: String
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
    'items.$.totalPerNumber': {
        type: Number,
        decimal: true
    },
    total: {
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
    idOrigin: {
        type: String,
        optional: true
    }
});

// Attach schema
Lottery.Collection.BetDetail.attachSchema(Lottery.Schema.BetDetail);

/*
 // Attach soft remove
 Lottery.Collection.BetDetail.attachBehaviour('softRemovable');*/
