/*
 * @,@Author: ,: yyz
 * @,@Date: ,: 2021-01-18 16:28:41
 * @,@LastEditTime: ,: 2021-01-19 12:04:56
 */
// 时间格式化
import moment from 'moment'
export default function format(date) {
    return moment(date).format("YYYY-MM-DD hh:mm:ss")
}

