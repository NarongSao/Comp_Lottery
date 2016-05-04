/**
 * Declare template
 */
var indexTpl = Template.lottery_post,
    insertTpl = Template.lottery_postInsert,
    updateTpl = Template.lottery_postUpdate,
    showTpl = Template.lottery_postShow;


/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Post',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify(["post"], {size: 'sm'});
    createNewAlertify(["postShow"]);
});

indexTpl.onRendered(function () {
    //
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        alertify.post(fa("plus", "Post"), renderTemplate(insertTpl));
    },
    'click .js-update': function (e, t) {
        alertify.post(fa("pencil", "Post"), renderTemplate(updateTpl, this));
    },
    'click .js-remove': function (e, t) {
        var self = this;
        alertify.confirm(
            fa("remove", "Post"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Lottery.Collection.Post.remove(self._id, function (error) {
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
        alertify.postShow(fa("eye", "Post"), renderTemplate(showTpl, this));
    }
});




updateTpl.helpers({
    data: function () {
        var data =ReactiveMethod.call('getPostById', this._id);
        return data;
    }
});

/**
 * Show
 */

showTpl.helpers({
    data: function () {
        var data =ReactiveMethod.call('getPostById', this._id);
        return data;
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    // Customer
    lottery_postInsert: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    lottery_postUpdate: {
        onSuccess: function (formType, result) {
            alertify.agent().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});

