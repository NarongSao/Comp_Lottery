var indexTpl = Template.lottery_mapAgent,
    insertTpl = Template.lottery_mapAgentInsert,
    updateTpl = Template.lottery_mapAgentUpdate;

/**
 * Index
 */

indexTpl.onRendered(function () {
    /* Create new alertify */
    createNewAlertify("mapAgent");
    // SEO
    SEO.set({
        title: 'Map Agent',
        description: 'Description for this page'
    });
});

indexTpl.events({
    'click .insert': function (e, t) {
        itemsState.clear();
        alertify.mapAgent(fa("pencil", "Map Agent"), renderTemplate(insertTpl));
    }, 'click .update': function (e, t) {

        itemsState.clear();
        var self = this;

        _.each(self.detail, function (detail, index) {
            detail.indexAgent = 'detail.' + index + '.agent';
            itemsState.insert(detail.agent, detail);
        });

        alertify.mapAgent(fa("pencil", "Map Agent"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Location"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Lottery.Collection.MapAgent.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );

    }
});

/**
 * Hook
 */
AutoForm.hooks({
    lottery_mapAgentInsert: {
        onSuccess: function (formType, result) {
            alertify.mapAgent().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }, lottery_mapAgentUpdate: {
        onSuccess: function (formType, result) {
            alertify.mapAgent().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
