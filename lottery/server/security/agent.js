// Customer
Lottery.Collection.Agent.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.Agent.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.Agent.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
