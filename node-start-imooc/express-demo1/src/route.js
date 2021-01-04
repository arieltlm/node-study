/**
 * 路由设置
 */
const express = require('express')

const app = express()

// app -> Application -> web 服务实例

// 1.通过请求的方法类型 get/post/put/delete
app.get('/demo', (req, res) => {
    res.json({
        message:"hello express route from get demo"
    })
})

app.post('/demo', (req, res) => {
    // req 请求对象
    // res 服务响应对象
    res.json({
        message:"hello express route from post demo" 
    })
})

// 2.通过uri
app.get('/user/byname',(req,res)=>{
    const {name} = req.query
    res.json({
        name
    })
})

app.get('/user/byid', (req,res)=>{
    const {id} = req.query
    res.json({
        id
    })
})

/*=========app.all====== */
// 可以匹配到所有
// 实际场景--日志
/* app.all('*', (req,res)=>{
    res.json({
        message:'demo',
        method:req.method,
        url:req.path
    })
}) */
// 不论是get，post,delete,put的请求方法，都可以匹配/demo
/* app.all('/demo', (req,res)=>{
    res.json({
        message:'demo',
        method:req.method,
        url:req.path
    })
}) */

/*=======app.use======*/
// 主要是中间件的使用，路由也算一种特殊的中间件，所以可以用于路由
// 平时使用时尽量不要是要app.use来做路由
app.use('/demo',(req,res) => {
    res.json({
        message:'111',
        method:req.method
    })
})



app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})