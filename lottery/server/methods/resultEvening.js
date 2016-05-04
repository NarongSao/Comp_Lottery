Meteor.methods({
    lottery_resultEveningById: function(resultId){
        var data = Lottery.Collection.ResultEvening.findOne({resultId: resultId});
        if(data!=null){
            data.resultDate = moment(data.resultDate).format('YYYY-MM-DD');
        }
        return data;
    },
    lottery_resultEveningRemoveByResultId: function(resultId){
        Lottery.Collection.ResultEvening.remove({resultId: resultId});
    }
})