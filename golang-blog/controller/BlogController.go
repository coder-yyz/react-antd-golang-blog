package controller

import (
	"fmt"
	"golang-blog/db"
	"golang-blog/models"
	"golang-blog/utils"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/gin-gonic/gin"
)

// BlogController ...
type BlogController struct{}

type Temp struct {
	ID          uint
	Title       string
	CreatedTime string
	TypeID      uint
	Type        string
	UserName    string
	Avatar      string
	FirstPic    string
	Description string
	Status      uint
}

// Create ...
func (BlogController) Create(c *gin.Context) {
	t := &models.Blog{}
	c.Bind(&t)
	

	err := db.DB.Create(t).Error
	if err != nil {
		c.JSON(http.StatusBadRequest,err)
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"msg": t.ID,
	})
}

//Delete ...
func (BlogController) Delete(c *gin.Context) {
	id := c.Param("id")
	intID, _ := strconv.Atoi(id)
	var result = ""
	err := db.DB.Where("id = ?", intID).Delete(&models.Blog{}).Error
	if err != nil {
		result = "删除失败"
	} else {
		result = "删除成功"
	}
	// fmt.Println(result)
	c.JSON(http.StatusOK, gin.H{
		"msg": result,
	})
}

// List ...
func (BlogController) List(c *gin.Context) {

	var result []models.Blog
	var temp []Temp
	err := db.DB.Where("is_publish = ?", 1).Preload("User").Preload("Type").Find(&result).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg": "查询出现错误",
		})
		return
	} else {
		for i := 0; i < len(result); i++ {
			t := Temp{ID: result[i].ID, Title: result[i].Title, CreatedTime: result[i].CreatedTime, TypeID: result[i].TypeID,
				Type: result[i].Type.Type, UserName: result[i].User.Username, Avatar: result[i].User.Avator,
				FirstPic: result[i].FirstPic, Description: result[i].Description}
			temp = append(temp, t)

		}
		c.JSON(http.StatusOK, temp)
	}

}

func (BlogController) AllBlogs(c *gin.Context) {

	var result []models.Blog
	var temp []Temp
	err := db.DB.Preload("User").Preload("Type").Find(&result).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg": "查询出现错误",
		})
		return
	} else {
		for i := 0; i < len(result); i++ {
			t := Temp{ID: result[i].ID, Title: result[i].Title, CreatedTime: result[i].CreatedTime, TypeID: result[i].TypeID,
				Type: result[i].Type.Type, UserName: result[i].User.Username, Avatar: result[i].User.Avator,
				FirstPic: result[i].FirstPic, Description: result[i].Description, Status: result[i].IsPublish}
			temp = append(temp, t)

		}
		c.JSON(http.StatusOK, temp)
	}

}

// Update ...
func (BlogController) Update(c *gin.Context) {
	t := &models.Blog{}
	c.Bind(&t)
	var result = ""
	err := db.DB.Save(t).Error
	if err != nil {
		result = "修改失败"
	} else {
		result = "修改成功"
	}
	// fmt.Println(result)
	c.JSON(http.StatusOK, gin.H{
		"msg": result,
	})

}

func (BlogController) FindBlogsByType(c *gin.Context) {
	id := c.Param("typeID")
	var result []models.Blog
	var temp []Temp
	err := db.DB.Where("is_publish = ? and type_id = ?", 1, id).Preload("User").Preload("Type").Find(&result).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg": "查询出现错误",
		})
		return
	} else {
		for i := 0; i < len(result); i++ {
			t := Temp{ID: result[i].ID, Title: result[i].Title, CreatedTime: result[i].CreatedTime, TypeID: result[i].TypeID,
				Type: result[i].Type.Type, UserName: result[i].User.Username, Avatar: result[i].User.Avator,
				FirstPic: result[i].FirstPic, Description: result[i].Description}
			temp = append(temp, t)

		}
		c.JSON(http.StatusOK, temp)
	}

}

func (BlogController) Detail(c *gin.Context) {
	id := c.Param("id")
	var blogTags []models.BlogTag
	var tags []models.Tag
	result := new(models.Blog)
	err := db.DB.Where("id = ?", id).Preload("User").Preload("Type").Find(&result).Error
	err1 := db.DB.Where("blog_id = ?", id).Find(&blogTags).Error
	for i := 0; i < len(blogTags); i++ {
		temp := new(models.Tag)
		err2 := db.DB.Where("id = ?", blogTags[i].TagID).Find(&temp).Error
		if err2 != nil {
			c.JSON(http.StatusNotFound, err2)
			return
		} else {
			tags = append(tags, *temp)
		}
	}
	if err != nil || err1 != nil {
		c.JSON(http.StatusNotFound, err)
		return
	} else {
		c.JSON(http.StatusOK, gin.H{
			"blog": result,
			"tags": tags,
		})
	}
}

func (BlogController) Image(c *gin.Context) {

	f, err := c.FormFile("imgfile")
	if err != nil {
		c.JSON(200, gin.H{
			"code": 400,
			"msg":  "上传失败!",
		})
		return
	}

	fileExt := strings.ToLower(filepath.Ext(f.Filename))
	if fileExt != ".png" && fileExt != ".jpg" && fileExt != ".gif" && fileExt != ".jpeg" {
		c.JSON(200, gin.H{
			"code": 400,
			"msg":  "上传失败!只允许png,jpg,gif,jpeg文件",
		})
		return
	}
	fileName := utils.MD5(fmt.Sprintf("%s%s", f.Filename, time.Now().String()))

	fileDir := fmt.Sprintf("%s/%d%d%d/", "images", time.Now().Year(), time.Now().Month(), time.Now().Day())
	
	_, err2 := os.Stat(fileDir)
	isExist := os.IsExist(err2)
	if !isExist {
		os.MkdirAll(fileDir, os.ModePerm)
	}
	filepath := fmt.Sprintf("%s%s%s", fileDir, fileName, fileExt)
	
	c.SaveUploadedFile(f, filepath)
	c.JSON(200, gin.H{
		"code": 200,
		"msg":  "上传成功!",
		"result": gin.H{
			"path":  "http://localhost:8080/" + filepath,
		},
	})

}
