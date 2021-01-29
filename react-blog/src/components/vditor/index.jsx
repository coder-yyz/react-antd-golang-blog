import React from 'react'
import Vditor from "vditor";
import "vditor/src/assets/scss/index.scss";
import Axios from 'axios'
import './index.css'
export default class MyVditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editValue: ""
    };
}
    componentDidMount() {
     //组件挂载完成之后调用 注意一定要在组件挂载完成之后调用 否则会找不到注入的DOM
      this.createVidtor({ value:this.state.editValue});
    }
   componentWillReceiveProps(nextProps){
     if(nextProps.editValue != this.props.editValue){
       
       this.setState({editValue:nextProps.editValue})
      //  console.log(this.state.editValue)
     }
    //  console.log(nextProps.editValue)
  }
     handleImageUpload = (file, callback) => {
        const reader = new FileReader();
        let formData = new FormData();
        formData.append("imgfile", file[0]);
        reader.onload = () => {
            // setTimeout 模拟异步上传图片
            // 当异步上传获取图片地址后，执行callback回调（参数为imageUrl字符串），即可将图片地址写入markdown
            new Promise(resolve => {
                Axios.post('http://127.0.0.1:8080/image',formData,{headers:{'Content-Type':'multipart/form-data'}})
                .then(res => {
                    console.log(res)
                    let imgurl = res.data.result.path;
                    callback(imgurl);
            })
            });
        };
        reader.readAsDataURL(file[0]);
    }
    //创建编辑器 下面会详解
    createVidtor = params => {
      let { value } = params;
      value = value ? value : " ";
      let that = this;
      const vditor = new Vditor("vditor", {
        height: 'auto',
        mode: "ir", //及时渲染模式
        placeholder: "React Vditor",
        toolbar: [
          "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "link",
          "|",
          "list",
          "ordered-list",
          "check",
          "outdent",
          "indent",
          "|",
          "quote",
          "line",
          "code",
          "inline-code",
          "insert-before",
          "insert-after",
          "|",
          "upload",
          "table",
          "|",
          "undo",
          "redo",
          "|",
          "fullscreen",
          "edit-mode",
          {
            name: "more",
            toolbar: [
              "both",
              "code-theme",
              "content-theme",
              "export",
              "outline",
              "preview",
              "devtools",
              "info",
              "help"
            ]
          },
          
        ],
        after() {
          vditor.setValue(value);
          that.props.getData(that.state.editValue)
        },
        // input(value){
        //   that.setState({editValue:value})
        //   that.props.getData(that.state.editValue)
        //   vditor.setValue(value);
        // },
        blur(value) {
          that.setState({editValue:value})
          that.props.getData(that.state.editValue)
          vditor.setValue(value);
        },
        upload: {
          accept: "image/*",
          multiple: false,
          filename(name) {
            return name
              .replace(/[^(a-zA-Z0-9u4e00-u9fa5.)]/g, "")
              .replace(/[?\/:|<>*[]()$%{}@~]/g, "")
              .replace("/\s/g", "");
          },
          handler(files) {
            function callback(path) {
              let name = files[0] && files[0].name;
              let succFileText = "";
              if (vditor && vditor.vditor.currentMode === "wysiwyg") {
                succFileText += `<img alt=${name} src="${path}">`;
              } else {
                succFileText += `![${name}](${path})`;
              }
              document.execCommand("insertHTML", true, succFileText);
            }
            that.handleImageUpload(files, callback);
          },
         
          url(files) {
            that.handleImageUpload(files);
          }
        }
      });
      this.vditor = vditor;
      
      return vditor;
    };
    //首先需要在render里面注入DOM，可自定义注入DOM的ID，初始化编辑器的时候使用自定义的ID即可
    render() {
        return(
            <div className="editorWrap">
                <div id="vditor" />
            </div>
        )
    }
   }