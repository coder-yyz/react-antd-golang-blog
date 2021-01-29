import React from 'react'
import ReactDOM from 'react-dom'
import {Col,Row,Input, Button ,Select} from 'antd'
import Vditor from '../../../components/vditor'
import GetDate from '../../../utils/getdate';
import Axios from 'axios'
import MyVditor from '../../../components/vditor'
import { Link ,Redirect} from 'react-router-dom';

const { Option } = Select;
const { TextArea } = Input;

export default class Edit extends React.Component{
    state = {
        title:"",
        content:"",
        firstPic:"",
        blogTypeID:0,
        blogTagsID:[],
    
        description:"",
        status:1,
        user:"",
        createdTime:"",
        content:"",
        types:[],
        tags:[],

        // defaultType:0,
        defaultTags:[],
        
    }
    routeHandle = () => {
        const arr = this.props.location.pathname.split('/')
        if (arr.length === 4){
            // this.setState({value:""})
        }   
        else{
            Axios.get('http://127.0.0.1:8080/blog/'+ arr[4]).then(res => {
                const {data} = res
                // console.log('修改博客')
                // console.log(data.blog.Content)
                // this.setState({content:data.blog.Content,
                //                 title:data.blog.Title,
                //                 firstPic:data.blog.FirstPic,
                //                 blogType:data.blog.Type,
                //                 description:data.blog.Description,
                //                 status:data.blog.IsPublish})
                                // console.log(this.state)
                    this.setState((prevState, props) =>({
                        content:data.blog.Content,
                        title:data.blog.Title,
                        firstPic:data.blog.FirstPic,
                        description:data.blog.Description,
                        status:data.blog.IsPublish,
                    }))
            })
            Axios.get('http://127.0.0.1:8080/tagsByBlog/' + arr[4]).then(res => {
                var temp = []
                res.data.map(item => {
                    temp.push({
                        id:item.ID,
                        tag:item.Tag
                    })
                })
                // this.setState({blogTags:temp})
                this.setState((prevState, props) =>({
                    blogTags:temp
                }))
            })
            
        }
    }
    //子组件传值到父组件
    handleGetData = (value) =>{
        this.setState({content:value})
    }
    getTypes = () => {
        Axios.get('http://127.0.0.1:8080/type').then(res =>{
            const {msg} = res.data
            let temp = []
            msg.map(item =>{
                temp.push({
                    id:item.ID,
                    value:item.Type
                })
            })
            this.setState((prevState, props) =>({types:temp}))
        })
      };
      getTags = () => {
        Axios.get('http://127.0.0.1:8080/tag').then(res =>{
            const {msg} = res.data
            let temp = []
            msg.map(item =>{
                temp.push({
                    id:item.ID,
                    value:item.Tag
                })
            })
            this.setState((prevState, props) =>({tags:temp}))
            // console.log(this.state)
        })
      };

      handleChange = (index,e) =>{
        // this.setState({
        //     title:e.target.value
        // })
        switch (index){
            case 'title':
                this.setState({title:e.target.value})
                console.log(e.target.value)
                break
            case 'firstPic':
                this.setState({firstPic:e.target.value})
                break
            case 'type':
                this.setState({blogTypeID:e})
                break
            case 'tags':
                this.setState({blogTagsID:e})
                break
            case 'description':
                this.setState({description:e.target.value})
                break
        }
        
      }
      save = () =>{
          this.setState({status:0})
        //   Axios.post('')
          console.log(this.state)
      }
      publish = () =>{
          Axios.post('http://127.0.0.1:8080/blog/create',{Title:this.state.title,
          Content:this.state.content,FirstPic:this.state.firstPic,Description:this.state.description,
          CreatedTime:GetDate(),IsPublish:1,UserID:1,TypeID:this.state.blogTypeID
        }).then(res =>{
            let formdata = new FormData()
            formdata.append("blogID",res.data.msg)
            formdata.append("tagsID",this.state.blogTagsID)
            Axios.post('http://127.0.0.1:8080/tagsForBlog',formdata,{headers:{'Content-Type':'application/x-www-form-urlencoded'}}).then(res1 =>{
                
                
            })
            
        })
        // this.setState({status:1})
      }
    componentDidUpdate(prevProps){
        if(this.props.location.pathname!=prevProps.location.pathname){
            this.routeHandle()
            this.getTags()
            this.getTypes()
        }
        
    };

    componentDidMount(){
        this.routeHandle()
        this.getTags()
        this.getTypes()
    }
    
    render(){
        return(
            <Row>
                <Col span='4'/>
                <Col style={{border:'1px solid #d4d4d5'}} span='16'>
                    <Row style={{marginTop:'10px'}}>
                        <Col span='24'>
                            <Input onChange={this.handleChange.bind(this,'title')} value={this.state.title} placeholder='请输入博客标题'/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}>
                        <Col span='24'>
                            <Vditor getData={this.handleGetData} editValue={this.state.content}/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}>
                        <Col span='24'>
                                <Input onChange={this.handleChange.bind(this,'firstPic')} value={this.state.firstPic}  placeholder='请输入首图链接...'/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}> 
                        <Col span='12' >
                            <Select onChange={this.handleChange.bind(this,'type')} style={{ width: 120 }}>
                            {this.state.types.map(item =>{
                                return <Option value={Number(item.id)}>{item.value}</Option>
                            })}
                        </Select>
                        
                        </Col>
                        <Col span='12'>
                            <Select onChange={this.handleChange.bind(this,'tags')} mode="multiple" style={{ width: 180 }}>
                            {this.state.tags.map(item =>{
                                return <Option value={Number(item.id)}>{item.value}</Option>
                            })}
                            
                        </Select>
                        
                        </Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}>
                        <Col span='24'>
                            <div style={{width:'100%'}}>
                                <TextArea onChange={this.handleChange.bind(this,'description')} rows={3} value={this.state.description}  placeholder='请输入描述'/>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{marginTop:'10px'}}>
                        <Col span='24'>
                            <div style={{width:'100%'}}>
                                {/* <Button onClick={this.save}>保存</Button> */}
                                <Button onClick={this.publish}>发布</Button>
                                <Button>取消</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
                <Col span='4'/>
            </Row>
        )
    }
}