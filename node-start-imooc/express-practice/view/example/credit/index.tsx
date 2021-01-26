import React from 'react'
import { Modal, Form, Input, DatePicker } from 'antd'
import { IListItem } from '../lists'

const { TextArea } = Input
interface ICreditProps {
    editRowData: IListItem
    visible: boolean
    handleCancel: () => void
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

const Credit: React.FC<ICreditProps> = ({ editRowData, visible, handleCancel }) => {
    console.log(editRowData)

    const [form] = Form.useForm()

    const handleOk = () => {
        form.validateFields()
            .then(values => {
                console.log(values)
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
                    initialValue={editRowData.deadline}
                >
                    <DatePicker style={{ width: '100%' }} placeholder="请选择截止日期" />
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
