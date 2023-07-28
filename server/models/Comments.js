module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define("Comments", {
      commentBody: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING(),
        allowNull: false
      }
    });
  
    return Comments;
  };
  