import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import locale from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'

import './index.scss'
import Root from './example/root'

ReactDOM.render(
    <ConfigProvider locale={locale}>
        <BrowserRouter>
            <Root />
        </BrowserRouter>
    </ConfigProvider>,
    document.getElementById('root')
)
