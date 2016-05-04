// Collection
Lottery.Collection.Rank = new Mongo.Collection("lottery_rank");

// Schema
Lottery.Schema.Rank = new SimpleSchema({

    minKHR: {
        type: Number,
        label: 'Min KHR'
    },

    maxKHR: {
        type: Number,
        label: "Max KHR"
    }
    ,
    minUSD: {
        type: Number,
        label: 'Min USD'
    },

    maxUSD: {
        type: Number,
        label: "Max USD"
    },
    minTHB: {
        type: Number,
        label: 'Min THB'
    },

    maxTHB: {
        type: Number,
        label: "Max THB"
    }
});

// Attach schema
Lottery.Collection.Rank.attachSchema(Lottery.Schema.Rank);

