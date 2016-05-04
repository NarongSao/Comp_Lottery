/**
 * Declare template
 */
var indexTpl = Template.lottery_location,
    insertTpl = Template.lottery_locationInsert,
    updateTpl = Template.lottery_locationUpdate,
    showTpl = Template.lottery_locationShow;

/**
 * Index
 */
indexTpl.onCreated(function () {
    // SEO
    SEO.set({
        title: 'Location',
        description: 'Description for this page'
    });

    // Create new  alertify
    createNewAlertify("location"/*, {transition: 'zoom'}*/);
});

indexTpl.helpers({
    selector: function () {
        return {};
    },
    tabularClass: function () {
        var self = this;
        var cssClass = 'table table-striped table-bordered table-condensed table-hover';
        if (self.cssClass) {
            cssClass += '-' + this.cssClass;
        }

        return cssClass;
    }
});

indexTpl.events({
    'click .js-insert': function (e, t) {
        itemsState.clear();
        alertify.location(fa("plus", "Location"), renderTemplate(insertTpl)).maximize();
    },
    'click .js-update': function (e, t) {
        itemsState.clear();
        var self = this;

        Meteor.call('getLocationById', self._id, function (err, data) {
                _.each(data.detail, function (obj, index) {
                    var detail={};
                    detail.indexDate= 'detail.' + index + '.date';
                    detail.indexOffValue2D= 'detail.' + index + '.offValue2D';
                    detail.indexOffValue3D= 'detail.' + index + '.offValue3D';
                    detail.indexWin2D= 'detail.' + index + '.win2D';
                    detail.indexWin3D= 'detail.' + index + '.win3D';
                    detail.indexShare= 'detail.' + index + '.share';
                    detail.indexAdd= 'detail.' + index + '.add';

                    detail.date =  obj.date
                    detail.offValue2D= obj.offValue2D;
                    detail.offValue3D=  obj.offValue3D;
                    detail.win2D= obj.win2D;
                    detail.win3D= obj.win3D;
                    detail.share= obj.share;
                    detail.add= obj.add;

                    itemsState.insert(detail.date, detail);
                });
            alertify.location(fa("pencil", "Location"), renderTemplate(updateTpl, self)).maximize();

        })


    },
    'click .js-remove': function (e, t) {
        var self = this;

        alertify.confirm(
            fa("remove", "Location"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Lottery.Collection.Location.remove(self._id, function (error) {
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
        alertify.location(fa("eye", "Location"), renderTemplate(showTpl, this));
    }
});

/**
 * Show
 */
showTpl.onCreated(function () {
    this.subLocation = this.subscribe('lottery_locationById', this.data._id);
});

showTpl.helpers({
    data: function () {
        return ReactiveMethod.call('getLocationById', this._id);
    }
});

/**
 * Hook
 */
AutoForm.hooks({
    lottery_locationInsert: {
        onSuccess: function (formType, result) {
            alertify.success('Success');
            alertify.location().close();
            itemsState.clear();
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    },
    lottery_locationUpdate: {
        onSuccess: function (formType, result) {
            itemsState.clear();
            alertify.location().close();
            alertify.success('Success');
        },
        onError: function (formType, error) {
            alertify.error(error.message);
        }
    }
});
