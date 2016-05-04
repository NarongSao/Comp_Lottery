Meteor.methods({
    lottery_agentById: function (id) {
        var data = Lottery.Collection.Agent.findOne(id);
        data.photoUrl = null;
        data.dob = moment(data.dob).format('YYYY-MM-DD');
        if (!_.isUndefined(data.photo)) {
            data.photoUrl = Files.findOne(data.photo)
                .url();
        }
        return data;
    },lottery_agent: function () {
        var data = Lottery.Collection.Agent.find().fetch();
        var dataFinal=[];
        if(data.length!=0){
            data.forEach(function (obj) {
                dataFinal.push({
                    id: obj._id,
                    name: obj.name
                })
            })
        }
        return dataFinal;
    }
});