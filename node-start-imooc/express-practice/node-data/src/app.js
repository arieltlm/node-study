const express = require('express')
const app = express()

const bodyParser = require('body-parser')

// app.use(bodyParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


const models = require('../db/models')
// const { sequelize, Sequelize } = require('../db/models')
// console.log('models=====',models)

// {
//     [model:Todo],
//     sequelize,
//     Sequelize
// }

// 新增
app.post('/api/create', async (req, res,next) => {
    try{
        const { name,deadline, content,status = '1' } = req.body

        // 数据持久化到数据库
        const todo = await models.Todo.create({
            name,
            deadline,
            content,
            status
        })

        res.json({
            message: '新增成功',
            statusCode:200,
            data: todo
        })
    } catch (error){
        next(error)
    }

})

// 修改
app.put('/api/update', async (req, res, next) => {
    try{
        const { name, dedaline, content, id } = req.body

        const todo = await models.Todo.update({
            name, 
            dedaline, 
            content, 
        },{
            where:{
                id
            }
        })

        res.json({
            message: '修改成功',
            statusCode:200,
            data: todo
        })
    } catch (error) {
        next(error)
    }
    
})

// 删除
app.delete('/api/delete/:id', async (req, res, next) => {
    try{
        const { id } = req.params

        await models.Todo.destroy({
            where:{
                id
            }
        })
        res.json({
            statusCode: 200,
            message: '删除成功'
        })
    } catch (error) {
        next(error)
    }
    
})

// 修改状态
app.put('/api/update/status/:id', async (req, res, next) => {
    try{
        const { id } = req.params
        const {status} = req.query

        const item = await models.Todo.update({
            status
        },{
            where:{
                id
            }
        })
        
        res.json({
            data:item,
            statusCode: 200,
            message: '修改状态成功'
        })
    } catch (error) {
        next(error)
    }
     
})

// 查询列表
app.get('/api/lists', async (req, res, next) => {
    try{
        const lists = await models.Todo.findAll()
        res.json({
            message:'查询成功',
            statusCode:200,
            data: lists
        })
    } catch (error){
        next(error)
    }

})

// 处理服务器错误
app.use((err, req, res, next) => {
    if (err) {
        const { message } = err
        res.status(500).json({
            message
        })
    }
})

app.listen(3000, () => {
    console.log('服务启动成功')
})
