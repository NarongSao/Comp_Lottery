// Customer
Lottery.Collection.TransferMoney.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.TransferMoney.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.TransferMoney.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
