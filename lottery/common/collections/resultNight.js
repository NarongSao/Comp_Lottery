// Collection
Lottery.Collection.ResultNight = new Mongo.Collection("lottery_resultNight");

// Schema
Lottery.Schema.ResultNight = new SimpleSchema({
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
        max: 2,
        min: 2
    },
    A3:{
        type: String,
        label: "3/A",
        max: 2,
        min: 2
    },
    A4:{
        type: String,
        label: "4/A",
        max: 2,
        min: 2
    },
    A5:{
        type: String,
        label: "5/A",
        max: 3,
        min: 3
    },
    A6:{
        type: String,
        label: "6/A",
        max: 3,
        min: 3
    },
    A7:{
        type: String,
        label: "7/A",
        max: 3,
        min: 3
    },
    T8:{
        type: String,
        label: "8",
        max: 4,
        min: 4
    },
    T9:{
        type: String,
        label: "9",
        max: 4,
        min: 4
    },
    T10:{
        type: String,
        label: "10",
        max: 4,
        min: 4
    },
    T11:{
        type: String,
        label: "11",
        max: 4,
        min: 4
    },
    T12:{
        type: String,
        label: "12",
        max: 4,
        min: 4
    },
    T13:{
        type: String,
        label: "13",
        max: 4,
        min: 4
    },
    T14:{
        type: String,
        label: "14",
        max: 4,
        min: 4
    },
    T15:{
        type: String,
        label: "15",
        max: 4,
        min: 4
    },
    T16:{
        type: String,
        label: "16",
        max: 4,
        min: 4
    },
    T17:{
        type: String,
        label: "17",
        max: 4,
        min: 4
    },
    T18:{
        type: String,
        label: "18",
        max: 5,
        min: 5
    },
    T19:{
        type: String,
        label: "19",
        max: 5,
        min: 5
    },
    T20:{
        type: String,
        label: "20",
        max: 5,
        min: 5
    },
    T21:{
        type: String,
        label: "21",
        max: 5,
        min: 5
    },
    T22:{
        type: String,
        label: "22",
        max: 5,
        min: 5
    },
    T23:{
        type: String,
        label: "23",
        max: 5,
        min: 5
    },
    T24:{
        type: String,
        label: "24",
        max: 5,
        min: 5
    },
    T25:{
        type: String,
        label: "25",
        max: 5,
        min: 5
    },
    T26:{
        type: String,
        label: "26",
        max: 5,
        min: 5
    },
    B27:{
        type: String,
        label: "27/B",
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
Lottery.Collection.ResultNight.attachSchema(Lottery.Schema.ResultNight);

/*
// Attach soft remove
Lottery.Collection.ResultNight.attachBehaviour('softRemovable');*/
