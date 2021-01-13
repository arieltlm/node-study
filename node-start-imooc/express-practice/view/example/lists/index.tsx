import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import Credit from '../credit'

interface IListState {
    pageNo: number
    pageSize: number
    status: number | string
}

export interface IListItem {
    id: number
    deadline: string
    content: string
    status: string
}


const datas = [
    {
        id: 1,
        deadline: '2010-12-22',
        content: '111111',
        status: '1'
    },
    {
        id: 2,
        deadline: '2010-12-22',
        content: '111111',
        status: '1'
    }
]

const Lists: React.FC<IListState> = () => {
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [status, setStatus] = useState('')
    const [dataSource,setDataSource] = useState<IListItem[]>([])

    const [creditVis,setCreditVis] = useState(false)
    const [editRowData,setEditRowData] = useState<IListItem | {}>({})

    const getList = (pageNop: number, PageSizep: number, statusp: string) => {
        fetch(`/api/lists?pageNo=${pageNop}&pageSize=${PageSizep}&status=${statusp}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
            })
    }

    useEffect(() => {
        getList(pageNo, pageSize, status)
    }, [pageNo, pageSize, status])

    const handleNew = (): void => {
        setCreditVis(true)
    }
    const handleEdit = (record: IListItem): void => {
        setCreditVis(true)
        setEditRowData(record)
    }
    const hanldeCloseModal = ():void => {
        setCreditVis(false)
    }

    const handleDelete = (id: number): void => {
        console.log(id)
    }

    const handleChangeStatus = (id: number, status: string): void => {
        console.log(id)
        setStatus(status)
    }

    const columns = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: '截止日期',
            dataIndex: 'deadline'
        },
        {
            title: '内容',
            dataIndex: 'content'
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: (text: string) => (text === '1' ? '待办' : '完成')
        },
        {
            title: '操作',
            dataIndex: 'operation',
            render: (text: any, record: IListItem) => {
                return (
                    <>
                        <Button type="link" onClick={() => handleEdit(record)}>
                            编辑
                        </Button>
                        <Button type="link" onClick={() => handleChangeStatus(record.id, record.status)}>
                            {record.status === '1' ? '完成' : '待办'}
                        </Button>
                        <Button type="link" onClick={() => handleDelete(record.id)}>
                            删除
                        </Button>
                    </>
                )
            }
        }
    ]

    const hanldeChangePage = (pagination: any) => {
        const { current, pageSize: pageSizeParams } = pagination
        setPageNo(current)
        setPageSize(pageSizeParams)
    }

    return (
        <div>
            <h2>增删改查</h2>
            <Button type="primary" onClick={handleNew}>新增任务</Button>
            <Table
                dataSource={datas}
                columns={columns}
                rowKey="id"
                pagination={{
                    current: pageNo,
                    pageSize,
                    showSizeChanger: true,
                    size: 'small'
                }}
                onChange={hanldeChangePage}
            />
            {creditVis && <Credit 
                editRowData={editRowData} 
                visible={creditVis}
                handleCancel={hanldeCloseModal}
            />}
        </div>
    )
}

export default Lists
