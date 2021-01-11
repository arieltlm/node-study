import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Input } from 'antd'

import './index.scss'

export interface ITitleWithEditorProps {
    iconClassName?: string
    value: string
    onChange?: Function
}

interface ITitleWithEditorState {
    enableEditing: boolean
}

class TitleWithEditor extends React.Component<ITitleWithEditorProps, ITitleWithEditorState> {
    static defaultProps = {
        iconClassName: 'fa fa-pencil-square-o',
        onChange: (): void => {
            console.log('onchange')
        }
    }

    static propTypes = {
        iconClassName: PropTypes.string,
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func
    }

    constructor(props) {
        super(props)
        this.state = {
            enableEditing: false
        }
    }

    inputRef = React.createRef<any>()

    onEditClick = (): void => {
        this.setState({ enableEditing: true }, () => {
            setTimeout(() => {
                // 选中输入框的文字
                this.inputRef.current.select()
            })
        })
    }

    triggerChange = (e): void => {
        this.setState({ enableEditing: false })
        const { value, onChange } = this.props
        const newValue = e.target.value
        if (newValue === value || !newValue) {
            // 当输入的值为空或者与之前的值一样的时候，不触发onChange事件
            return
        }
        onChange(e.target.value)
    }

    render(): React.ReactElement {
        const { iconClassName, value } = this.props
        const { enableEditing } = this.state
        return (
            <div className="title-with-editor-container">
                {!enableEditing ? (
                    <div className="show">
                        <div className="title">
                            <span>{value}</span>
                        </div>
                        <div className="change" role="presentation" onClick={this.onEditClick}>
                            <i className={iconClassName} aria-hidden="true" />
                        </div>
                    </div>
                ) : (
                    <div className="edit">
                        <Input
                            ref={this.inputRef}
                            defaultValue={value}
                            style={{ width: '100%' }}
                            onPressEnter={this.triggerChange}
                            onBlur={this.triggerChange}
                        />
                    </div>
                )}
            </div>
        )
    }
}

export default TitleWithEditor
