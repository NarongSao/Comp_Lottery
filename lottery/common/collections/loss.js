// Collection
Lottery.Collection.Loss = new Mongo.Collection("lottery_loss");

// Schema
Lottery.Schema.Loss = new SimpleSchema({
    lossDate: {
        type: Date/*,
         defaultValue: function () {
         return moment().format('YYYY-MM-DD');
         }*/
    }
    , time: {
        type: String,
        label: 'Time'
    },
    agentId: {
        type: String,
        label: 'Agent'
    },
    branchId: {
        type: String,
        label: "Branch"
    },
    endOfProcessId: {
        type: String
    }
    ,
    detail: {
        type: [Object]
    },
    'detail.$.page': {
        type: Number,
        label: 'Page'
    },
    'detail.$.totalRiel2D': {
        type: Number,
        decimal: true
    },
    'detail.$.totalRiel3D': {
        type: Number,
        decimal: true
    }, 'detail.$.totalDollar2D': {
        type: Number,
        decimal: true
    }, 'detail.$.totalDollar3D': {
        type: Number,
        decimal: true
    }, 'detail.$.totalBath2D': {
        type: Number,
        decimal: true
    }, 'detail.$.totalBath3D': {
        type: Number,
        decimal: true
    }


    ,
    'detail.$.lossRiel2D': {
        type: Number,
        decimal: true
    },
    'detail.$.lossRiel3D': {
        type: Number,
        decimal: true
    }, 'detail.$.lossDollar2D': {
        type: Number,
        decimal: true
    }, 'detail.$.lossDollar3D': {
        type: Number,
        decimal: true
    }, 'detail.$.lossBath2D': {
        type: Number,
        decimal: true
    }, 'detail.$.lossBath3D': {
        type: Number,
        decimal: true
    }, 'detail.$.updateCount': {
        type: Number,
        decimal: true
    }
});

// Attach schema
Lottery.Collection.Loss.attachSchema(Lottery.Schema.Loss);

/*
 // Attach soft remove
 Lottery.Collection.Bet.attachBehaviour('softRemovable');*/

