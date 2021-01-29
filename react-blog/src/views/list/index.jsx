import React from "react";
import  ReactDOM from 'react-dom'
import Axios from "axios";
import ListItem from '../../components/list-item'
export default class List extends React.Component{

    state = {
        blogList:[],
    };
    dataFilter = (data) =>{
        let temp = []
        if (data == null ||data.length==0){
            temp = []
        }else{
            data.map(item => {
                temp.push({
                    id:item.ID,
                    title:item.Title,
                    type:item.Type,
                    author:item.UserName,
                    createdTime:item.CreatedTime,
                    avatar:item.Avatar,
                    description:item.Description,
                    firstPic:item.FirstPic
                })
            })
        }
        this.setState({blogList:temp})
    }
    routeHandle = () => {
        if (this.props.location.pathname === '/'){
            Axios.get('http://127.0.0.1:8080/blog').then(res => {
                const {data} = res
                this.dataFilter(data)
                
            })
        }
        const arr = this.props.location.pathname.split('/')
        if (arr[1] === 'type'){
            Axios.get('http://127.0.0.1:8080/type/'+ arr[2]).then(res => {
                const {data} = res
                this.dataFilter(data)
            })
        }
        if (arr[1] === 'tag'){
            Axios.get('http://127.0.0.1:8080/tag/'+ arr[2]).then(res => {
                const {data} = res
                this.dataFilter(data)
            })
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.location.pathname!=prevProps.location.pathname){
            this.routeHandle()
        }
        
    };
    componentDidMount(){
        this.routeHandle()
    }
    render(){
        return(
            <ListItem data={this.state.blogList}/>
            // this.state.blogList.map(item => {
            //     return <ListItem data={item}/>
            // })
            
        )
    }
}