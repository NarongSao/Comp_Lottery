Meteor.methods({
    lottery_resultNightById: function(resultId){
        var data = Lottery.Collection.ResultNight.findOne({resultId: resultId});
        if(data!=null){
            data.resultDate = moment(data.resultDate).format('YYYY-MM-DD');
        }
        return data;
    },
    lottery_resultNightRemoveByResultId: function(resultId){
        Lottery.Collection.ResultNight.remove({resultId: resultId});
    }
})