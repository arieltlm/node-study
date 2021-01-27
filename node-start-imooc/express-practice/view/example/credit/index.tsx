import React from 'react'
import moment from 'moment'
import { Modal, Form, Input, DatePicker, message } from 'antd'
import { IListItem } from '../lists'

const { TextArea } = Input
interface ICreditProps {
    editRowData: IListItem
    visible: boolean
    handleCancel: () => void
    handleRefresh: () => void
}

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 }
    }
}

const Credit: React.FC<ICreditProps> = ({ editRowData, visible, handleCancel, handleRefresh }) => {
    console.log(editRowData, 'editRowData')

    const [form] = Form.useForm()

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log(values)
                const { deadline: originDeadline, content } = values
                const deadline = originDeadline.format('YYYY-MM-DD')
                if (editRowData.id) {
                    // 编辑
                    fetch('/api/update', {
                        method: 'POST',
                        body: JSON.stringify({ ...editRowData, deadline, content })
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.statusCode === 200) {
                                message.success(res.message)
                                handleCancel()
                                handleRefresh()
                            }
                        })
                } else {
                    // 新增
                    fetch('/api/create', {
                        method: 'POST',
                        body: JSON.stringify({ deadline, content })
                    })
                        .then(res => res.json())
                        .then(res => {
                            if (res.statusCode === 200) {
                                message.success(res.message)
                                handleCancel()
                                handleRefresh()
                            }
                        })
                }
            })
            .catch(errorInfo => {
                console.log('err', errorInfo)
            })
    }

    return (
        <Modal title="新建修改" visible={visible} onCancel={handleCancel} onOk={handleOk}>
            <Form {...formItemLayout} form={form}>
                <Form.Item
                    name="deadline"
                    label="截止日期"
                    rules={[{ required: true, message: '请选择日期' }]}
                    initialValue={editRowData.deadline ? moment(editRowData.deadline, 'YYYY-MM-DD') : ''}
                >
                    <DatePicker style={{ width: '100%' }} placeholder="请选择截止日期" format="YYYY-MM-DD" />
                </Form.Item>
                <Form.Item
                    name="content"
                    label="内容"
                    rules={[{ required: true, message: '请填写内容' }]}
                    initialValue={editRowData.content}
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default Credit
