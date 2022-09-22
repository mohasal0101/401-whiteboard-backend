'use strict';

const jwt = require( 'jsonwebtoken' );


const User = ( sequelize, DataTypes ) => sequelize.define( 'User', {
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
        allowNull: false,
        isEmail: true,
        unique: true
    }
} );


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
        allowNull: false,
        isEmail: true,
        unique: true
    },
    token: {
        type: DataTypes.VIRTUAL,
        get: function () {
            return jwt.sign( {username: this.username}, process.env.SECRET);
        },
        set ( tokenObj ) {
            return jwt.sign( tokenObj, process.env.SECRET );
        }
    }
} );

User.authenticateToken = token => {
    return jwt.verify( token, process.env.SECRET, ( err, decoded ) => {
        if ( err ) {
            return err;
        } else {
            return decoded;
        }
    } );
};


return User;
};

module.exports = User;