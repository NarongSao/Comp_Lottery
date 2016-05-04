// Location
Lottery.Collection.Location.permit(['insert', 'update', 'remove'])
    .lottery_ifSetting()
    .apply();
