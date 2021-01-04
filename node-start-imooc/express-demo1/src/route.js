/**
 * 路由设置
 */
const express = require('express')

const app = express()


// 可以匹配到所有
/* app.all('*', (req,res)=>{
    res.json({
        message:'demo',
        method:req.method,
        url:req.path
    })
}) */
app.all('/demo', (req,res)=>{
    res.json({
        message:'demo',
        method:req.method,
        url:req.path
    })
})

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



app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})