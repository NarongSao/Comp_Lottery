// Declare template
var mapAgentDetailTPL = Template.lottery_mapAgentDetail;

// Items state
itemsState = new ReactiveList();

/**
 * mapAgentDetail
 */

mapAgentDetailTPL.onRendered(function () {
    $('[name="tmpAgent"]').select2();
});
mapAgentDetailTPL.helpers({
    detail: function () {
        return itemsState.fetch();
    },
    agentList: function () {
        return ReactiveMethod.call('lottery_agent');
    }
});

mapAgentDetailTPL.events({
    'click .addItem': function (e, t) {
        var detail = {};
        var index = 0;

        detail.agent = t.$('[name="tmpAgent"]').val();
        if (itemsState.length() > 0) {
            // Check exist
            var findExist = itemsState.get(detail.account);
            // Update exist
            if (!_.isUndefined(findExist)) {
                return false;
            } else { // Cal index to add new
                index = itemsState.last().index + 1;

                detail.index = index;
                detail.indexAgent= 'detail.' + index + '.agent';
                itemsState.insert(detail.agent, detail);
            }
        } else {
            detail.index = index;
            detail.indexAgent= 'detail.' + index + '.agent';
            itemsState.insert(detail.agent, detail);
        }

        t.$('[name="tmpAgent"]').val('');
    },
    'click .removeItem': function (e, t) {
        var self = this;
        itemsState.remove(self.agent);
    }
});




