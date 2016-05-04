// List
Lottery.ListState = new ReactiveObj();

Lottery.List = {
    gender: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});
        list.push({label: 'Male', value: 'M'});
        list.push({label: 'Female', value: 'F'});

        return list;
    },
    address: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        // Set default for update
        var id = Lottery.ListState.get(['customer', 'addressId']);
        Lottery.Collection.Address.find(id)
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    customer: function () {
        var list = [];
        list.push({label: "(Select One)", value: ""});

        Lottery.Collection.Customer.find()
            .forEach(function (obj) {
                list.push({label: obj._id + ' : ' + obj.name, value: obj._id});
            });

        return list;
    },
    timeList: function () {
        var time = [];
        time.push({
            label: "E",
            value: "E"
        }, {
            label: "N",
            value: "N"
        }, {
            label: "T",
            value: "T"
        });

        return time;
    },
    postList: function () {

        var post = [];

        post.push({
            label: "4P",
            value: "4P"
        }, {
            label: "A",
            value: "A"
        }, {
            label: "B",
            value: "B"
        }, {
            label: "C",
            value: "C"
        }, {
            label: "D",
            value: "D"
        }, {
            label: "Lo",
            value: "Lo"
        });
        return post;
    },
    currencyList: function () {
        var currency = [];
        currency.push({
            label: "KHR",
            value: "KHR"
        }, {
            label: "USD",
            value: "USD"
        }, {
            label: "THB",
            value: "THB"
        })
        return currency;
    },
    agentList: function(){
        var list=[];
        list.push({label: "Select All",value: "All"});
        Lottery.Collection.Agent.find()
            .forEach(function(obj){
                list.push({label: obj.name,value: obj._id});
            })
        return list;
    },
};
