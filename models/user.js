module.exports = function(sequelize, DataTypes) {
  return sequelize.define("User", {
    username: DataTypes.STRING
  })
sequelize.query("SELECT * FROM User").success(function(myTableRows) {
  console.log("hi"+ myTableRows)
})

}
