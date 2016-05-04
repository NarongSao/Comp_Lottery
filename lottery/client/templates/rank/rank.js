/**
 * Declare template
 */
var indexTpl = Template.lottery_rank,
    insertTpl = Template.lottery_rankInsert,
    updateTpl = Template.lottery_rankUpdate,
    showTpl = Template.lottery_rankShow;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Rank',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["rank"], {size: 'sm'});
    createNewAlertify(["rankShow"]);
});

indexTpl.onRendered(function () {
    //
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.rank(fa("plus", "Rank"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.rank(fa("pencil", "Rank"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;
        alertify.confirm(
            fa("remove", "Rank"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Lottery.Collection.Rank.remove(self._id, function (error) {
                    if (error) {
                        alertify.error(error.message);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
    },
    'click .js-show': function (e, t) {
        alertify.rankShow(fa("eye", "Post"), renderTemplate(showTpl, this));
    }
});




updateTpl.helpers({
    data: function () {
        var data =ReactiveMethod.call('getRankById', this._id);
        return data;
    }
});


/**
 * Show
 */

showTpl.helpers({
    data: function () {
        var data =ReactiveMethod.call('getRankById', this._id);
        return data;
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    lottery_rankInsert: {
        onSuccess: function (formType, result) {
            alertify.rank().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    lottery_rankUpdate: {
        onSuccess: function (formType, result) {
            alertify.rank().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

