const express = require('express')

// 做路由的切割
const router = express.Router()

router.get('/list',(req,res) => {
    res.json({
        list:[
            {
                id:1,
                name:'张三'
            }
        ]
    })
})

// 还可以使用router.all，router.use做进一步路由切割

module.exports = router