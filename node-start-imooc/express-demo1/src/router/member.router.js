const express = require('express')

// 做路由的切割
const router = express.Router()


// 路由层使用中间件——第一种场景
router.use(function(req, res,next){
    console.log('log from router')
    next() 
})

function valid_login_middleware(req, res, next){
    const {name,password} = req.query
    if(!name || !password){
        res.json({
            message:'参数校验失败'
        })
    } else {
        req.formData = {
            name,
            password
        }
        next()
    }
}

// router.get('/list',(req,res) => {
//     res.json({
//         list:[
//             {
//                 id:1,
//                 name:'张三'
//             }
//         ]
//     })
// })

// 路由内部使用中间件——第二种场景
router.get('/login',[valid_login_middleware/**middleware */],(req,res) => {
    const {formData} = req
    res.json({
        message:'from router demo',
        formData
    })
})

// 还可以使用router.all，router.use做进一步路由切割

module.exports = router