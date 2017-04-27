// Customer
Lottery.Collection.RemoveData.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.RemoveData.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.RemoveData.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
