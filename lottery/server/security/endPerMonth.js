// Customer
Lottery.Collection.EndPerMonth.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.EndPerMonth.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.EndPerMonth.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
