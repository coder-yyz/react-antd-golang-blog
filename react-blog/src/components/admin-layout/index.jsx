import React from 'react'
import ReactDOM from 'react-dom'
import {NavLink,Route, Switch,Redirect,Link} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import Blog from '../../views/admin/blog'
import Type from '../../views/admin/type'
import Tag from '../../views/admin/tag'
import About from '../../views/admin/about'
import Edit from '../../views/admin/edit'
import {
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class AdminLayout extends React.Component{

    state = {
        collapsed: false,
      };
    
      onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({ collapsed });
      };
      
      render() {
        const { collapsed } = this.state;
        return (
          <Layout style={{ minHeight: '100vh',backgroundColor:'transparent',opacity:'0.9' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
              <div className="logo" style={{marginTop:'10px'}}/>
              <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  <NavLink to="/admin/">博客</NavLink>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                  <NavLink to="/admin/type">分类</NavLink>
                </Menu.Item>
                <Menu.Item key="3" icon={<DesktopOutlined />}>
                  <NavLink to="/admin/tag">标签</NavLink>
                </Menu.Item>
                <Menu.Item key="4" icon={<DesktopOutlined />}>
                  <NavLink to="/admin/about">关于我</NavLink>
                </Menu.Item>
              </Menu>
            </Sider>
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '0 16px' }}>
              <Switch>
                    <Route path='/admin/' component={Blog} exact/>
                    <Route path='/admin/about' component={About}/>
                    <Route path='/admin/type' component={Type}/>
                    <Route path='/admin/tag' component={Tag}/>
                    <Route path='/admin/blog/edit' component={Edit}/>
                    <Route path='/admin/blog/edit/:id' component={Edit}/>
                    <Redirect to='/admin/'/>
                </Switch>
              </Content>
            </Layout>
          </Layout>
        );
      }
}