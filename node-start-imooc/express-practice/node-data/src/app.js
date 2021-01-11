const express = require('express')
const app = express()


// 新增
app.post('/create',async(req,res) => {
    const {name,deadlin,content} = req.body
    res.json({
        message:"新增成功",

    })
})

// 修改
app.put('/modify/:id',async(req,res)=> {
    const {id} = req.params
    res.json({
        message:'修改成功'
    })
})

// 删除
app.delete('/delete/:id',async(req,res)=> {
    const {id} = req.params
    res.json({
        message:'删除成功'
    })
})

// 修改状态
app.put('/modify/status/:id',async(req,res)=> {
    const {id} = req.params
    res.json({
        message:"修改状态成功"
    })
})

// 查询列表
app.get('/list',async(req,res) => {
    res.json({
        list:[]
    })
})


// 处理服务器错误
app.use((err,req,res,next)=> {
    if(err){
        const {message} = err
        res.status(500).json({
            message
        })
    }
})

app.listen(3000,() => {
    console.log('服务启动成功')
})

