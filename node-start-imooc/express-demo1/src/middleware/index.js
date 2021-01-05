const express = require('express')

const app = express()

function log_middleware(req,res,next){
    console.log('请求来了')
    next()
}
// app级别的使用
app.use(log_middleware)

// 加载一个static的中间件
// 启动层为package,即看相对于它的相对路径
// http://expressjs.com/en/5x/api.html#express.static
app.use(express.static('static',{
    extensions:['html', 'htm']
}))

/* function valid_name_middleware(req,res,next){
    const {name} = req.query
    if(!name || name.length){
        res.json(({
            message:'缺少name参数'
        }))
    } else {
        next()
    }
}

app.all('*',valid_name_middleware) */

module.exports = app