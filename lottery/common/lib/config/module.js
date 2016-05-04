// Module
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Lottery = {
    name: 'Lottery System',
    version: '0.0.1',
    summary: 'Lottery Management System is ...',
    roles: [
        'setting',
        'data-insert',
        'data-update',
        'data-remove',
        'report'
    ],
    dump: {
        setting: [
            'lottery_location'
        ],
        data: [
            'lottery_customer',
            'lottery_order'
        ]
    }
};
