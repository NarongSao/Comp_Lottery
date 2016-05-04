// Customer
Lottery.Collection.Post.permit(['insert'])
    .lottery_ifDataInsert()
    .apply();
Lottery.Collection.Post.permit(['update'])
    .lottery_ifDataUpdate()
    .apply();
Lottery.Collection.Post.permit(['remove'])
    .lottery_ifDataRemove()
    .apply();
