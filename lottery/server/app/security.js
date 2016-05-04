/**
 * Setting
 */
Security.defineMethod("lottery_ifSetting", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['setting'], 'Lottery');
    }
});

/**
 * Data Entry
 */
Security.defineMethod("lottery_ifDataInsert", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['data-insert'], 'Lottery');
    }
});

Security.defineMethod("lottery_ifDataUpdate", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['data-update'], 'Lottery');
    }
});

Security.defineMethod("lottery_ifDataRemove", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['data-remove'], 'Lottery');
    }
});

/**
 * Report
 */
Security.defineMethod("lottery_ifReport", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['report'], 'Lottery');
    }
});
