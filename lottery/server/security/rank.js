// Customer
Lottery.Collection.Rank.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.Rank.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.Rank.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
