import React from 'react';
import ReactDOM from 'react-dom';
import MyLayout from "../components/layout";
import Background from '../components/backround'
import {NavLink,Route, Switch,Redirect,Link} from 'react-router-dom'
import List from '../views/list'
import About from '../views/about'
import Detail from '../views/detail'
import AdminLayout from '../components/admin-layout'
export default class App extends React.Component{

    render(){
        return(
            <div>
                {/* <MyLayout/> */}
                <Switch>
                    <Route path='/' component={MyLayout} exact/>
                    <Route path='/about' component={MyLayout}/>
                    <Route path={'/type/:id'} component={MyLayout}/>
                    <Route path={'/tag/:id'} component={MyLayout}/>
                    <Route path={'/blog/:id'} component={MyLayout} exact/>
                    <Route path='/admin/' component={AdminLayout} exact/>
                    <Route path='/admin/type' component={AdminLayout} exact/>
                    <Route path='/admin/tag' component={AdminLayout} exact/>
                    <Route path='/admin/about' component={AdminLayout} exact/>
                    <Route path='/admin/blog/edit' component={AdminLayout} exact/>
                    <Route path='/admin/blog/edit/:id' component={AdminLayout} exact/>
                    <Redirect to='/'/>
                </Switch>
                <Background/>
            </div>
        )
    }
}