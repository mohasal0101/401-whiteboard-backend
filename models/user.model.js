'use strict';

const jwt = require( 'jsonwebtoken' );


module.exports = ( sequelize, DataTypes ) => {
const User = sequelize.define( 'User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    token: {
        type: DataTypes.VIRTUAL,
        get: function () {
            return jwt.sign( {username: this.username}, `${process.env.JWT_SECRET}`);
        },
        set ( tokenObj ) {
            return jwt.sign( tokenObj, `${process.env.JWT_SECRET}` );
        }
    },
    role: {
        type: DataTypes.STRING( 'user', 'admin' ),
        defaultValue: 'user',
        allowNull: false
    },
    capabilities: {
        type: DataTypes.VIRTUAL,
        get: function () {
            const ACL = {
                user: [ 'read' ],
                admin: [ 'read', 'create', 'update', 'delete' ]
            };
            return ACL[this.role];
        }
    }
} );

User.authenticateToken = token => {
    return jwt.verify( token, `${process.env.TOKEN_SECRET}`, ( err, decoded ) => {
        if ( err ) {
            return err;
        } else {
            return decoded;
        }
    } );
};


return User;
};