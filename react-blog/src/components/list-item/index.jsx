import React from 'react'
import ReactDOM from 'react-dom'
import { List, Avatar, Space,Row,Col } from 'antd';
import { UserOutlined , CopyOutlined, FieldTimeOutlined  } from '@ant-design/icons';
import { Link,Route,Router } from "react-router-dom";
import format from '../../utils/format'
import Background from '../backround'
const IconText = ({ icon, text }) => (
    <Space style={{marginLeft:'20px'}}>
      {React.createElement(icon)}
      {text}
    </Space>
  );

export default class Item extends React.Component{
    
    render(){
        return(
           <Row>
               <Col span='4'/>
               <Col span='16'>
                   <div style={{width:'100%',height:'40px',border:'1px solid #d4d4d5',display:'flex',justifyContent:'space-between'}}>
                       <p style={{fontSize:'18px',fontWeight:'bold',marginLeft:'20px',marginTop:'4px',color:'#006266'}}>博客</p>
                       <p style={{fontSize:'18px',fontWeight:'bold',marginRight:'20px',marginTop:'4px'}}>共{this.props.data.length}篇</p>
                   </div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                    }}
                    dataSource={this.props.data}
                    renderItem={item => (
                    <List.Item style={{border:'1px solid #d4d4d5',borderTop:'none'}}
                        key={item.ID}
                        actions={[
                            <div style={{marginLeft:'20px',display:'flex',justifyContent:'space-around'}}>
                                <IconText icon={UserOutlined} text={item.author} key="list-vertical-star-o" />,
                                <IconText icon={FieldTimeOutlined} text={format(item.createdTime)} key="list-vertical-like-o" />
                                <IconText icon={CopyOutlined} text={item.type} key="list-vertical-message" />
                            </div>
                        ]}
                        extra={
                        <img
                            width={250}
                            style={{borderRadius:'10px'}}
                            alt="logo"
                            src={item.firstPic}
                        />
                        }
                    >
                        <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={<Link style={{fontWeight:'bold',fontSize:'18px',color:'#60a3bc'}} to={`/blog/${item.id}`}>{item.title}</Link>}
                        description={<p style={{fontSize:'15px',color:'#747d8c',margin:'0',padding:'0'}}>{item.description}</p>}
                        />
                    </List.Item>
                    )}
                />
               </Col>
               <Col span='4'/>
           </Row>
        )
    }
}