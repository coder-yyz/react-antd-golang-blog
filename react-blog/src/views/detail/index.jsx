/*
 * @Author: yyz
 * @Date: 2021-01-17 19:37:14
 */
import React from "react";
import  ReactDOM from 'react-dom'
import Axios from 'axios'
import { List, Avatar, Space,Row,Col,Image } from 'antd';
import format from '../../utils/format'
import { UserOutlined , CopyOutlined, FieldTimeOutlined  } from '@ant-design/icons';
import Markdown from "../../components/markdown";
const IconText = ({ icon, text }) => (
    <Space style={{marginLeft:'20px'}}>
      {React.createElement(icon)}
      {text}
    </Space>
  );

export default class Detail extends React.Component{
    state = {
        blog: {},
        tags: []
    }
    componentDidMount(){
        const arr = this.props.location.pathname.split('/')
        Axios.get("http://127.0.0.1:8080/blog/" + arr[2]).then(res =>{
            this.setState({blog:res.data.blog,tags:res.data.tags})
        })
    }
    render(){
        return(
            <div>
                <Row>
                    <Col xs={0} sm={0} md={5} lg={5} xl={5}/>
                    <Col xs={24} sm={24} md={14} lg={14} xl={14} style={{border:'1px solid #d4d4d5'}}>
                        <div style={{width:'100%',height:'50px',borderBottom:'1px solid #d4d4d5',display:'flex'}}>
                                    <Avatar style={{margin:'5px 10px 10px 40px'}} size={40} src={Object(this.state.blog.User).Avator}/>
                                    <span style={{fontSize:'18px',fontWeight:'bold',color:'#2980b9',marginTop:'10px'}}>{Object(this.state.blog.User).Username}</span>
                                {/* <IconText icon={FieldTimeOutlined} text={format(Object(this.state.blog.User).createdTime)} key="list-vertical-like-o" /> */}
                                <span style={{fontSize:'20px',paddingLeft:'55%',lineHeight:'50px',color:'#95a5a6'}}>{format(Object(this.state.blog.User).CreatedTime)}</span>
                        </div>
                        <Image preview={false} width={'90%'} style={{borderRadius:'5px',marginLeft:'5%',marginTop:'10px'}} src={this.state.blog.FirstPic}/>        
                        <div style={{marginTop:'50px'}}>
                            <h2 style={{textAlign:'center',fontWeight:'bold',fontSize:'24px',color:'#57606f'}}>{this.state.blog.Title}</h2>
                            <div style={{height:'50px'}}>
                            <span style={{border:'2px #1abc9c solid',color:'#1abc9c',borderRadius:'3px',fontWeight:'bold',float:"right",marginRight:'50px'}}>{Object(this.state.blog.Type).Type}</span>
                            </div>
                            <div style={{width:'90%',margin:'0 auto'}}>
                                <Markdown content={this.state.blog.Content}/>
                            </div>
                            <div style={{width:'40%',display:'flex',margin:'50px 0 50px 0'}}>
                                {this.state.tags.map(item => {
                                    return(
                                        <span style={{border:'2px #e67e22 solid',color:'#e67e22',borderRadius:'3px',fontWeight:'bold',float:"right",marginLeft:'50px'}} key={item.ID}>{item.Tag}</span>
                                    )
                                })}
                            </div>
                        </div>
                    </Col>
                    <Col xs={0} sm={0} md={5} lg={5} xl={5}/>
                </Row>
            </div>
            
        )
    }
}