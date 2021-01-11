import * as React from 'react'
import { TitleWithEditor } from '../../../src'

import './index.scss'

class BasicExample extends React.Component<{}, { title: string }> {
    constructor(props) {
        super(props)

        this.state = {
            title: 'default'
        }

        this.onTitleChange = this.onTitleChange.bind(this)
    }

    onTitleChange(e: string): void {
        this.setState({
            title: e
        })
    }

    render(): React.ReactNode {
        const { title } = this.state
        return (
            <div className="basic-container">
                <p>Placeholder for description</p>
                <div className="demo-box">
                    <TitleWithEditor value={title} onChange={this.onTitleChange} />
                </div>
                <div className="result-box">
                    <span>当前的值：{title}</span>
                </div>
            </div>
        )
    }
}

export default BasicExample
