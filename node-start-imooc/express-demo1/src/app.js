const express = require('express')

// 是一个express实例
const app = express()
const port = 3000


// 路由切割
const memberRouter = require('./member.router')
const skuRouter = require('./sku.router')

const routers = require('./route')

app.use('/member',memberRouter) // /member/list
app.use('/sku',skuRouter) // /sku/list
app.use(routers)


// 发出疑问，use和get什么区别呢？

// 这句会匹配所有
/* app.use((req,res) => {
    res.json({ 
        name:'张三'
    })
}) */

app.get('/',(req,res) => {
    res.send("Hello world!")
})

// 以上两句，谁在前响应谁，并不是覆盖模式，postman上已验证

// 传参数
// 127.0.0.1:3000/name/21
app.get('/name/:age',(req,res) =>{
    const {age} = req.params
    res.json({
        name:'Tom',
        age
    })
})

app.post('/name',(req,res)=>{
    res.send('Tom post')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})