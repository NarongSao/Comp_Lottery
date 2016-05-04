# Lottery System

## Schema

- ~~Location~~
```js
Lottery.Schema.Location = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    offValue: {
        type: Number,
        decimal: true,
        label: 'Off value (%)'
    }
});
```

- ~~Post~~
```js
Lottery.Schema.Post = new SimpleSchema({
    postName: {
        type: String,
        label: "Post name"
    },
    payment2D: {
        type: Number,
        label: '2D payment'
    },
    payment3D: {
        type: Number,
        label: "3D payment"
    }
});
```

- ~~Agent~~
```js
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
```

- Bet
```js
Lottery.Schema.Bet = new SimpleSchema({
    betDate: {
        type: Date,
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    page: {
        type: Number,
        label: 'Page'
    },
    line: {
        type: Number,
        label: 'Line'
    },
    items: {
        type: [Object]
    },
    'items.$.number': {
        type: String
    },
    'items.$.amount': {
        type: Number,
        decimal: true
    },
    'items.$.post': {
        type: String
    },
    'items.$.time': {
        type: String
    },
    'items.$.betDetailId':{
        type: String
    },
    total: {
        type: Number,
        decimal: true
    },
        agentId: {
        type: String,
        label: 'Agent'
    },
    branchId: {
        type: String,
        label: "Branch"
    }
});
```

- BetDetail
```js
Lottery.Schema.BetDetail = new SimpleSchema({
    betDetailDate: {
        type: Date,
        defaultValue: function () {
            return moment().format('YYYY-MM-DD');
        }
    },
    page: {
        type: Number,
        label: 'Page'
    },
    line: {
        type: Number,
        label: 'Line'
    },
    items: {
        type: [Object]
    },
    'items.$.number': {
        type: String
    },
    'items.$.amount': {
        type: Number,
        decimal: true
    },
    'items.$.post': {
        type: String
    },
    'items.$.time': {
        type: String
    },
    total: {
        type: Number,
        decimal: true
    },
    agentId: {
        type: String
        label: 'Agent'
    },
    branchId: {
        type: String,
        label: "Branch"
    }
});
```

- Result
```js
Lottery.Schema.Result = new SimpleSchema({
    resultDate: {
        type: Date,
        label: "Result Date"
    },
    time: {
        type: String,
        label: "Time"
    },
    items: {
        type: [Object]
    },
    'items.$.postName': {
        type: String,
        label: "Post name"
    },
    'items.$.result2D': {
         type: Number,
        label: '2D Result'
    },
    'items.$.result3D': {
        type: Number,
        label: '3D Result'
    }
});
```

## Dev
- Form
    - ~~Post~~
    - ~~Location~~
    - ~~Agent~~
    - Bet
    - Result
- Report
