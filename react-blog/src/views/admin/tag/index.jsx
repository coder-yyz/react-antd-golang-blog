import React,{ useState, useEffect }  from 'react'
import ReactDOM from 'react-dom'
import Axios from 'axios'
import { Table, Tag, Space,Button,Modal,Input} from 'antd';
import format from "../../../utils/format";
import '../../../utils/getdate'
import { use } from 'marked';
import GetDate from '../../../utils/getdate';


function AdminTag(props){
    let [tags,setTags] = useState([]);
    const [isModalVisible1, setIsModalVisible1] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const [id,setID] = useState(0)
    const [tag,setTag] = useState("")
    const showModal1 = (item) => {
        console.log(item)
        setIsModalVisible1(true);
        setID(item.key)
        setTag(item.tag)
    };
    const showModal2 = () => {
        setIsModalVisible2(true);
    };
    //提交修改
    const handleOk1 = () => {
        Axios.post("http://127.0.0.1:8080/tag/update",{ID:id,Tag:tag,CreatedTime:GetDate()}).then(res =>{
            // console.log(res)
            setID(0)
            setTag("")
            window.location.reload()
        })
        setIsModalVisible1(false);
        setIsModalVisible2(false);
    };
    //提交新增
    const handleOk2 = () => {
        addTag()
        setIsModalVisible1(false);
        setIsModalVisible2(false);
    };

    const handleCancel = () => {
        setIsModalVisible1(false);
        setIsModalVisible2(false);
    };
    const handleInput = (e) => {
        setTag(e.target.value)
        // console.log(e.target.value)
    }
    const deleteTag = (id) =>{
        console.log(id)
        Axios.post("http://127.0.0.1:8080/tag/delete/" + id).then(res =>{
            window.location.reload()
        })
    }
    const addTag = () =>{
        console.log(GetDate())
        Axios.post("http://127.0.0.1:8080/tag/create" ,{Tag:tag,CreatedTime:GetDate()}).then(res =>{
            window.location.reload()
        })
    }
    useEffect( ()=>{
        Axios.get('http://127.0.0.1:8080/tag').then(res => {
            var temp = []
            res.data.msg.map(item => {
                temp.push({
                    key:item.ID,
                    tag:item.Tag,
                    createdTime:format(item.CreatedTime)
                })
            })
            setTags((tags = temp));
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
      title: 'Tag',
      dataIndex: 'tag',
      key: 'tag',
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
          
          <Button onClick={()=>{deleteTag(record.key)}} style={{borderRadius:'5px'}} type="primary" danger>删除</Button>
        </Space>
      ),
    },
  ];
  
  
    return(
        <div>
            <Table pagination={false} columns={columns} dataSource={tags} />
            <Button onClick={()=>{showModal2()}} style={{borderRadius:'5px'}} type="primary" ghost>添加</Button>
            <Modal title="编辑" visible={isModalVisible1} onOk={handleOk1} onCancel={handleCancel}>
                <Input value={tag} onChange={(e) =>{handleInput(e)}} />
            </Modal>
            <Modal title="添加" visible={isModalVisible2} onOk={handleOk2} onCancel={handleCancel}>
                <Input value={tag} onChange={(e) =>{handleInput(e)}} />
            </Modal>
        </div>
    )
}

export default AdminTag