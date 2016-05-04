// Customer
Lottery.Collection.EndOfProcess.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.EndOfProcess.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.EndOfProcess.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
