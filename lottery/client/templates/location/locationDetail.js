// Declare template
var locationDetailTPL = Template.lottery_locationDetail;

// Items state
itemsState = new ReactiveList();

/**
 * JournalDetail
 */
locationDetailTPL.onRendered(function () {
    var date = $('[name="tmpDate"]');
    DateTimePicker.date(date);
});
locationDetailTPL.helpers({
    detail: function () {
        return itemsState.fetch();
    }
});

locationDetailTPL.events({
    'click .addItem': function (e, t) {
        var detail = {};
        var index = 0;

        detail.date = t.$('[name="tmpDate"]').val();
        detail.offValue2D = t.$('[name="tmpOffValue2D"]').val();
        detail.offValue3D = t.$('[name="tmpOffValue3D"]').val();
        detail.win2D = t.$('[name="tmpWin2D"]').val();
        detail.win3D = t.$('[name="tmpWin3D"]').val();
        detail.share = t.$('[name="tmpShare"]').val();
        detail.add = t.$('[name="tmpAdd"]').val();

        if (itemsState.length() > 0) {
            // Check exist
            var findExist = itemsState.get(detail.account);
            // Update exist
            if (!_.isUndefined(findExist)) {
                return false;
            } else { // Cal index to add new
                index = itemsState.last().index + 1;

                detail.index = index;
                detail.indexDate = 'detail.' + index + '.date';
                detail.indexOffValue2D = 'detail.' + index + '.offValue2D';
                detail.indexOffValue3D = 'detail.' + index + '.offValue3D';
                detail.indexWin2D = 'detail.' + index + '.win2D';
                detail.indexWin3D = 'detail.' + index + '.win3D';
                detail.indexShare = 'detail.' + index + '.share';
                detail.indexAdd = 'detail.' + index + '.add';

                itemsState.insert(detail.date, detail);
            }
        } else {
            detail.index = index;
            detail.indexDate = 'detail.' + index + '.date';
            detail.indexOffValue2D = 'detail.' + index + '.offValue2D';
            detail.indexOffValue3D = 'detail.' + index + '.offValue3D';
            detail.indexWin2D = 'detail.' + index + '.win2D';
            detail.indexWin3D = 'detail.' + index + '.win3D';
            detail.indexShare = 'detail.' + index + '.share';
            detail.indexAdd = 'detail.' + index + '.add';
            itemsState.insert(detail.date, detail);
        }

        t.$('[name="tmpDate"]').val('');
        t.$('[name="tmpOffValue2D"]').val('');
        t.$('[name="tmpOffValue3D"]').val('');
        t.$('[name="tmpWin2D"]').val('');
        t.$('[name="tmpWin3D"]').val('');
        t.$('[name="tmpShare"]').val('');
        t.$('[name="tmpAdd"]').val('');
    },
    'click .removeItem': function (e, t) {
        var self = this;
        itemsState.remove(self.date);
    }
});




