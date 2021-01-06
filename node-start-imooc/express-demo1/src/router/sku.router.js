const express = require('express')

// 做路由的切割
const router = express.Router()

router.get('/list',(req,res) => {
    res.json({
        list:[
            {
                id:1,
                price:111,
                name:'鞋子'
            }
        ]
    })
})

module.exports = router