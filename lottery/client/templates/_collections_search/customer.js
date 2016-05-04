///**
// * Declare template
// */
//var indexTpl = Template.lottery_customerSearch,
//    listTpl = Template.lottery_customerSearchList,
//
//    customerAddonTpl = Template.lottery_addressInsert;
//
///**
// * Index
// */
//indexTpl.onCreated(function () {
//    createNewAlertify("agent");
//});
//
//indexTpl.events({
//    'click .insert': function (e, t) {
//        alertify.agent(fa("plus", "Customer"), renderTemplate(customerAddonTpl))
//            .maximize();
//    },
//    'change .filter-select': function (e) {
//        var instance = EasySearch.getComponentInstance({
//            index: 'lottery_customerSearch'
//        });
//
//        EasySearch.changeProperty('lottery_customerSearch', 'filteredGender', $(e.target).val());
//        EasySearch.changeLimit('lottery_customerSearch', 10);
//
//        instance.paginate(1);
//        instance.triggerSearch();
//    },
//    'change .sort-select': function (e) {
//        var instance = EasySearch.getComponentInstance({
//            index: 'lottery_customerSearch'
//        });
//
//        EasySearch.changeProperty('lottery_customerSearch', 'sortBy', $(e.target).val());
//        EasySearch.changeLimit('lottery_customerSearch', 10);
//
//        instance.paginate(1);
//        instance.triggerSearch();
//    }
//});
//
///**
// * List
// */
//listTpl.helpers({
//    data: function () {
//        var self = this;
//
//        self.photoUrl = null;
//
//        if (!_.isUndefined(self.photo)) {
//            self.photoUrl = Files.findOne(self.photo).url();
//        }
//
//        self.dobVal = moment(self.dob).format('DD-MM-YYYY');
//
//        return self;
//    }
//});
