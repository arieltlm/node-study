import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import './index.scss'
import Root from './example/root'

ReactDOM.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>,
    document.getElementById('root')
)
