const express = require('express')
const app = express()

const models = require('../models') // 模型对象

// models.User 
// models.Sequelize 访问静态化属性
// models.sequelize 访问其实例


app.get('/createUser',async(req,res) => {
    const {firstName} = req.query;

    // models.User.create 返回的是一个Promise对象
    const user = await models.User.create({
        firstName
    })

    console.log(user)
    res.json({
        message:'创建用户成功',
        user
    })

})

app.get('/userList',async(req,res)=>{
    const list = await models.User.findAll();

    res.json({
        list
    })
})


app.get('/detail/:id',async (req,res)=>{
    const {id} = req.params

    const user = await models.User.findOne({
        where:{
            id
        }
    })

    res.json({
        user
    })
})


app.listen(3000,()=> {
    console.log('服务启动成功')
})