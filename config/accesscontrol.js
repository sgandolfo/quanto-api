const AccessControl = require('accesscontrol');

let grantsObject = {
    admin: {
        iventory: {
            'read:any': ['*'],
        },
        stockmovement: {
            'create:any': ['*'],
            'read:any': ['*']
        },
        article: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*'],
            'delete:any': ['*']
        },
        user: {
            'create:any': ['*'],
            'read:any': ['*', '!password'],
            'update:any': ['*', '!password'],
            'delete:any': ['*'],
            'read:own': ['*'],
            'update:own': ['*']
        }
    },
    user: {
        iventory: {
            'read:any': ['*'],
        },
        stockmovement: {
            'create:any': ['*'],
            'read:any': ['*'],
        },
        article: {
            'create:any': ['*'],
            'read:any': ['*'],
            'update:any': ['*']
        },
        user: {
            'read:own': ['*'],
            'update:own': ['*']
        }
    }
};

const ac = new AccessControl(grantsObject);

module.exports = ac;