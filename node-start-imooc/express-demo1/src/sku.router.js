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

module.export = router