'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    deadline: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    // 这是其他模型参数
    sequelize, // 我们需要传递连接实例
    modelName: 'Todo', // 我们需要选择模型名称
    timestamps:false // 不需要creatAt和updateAt的话，需设置这个参数
  });
  return Todo;
};