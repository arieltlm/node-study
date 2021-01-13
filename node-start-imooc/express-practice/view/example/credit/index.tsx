import React from 'react'
import { Modal } from 'antd'
import {IListItem} from '../lists'

interface ICreditProps {
    editRowData?: IListItem | {}
    visible:boolean
    handleCancel:()=> void
}
 

const Credit: React.FC<ICreditProps> = ({
    editRowData,
    visible,
    handleCancel
}) => {
    console.log(editRowData)
    return <Modal 
        title="新建修改"
        visible={visible}
        onCancel={handleCancel}
        >
        新建修改
    </Modal>
}

export default Credit
