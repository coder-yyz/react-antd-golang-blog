import React,{ useState, useEffect }  from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import { Table, Type, Space,Button,Modal,Input} from 'antd';
import format from "../../../utils/format";
import '../../../utils/getdate'
import { use } from 'marked';
import GetDate from '../../../utils/getdate';


function AdminType(props){
    let [types,setTypes] = useState([]);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [id,setID] = useState(0)
    const [type,setType] = useState("")
    const showModal1 = (item) => {
        console.log(item)
        setIsModalVisible1(true);
        setID(item.key)
        setType(item.type)
    };
    const showModal2 = () => {
        setIsModalVisible2(true);
    };
    //提交修改
    const handleOk1 = () => {
        Axios.post("http://127.0.0.1:8080/type/update",{ID:id,Type:type,CreatedTime:GetDate()}).then(res =>{
            // console.log(res)
            setID(0)
            setType("")
            window.location.reload()
        })
        setIsModalVisible1(false);
        setIsModalVisible2(false);
    };
    //提交新增
    const handleOk2 = () => {
        addType()
        setIsModalVisible1(false);
        setIsModalVisible2(false);
    };

    const handleCancel = () => {
        setIsModalVisible1(false);
        setIsModalVisible2(false);
    };
    const handleInput = (e) => {
        // setType(e.target.value)
        console.log(e.target.value)
    }
    const deleteType = (id) =>{
        console.log(id)
        Axios.post("http://127.0.0.1:8080/type/delete/" + id).then(res =>{
            window.location.reload()
        })
    }
    const addType = () =>{
        console.log(GetDate())
        Axios.post("http://127.0.0.1:8080/type/create" ,{Type:type,CreatedTime:GetDate()}).then(res =>{
            window.location.reload()
        })
    }
    useEffect( ()=>{
        Axios.get('http://127.0.0.1:8080/type').then(res => {
            var temp = []
            res.data.msg.map(item => {
                temp.push({
                    key:item.ID,
                    type:item.Type,
                    createdTime:format(item.CreatedTime)
                })
            })
            setTypes((types = temp));
        })
    },[])
    const columns = [
    {
      title: 'ID',
      dataIndex: 'key',
      key: 'key',
      align:'center'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align:'center'
    },
    {
      title: 'CreatedTime',
      dataIndex: 'createdTime',
      key: 'createdTime',
      align:'center'
    },
    {
      title: 'Action',
      key: 'action',
      align:'center',
      render: (text, record) => (
        <Space size="middle">
          <Button onClick={()=>{showModal1(record)}} style={{borderRadius:'5px'}} type="primary">编辑</Button>
          <Button onClick={()=>{deleteType(record.key)}} style={{borderRadius:'5px'}} type="primary" danger>删除</Button>
        </Space>
      ),
    },
  ];
  
  
    return(
        <div>
            <Table pagination={false} columns={columns} dataSource={types} />
            <Button onClick={()=>{showModal2()}} style={{borderRadius:'5px'}} type="primary" ghost>添加</Button>
            <Modal title="编辑" visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel}>
                <Input value={type} onChange={(e) =>{handleInput(e)}} />
            </Modal>
            <Modal title="添加" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel}>
                <Input value={type} onChange={(e) =>{handleInput(e)}} />
            </Modal>
        </div>
    )
}

export default AdminType