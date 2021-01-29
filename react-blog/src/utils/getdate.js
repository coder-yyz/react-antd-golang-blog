/*
 * @,@Author: ,: yyz
 * @,@Date: ,: 2021-01-24 16:33:10
 */
export default function GetDate() {
    /**
    * format=1表示获取年月日
    * format=0表示获取年月日时分秒
    * **/
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();
    var day = now.getDay();//得到周几
    var hour = now.getHours();//得到小时
    var minu = now.getMinutes();//得到分钟
    var sec = now.getSeconds();//得到秒
    var _time = ""
    
       _time = year+"-"+month+"-"+date+" "+hour+":"+minu+":"+sec
   
   return _time
}    