const express = require('express')

const app = express()

const memberRouter = require('../router/member.router')

function log_middleware(req,res,next){
    console.log('请求来了')
    next()
}
// app级别的使用
// 需要放在最顶层
app.use(log_middleware)


app.use('/member',memberRouter) // /member/list

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

/*============异常处理=================================== */
app.get('/demo-error',(req, res)=>{
    throw new Error('测试异常功能')
})

function demo_middleware(req, res,next){
    try{
        // mysql操作
    } catch (error){
        next(error) // 此处会被异常捕获
    }

    // Promise.then().catch(next)
}

// 异常处理一定是收口的；统一放在最后面

// 异常处理
function error_handler_middleware(err,req, res, next){
    if(err){
        const {message} = err
        res.status(500)
        .json({
            message:`${message}` || '服务器异常'
        })
    } else {

    }
}

// 处理404异常
// express中不认为404是一个异常，不会被异常捕获
function not_found_handler(req,res,next){
    res.json({
        message:'api不存在'
    })
}



app.use(not_found_handler)
app.use(error_handler_middleware)

app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`)
})