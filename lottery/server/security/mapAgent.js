// Location
Lottery.Collection.MapAgent.permit(['insert', 'update', 'remove'])
    .lottery_ifSetting()
    .apply();
