import React, { useState, useEffect } from 'react'
import { Table, Button, message, Modal } from 'antd'
import Credit from '../credit'

interface IListState {
    pageNo: number
    pageSize: number
    status: number | string
}

export interface IListItem {
    id?: number
    name?: string
    deadline?: string
    content?: string
    status?: string
}

const datas = [
    {
        id: 1,
        name: '111',
        deadline: '2010-12-22',
        content: '111111',
        status: '1'
    },
    {
        id: 2,
        name: '111',
        deadline: '2010-12-22',
        content: '111111',
        status: '1'
    }
]

const Lists: React.FC<IListState> = () => {
    const [pageNo, setPageNo] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [dataSource, setDataSource] = useState<IListItem[]>(datas)
    const [status, setStatus] = useState('')
    const [creditVis, setCreditVis] = useState(false)
    const [editRowData, setEditRowData] = useState<IListItem>({})

    const getList = (pageNop: number, PageSizep: number, statusp: string) => {
        fetch(`/api/lists?pageNo=${pageNop}&pageSize=${PageSizep}&status=${statusp}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                console.log('%c 🍾 res: ', 'font-size:20px;background-color: #FCA650;color:#fff;', res)
                if (res.statusCode === 200) {
                    setDataSource(res.data)
                }
            })
    }

    useEffect(() => {
        getList(pageNo, pageSize, status)
    }, [pageNo, pageSize, status])

    const handleRefresh = () => {
        getList(pageNo, pageSize, status)
    }

    const handleNew = (): void => {
        setCreditVis(true)
        setEditRowData({})
    }
    const handleEdit = (record: IListItem): void => {
        setCreditVis(true)
        setEditRowData(record)
    }
    const hanldeCloseModal = (): void => {
        setCreditVis(false)
    }

    const handleDelete = (id: number): void => {
        console.log(id)
        Modal.confirm({
            title: '确定要删除此项吗？',
            onOk: () => {
                fetch(`/api/delete/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.statusCode === 200) {
                            message.success(res.message)
                            handleRefresh()
                        }
                    })
            }
        })
    }

    const handleChangeStatus = (id: number, status: string): void => {
        const updateStatus = status === '1' ? '2' : '1'
        const text = status === '1' ? '完成' : '待办'

        Modal.confirm({
            title: `确定要修改状态为${text}吗？`,
            onOk: () => {
                fetch(`/api/update/status/${id}?status=${updateStatus}`, {
                    method: 'PUT'
                })
                    .then(res => res.json())
                    .then(res => {
                        if (res.statusCode === 200) {
                            message.success(res.message)
                            handleRefresh()
                        }
                    })
            }
        })
    }

    const columns: any = [
        {
            title: 'id',
            dataIndex: 'id'
        },
        {
            title: '名称',
            dataIndex: 'name'
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
            render: (text: string) => (text === '1' ? '待办' : '完成'),
            filteredValue: status ? [status] : '',
            filterMultiple: false,
            filters: [
                {
                    text: '待办',
                    value: 1
                },
                {
                    text: '完成',
                    value: 2
                }
            ]
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

    const hanldeChangePage = (pagination: any, filters) => {
        const { current, pageSize: pageSizeParams } = pagination
        setPageNo(current)
        setPageSize(pageSizeParams)
        setStatus(filters?.status?.[0])
    }

    return (
        <div>
            <h2>增删改查</h2>
            <Button type="primary" onClick={handleNew}>
                新增任务
            </Button>
            <Table
                dataSource={dataSource}
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
            {creditVis && (
                <Credit
                    editRowData={editRowData}
                    visible={creditVis}
                    handleCancel={hanldeCloseModal}
                    handleRefresh={handleRefresh}
                />
            )}
        </div>
    )
}

export default Lists
