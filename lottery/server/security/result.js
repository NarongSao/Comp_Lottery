// Order
Lottery.Collection.Result.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.Result.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.Result.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
