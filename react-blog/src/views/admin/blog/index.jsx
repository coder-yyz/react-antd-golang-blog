import React from 'react'
import ReactDOM from 'react-dom'
import Axios from "axios";
import { Table, Tag, Space ,Button } from 'antd';
import {Link} from 'react-router-dom'
import format from "../../../utils/format";
const columns = [
    {
        title: 'ID',
        dataIndex: 'key',
        key: 'key',
        align:'center',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      align:'center',
      render: text => <span style={{fontWeight:'bold'}}>{text}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align:'center',
      render: text => text == '已发布' ? <span style={{color:'green'}}>{text}</span> : <span style={{color:'red'}}>{text}</span>
    },
    {
      title: 'CreatedTime',
      dataIndex: 'createdTime',
      key: 'createdTime',
      align:'center',
    },
    {
      title: 'Type',
      key: 'type',
      dataIndex: 'type',
      align:'center',
    },
    {
      title: 'Action',
      key: 'action',
      align:'center',
      render: (record) => (
        <Space size="middle">
          {/* <Link to={`/admin/blog/edit/${record.key}`} ><Button style={{borderRadius:'5px'}} type="primary">编辑</Button></Link> */}
          
          <Button onClick={() =>{deleteBlog(record.key)}} style={{borderRadius:'5px'}} type="primary" danger>删除</Button>
        </Space>
      ),
    },
  ];
  
const deleteBlog = (id)=>{
    // console.log(id)
    Axios.post('http://127.0.0.1:8080/blog/delete/' + id).then(res =>{
        console.log(res)
        window.location.reload()
    })
}
export default class AdminBlog extends React.Component{
    state = {
        data:[]
    }
    componentDidMount(){
        Axios.get('http://127.0.0.1:8080/blogs').then(res => {
            console.log(res.data)
            var temp = []
            res.data.map(item => {
                temp.push({
                    key:item.ID,
                    title:item.Title,
                    type:item.Type,
                    createdTime:format(item.CreatedTime),
                    status:item.Status == 1 ? '已发布' : '未发布'
                })
            })
            this.setState({data:temp})
        })
    }
    render(){
        return(
            <div>
                <Table pagination={false} key={this.state.data.id} columns={columns} dataSource={this.state.data} />
                <Link to='/admin/blog/edit'><Button style={{borderRadius:'5px'}} type="primary" ghost>添加</Button></Link>
            </div>
        )
    }
}