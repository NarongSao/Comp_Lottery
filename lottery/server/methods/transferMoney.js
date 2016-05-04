Meteor.methods({
    getTransferMoneyById: function (id) {
        var data = Lottery.Collection.TransferMoney.findOne(id);
        return data;
    },
    getTransferMoneyByAgentId: function (selector) {
        var data = Lottery.Collection.TransferMoney.aggregate([
            {
                $match: selector
            }, {
                $group: {
                    _id: {
                        transferFrom: "$transferFrom",
                        transferTo: "$transferTo"
                    }
                    ,
                    amount: {
                        $sum: "$amount"
                    }
                }
            }
        ]);
        var total = 0;
        if (data.len != 0) {
            data.forEach(function (obj) {
                total += obj.amount;
            })
        }
        return total;
    }
});