// Collection
Lottery.Collection.Location = new Mongo.Collection("lottery_location");
// Schema
Lottery.Schema.Location = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    detail: {
        type: [Object]
    },
    'detail.$.date': {
        type: Date,
        label: "Date"
    }
    ,
    'detail.$.offValue2D': {
        type: Number,
        decimal: true,
        label: 'Off value 2D (%)'
    },
    'detail.$.offValue3D': {
        type: Number,
        decimal: true,
        label: 'Off value 3D (%)'
    },
    'detail.$.win2D': {
        type: Number,
        label: 'Win 2D'
    },
    'detail.$.win3D': {
        type: Number,
        label: 'Win 3D'
    },
    'detail.$.add': {
        type: Number,
        label: "Add"
    },
    'detail.$.share': {
        type: Number,
        label: "Share(%)"
    }
});

// Attach schema
Lottery.Collection.Location.attachSchema(Lottery.Schema.Location);
/*
// Attach soft remove
Lottery.Collection.Location.attachBehaviour('softRemovable');*/
