// Collection
Lottery.Collection.Agent = new Mongo.Collection("lottery_agent");

// Schema
Lottery.Schema.Agent = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    gender: {
        type: String,
        label: "Gender",
        autoform: {
            type: "select2",
            options: function () {
                return Lottery.List.gender();
            },
            afFieldInput: {
                select2Options: {
                    theme: "bootstrap"
                }
            }
        }
    },
    telephone: {
        type: String,
        label: "Telephone"
    },
    email: {
        type: String,
        label: "Email",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    },
    locationId: {
        type: String,
        label: "Location"
    },
    photo: {
        type: String,
        optional: true,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'Files',
                accept: 'image/*'
            }
        }
    },
    branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Lottery.Collection.Agent.attachSchema(Lottery.Schema.Agent);

// Attach soft remove
//Lottery.Collection.Customer.attachBehaviour('softRemovable');