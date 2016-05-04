// Order
Lottery.Collection.ResultNight.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.ResultNight.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.ResultNight.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
