// Collection
Lottery.Collection.ResultEvening = new Mongo.Collection("lottery_resultEvening");

// Schema
Lottery.Schema.ResultEvening = new SimpleSchema({
    resultDate: {
        type: Date,
        label: "Result Date",
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    time: {
        type: String,
        label: "Time"/*,
         autoform: {
         type: "select2",
         options: function () {
         return Lottery.List.timeList();
         }
         }*/
    },
    A1: {
        type: String,
        label: "1/A",
        max: 2,
        min: 2
    },
    A2: {
        type: String,
        label: "2/A",
        max: 3,
        min: 3
    },
    T3:{
        type: String,
        label: "3",
        max: 4,
        min: 4
    },
    T4:{
        type: String,
        label: "4",
        max: 4,
        min: 4
    },
    T5:{
        type: String,
        label: "5",
        max: 4,
        min: 4
    },
    T6:{
        type: String,
        label: "6",
        max: 4,
        min: 4
    },
    T7:{
        type: String,
        label: "7",
        max: 5,
        min: 5
    },
    T8:{
        type: String,
        label: "8",
        max: 5,
        min: 5
    },
    T9:{
        type: String,
        label: "9",
        max: 5,
        min: 5
    },
    T10:{
        type: String,
        label: "10",
        max: 5,
        min: 5
    },
    T11:{
        type: String,
        label: "11",
        max: 5,
        min: 5
    },
    T12:{
        type: String,
        label: "12",
        max: 5,
        min: 5
    },
    T13:{
        type: String,
        label: "13",
        max: 5,
        min: 5
    },
    T14:{
        type: String,
        label: "14",
        max: 5,
        min: 5
    },
    T15:{
        type: String,
        label: "15",
        max: 5,
        min: 5
    },
    T16:{
        type: String,
        label: "16",
        max: 5,
        min: 5
    },
    T17:{
        type: String,
        label: "17",
        max: 5,
        min: 5
    },
    B18:{
        type: String,
        label: "18/B",
        max: 5,
        min: 5
    },
    C:{
        type: String,
        label: "C",
        max: 5,
        min: 5
    },
    D:{
        type: String,
        label: "D",
        max: 5,
        min: 5
    },
    resultId: {
        type: String,
        optional: true
    }
});

// Attach schema
Lottery.Collection.ResultEvening.attachSchema(Lottery.Schema.ResultEvening);

/*
// Attach soft remove
Lottery.Collection.ResultEvening.attachBehaviour('softRemovable');*/
