// Order
Lottery.Collection.Bet.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.Bet.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.Bet.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
