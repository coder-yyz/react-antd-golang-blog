import ReactDOM from 'react-dom';
import React from 'react';
import { Layout, Menu } from 'antd';
import {NavLink,Route, Switch,Redirect,Link} from 'react-router-dom'
import './index.css'
import List from '../../views/list'
import About from '../../views/about'
import Detail from '../../views/detail'
import Axios from 'axios'
import Background from '../backround'
import {
  UnorderedListOutlined,
  BookOutlined,
  UserOutlined,
  CopyOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class MyLayout extends React.Component{
    state = {
        collapsed: true,
        types: [],
        tags:[],
      };
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
            this.setState({types:temp})
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
            this.setState({tags:temp})
        })
      };
      onCollapse = collapsed => {
        this.setState({ collapsed });
      };
      componentDidMount(){
          this.getTypes()
          this.getTags()
      }
    render(){
        return(
            <Layout style={{ minHeight: '100vh',backgroundColor:'transparent',opacity:'0.9'}}>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%'}}>
                    <div className="logo" />
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1" icon={<UnorderedListOutlined />}><NavLink to='/'>列表</NavLink></Menu.Item>
                        <SubMenu key="type" icon={<CopyOutlined />} title="分类">
                            {this.state.types.map(item =>{
                                let key = 'type'+item.id
                                return(<Menu.Item key={key} ><Link to={`/type/${item.id}`}>{item.value}</Link></Menu.Item>)
                            })}
                        </SubMenu>
                        <SubMenu key="tag" icon={<BookOutlined />} title="标签">
                            {this.state.tags.map(item =>{
                                let key = 'tag'+item.id
                                return(<Menu.Item key={key} ><Link to={`/tag/${item.id}`}>{item.value}</Link></Menu.Item>)
                            })}
                        </SubMenu>
                        <Menu.Item key="3" icon={<UserOutlined />}><NavLink to='/about'>关于我</NavLink></Menu.Item>
                    </Menu>
                </Header>
                
                <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: '0px' }} />
                <Content style={{ margin: '10px 16px' }}>
                    <Switch>
                        <Route path='/' component={List} exact/>
                        <Route path='/about' component={About}/>
                        <Route path={'/type/:id'} component={List}/>
                        <Route path={'/tag/:id'} component={List}/>
                        <Route path={'/blog/:id'} component={Detail} exact/>
                        <Redirect to='/'/>
                    </Switch>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        )
    }
}