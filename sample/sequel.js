const Sequelize = require('sequelize');

const sequelize = new Sequelize('sequel','root','pass@123',{
    dialect:'mysql'
})
//creating a user model
const User = sequelize.define('users',{

username:{
type:Sequelize.DataTypes.STRING,
allowNull:false,
},
password:{
type:Sequelize.DataTypes.STRING,
allowNull:false,
},


age : {

    type:Sequelize.DataTypes.INTEGER,
    allowNull:false,
},
email:{
    type:Sequelize.DataTypes.STRING,
    allowNull:false,
    unique:true
}
},{timestamps:false})


User.create({ username: "mario", password: "-=", age: 11, email: "mario@gmail.com" })
  .then((user) => {
    console.log('User created:', user.get());
  })
  .catch((err) => {
    console.error('Error creating user:', err);
  });
//syncing changes with database
User.sync({alter:true}).then((data)=>{
console.log(data)}).catch((err)=>{console.log(err)});
