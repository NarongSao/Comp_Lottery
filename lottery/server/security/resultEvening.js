// Order
Lottery.Collection.ResultEvening.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.ResultEvening.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.ResultEvening.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
