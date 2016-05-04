// Collection
Lottery.Collection.Result = new Mongo.Collection("lottery_result");

// Schema
Lottery.Schema.Result = new SimpleSchema({
    resultDate: {
        type: Date,
        label: "Result Date",
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    time: {
        type: String,
        label: "Time",
        autoform: {
            type: "select2",
            defaultValue: "E",
            options: function () {
                return Lottery.List.timeList();
            }
        }
    },
    postA: {
        type: Object
    },
    'postA.result2D': {
        type: String,
        label: '2D Result'
    },
    'postA.result3D': {
        type: String,
        label: '3D Result'
    },
    postB: {
        type: Object
    },
    'postB.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min:2,
        optional: true
    },
    'postB.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min:3,
        optional: true
    },
    postC: {
        type: Object,
        optional: true
    },
    'postC.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min:2,
        optional: true
    },
    'postC.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min:3,
        optional: true
    },
    postD: {
        type: Object,
        optional: true
    },
    'postD.result2D': {
        type: String,
        label: '2D Result',
        max: 2,
        min:2,
        optional: true
    },
    'postD.result3D': {
        type: String,
        label: '3D Result',
        max: 3,
        min:3,
        optional: true
    },
    postLo: {
        type: Object,
        optional: true
    },
    'postLo.result2D': {
        type: String,
        label: '2D Result',
        optional: true
    },
    'postLo.result3D': {
        type: String,
        label: '3D Result',
        optional: true
    }
});

// Attach schema
Lottery.Collection.Result.attachSchema(Lottery.Schema.Result);

/*
// Attach soft remove
Lottery.Collection.Result.attachBehaviour('softRemovable');*/
