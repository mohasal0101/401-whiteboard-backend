'use strict';
const jwt= require('jsonwebtoken');

module.exports=(sequleize, DataTypes)=>{
 const User=sequleize.define("User",{
    username:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false
    },
    token:{
        type:DataTypes.VIRTUAL,
        get:function(){
            return jwt.sign({
                username:this.username
            },process.env.JWT_SECRET)
        },
        set(token){
            return jwt.sign(token, process.env.JWT_SECRET);
        },
    },
});

User.authenticateToken=token=>{
    return jwt.verify(token, process.env.JWT_SECRET,(error, decoded)=>{
        if(error)return error;
        else return decoded;
    });
    
}
return User;
}