package controller

import (
	"golang-blog/db"
	"golang-blog/models"
	"net/http"
	"github.com/gin-gonic/gin"
)

// UserController ...
type UserController struct{}

// Create ...
func (UserController) Create(c *gin.Context) {
	user := &models.User{}
	c.Bind(&user)
	// var user = &models.User{Username: "yyz", Email: "2562874272@qq.com", Password: "111111", Age: 21, Sex: "男", CreatedTime: "2020-10-24 22:20:00"}
	var count int64
	var result = ""
	db.DB.Where("username = ?", user.Username).Or("email = ?", user.Email).Find(&models.User{}).Count(&count)
	if int(count) >= 1 {
		result = "用户名或邮箱已存在"
	} else {
		err := db.DB.Create(user).Error
		if err != nil {
			result = "添加用户失败"
		} else {
			result = "添加用户成功"
		}
	}
	// fmt.Println(result)
	c.JSON(http.StatusOK, gin.H{
		"msg": result,
	})
}

// Login ...
func (UserController) Login(c *gin.Context){
	username := c.PostForm("username")
	password := c.PostForm("password")
	var temp []models.User
	err := db.DB.Where("username = ? and password = ?",username,password).Find(&temp).Error
	if err != nil{
		c.JSON(http.StatusBadRequest,"登录失败")
	}
	if len(temp) == 0{
		c.JSON(http.StatusNotFound,"用户不存在，请检查用户名和密码")
	}
	c.JSON(http.StatusOK,"登录成功")

}