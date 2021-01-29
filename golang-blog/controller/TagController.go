package controller

import (
	"golang-blog/db"
	"golang-blog/models"
	"net/http"
	"strconv"
	"fmt"
	// "time"
	"strings"
	"github.com/gin-gonic/gin"
)

// TagController ...
type TagController struct{}

// Create ...
func (TagController) Create(c *gin.Context) {
	t := &models.Tag{}
	c.Bind(&t)
	fmt.Println(t)
	var count int64
	var result = ""
	db.DB.Where("tag = ?", t.Tag).Find(&models.Tag{}).Count(&count)
	if int(count) >= 1 {
		result = "该标签已存在"
	} else {
		err := db.DB.Create(t).Error
		if err != nil {
			result = "添加标签失败"
		} else {
			result = "添加标签成功"
		}
	}
	// fmt.Println(result)
	c.JSON(http.StatusOK, gin.H{
		"msg": result,
	})
}

//Delete ...
func (TagController) Delete(c *gin.Context) {
	id := c.Param("id")
	intID, _ := strconv.Atoi(id)
	var result = ""
	err := db.DB.Where("id = ?", intID).Delete(&models.Tag{}).Error
	if err != nil {
		result = "删除失败"
	} else {
		result = "删除成功"
	}
	// fmt.Println(result)
	c.JSON(http.StatusOK, result)
}

// List ...
func (TagController) List(c *gin.Context) {
	var result []models.Tag
	err := db.DB.Find(&result).Error
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "查询出现错误",
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"msg": result,
		})
	}

}

// Update ...
func (TagController) Update(c *gin.Context) {
	t := &models.Tag{}
	c.Bind(&t)
	var result = ""
	err := db.DB.Model(&models.Tag{}).Where("id = ?",t.ID).Updates(models.Tag{Tag:t.Tag,CreatedTime:t.CreatedTime}).Error
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

func (TagController)FindBlogsByTag(c *gin.Context) {
	id := c.Param("tagID")
	var tagBlogs []models.BlogTag
	var blogs []models.Blog
	var temp []Temp
	err1 := db.DB.Where("tag_id = ?", id).Find(&tagBlogs).Error
	if err1 != nil {
		c.JSON(http.StatusBadRequest, err1)
		return
	}
	for i := 0; i < len(tagBlogs); i++ {
		blog := new(models.Blog)
		err2 := db.DB.Where("id = ?", tagBlogs[i].BlogID).Preload("User").Preload("Type").Find(&blog).Error
		if err2 != nil {
			c.JSON(http.StatusBadRequest, err2)
			return
		}
		blogs = append(blogs, *blog)
	}
	for i := 0; i < len(blogs); i++ {
		t := Temp{ID: blogs[i].ID, Title: blogs[i].Title, CreatedTime: blogs[i].CreatedTime, TypeID: blogs[i].TypeID,
			Type: blogs[i].Type.Type, UserName: blogs[i].User.Username, Avatar: blogs[i].User.Avator,
			FirstPic: blogs[i].FirstPic, Description: blogs[i].Description}
		temp = append(temp, t)
	}
	c.JSON(http.StatusOK, temp)
}

func (TagController) FindTagsByBlogID(c *gin.Context){
	id := c.Param("id")
	var blogTags []models.BlogTag
	var tags []models.Tag
	err := db.DB.Where("blog_id = ?",id).Find(&blogTags).Error
	if err!=nil{
		c.JSON(http.StatusBadRequest,err)
		return
	}
	for i:=0;i<len(blogTags);i++{
		var temp = new(models.Tag)
		err := db.DB.Where("id = ?",blogTags[i].TagID).Find(&temp).Error
		if err!=nil{
			c.JSON(http.StatusBadRequest,err)
			return
		}
		tags = append(tags,*temp)
	}
	c.JSON(http.StatusOK,tags)
}

func (TagController) AddTagsForBlog (c *gin.Context){
	tagsID := c.PostForm("tagsID")
	blogID := c.PostForm("blogID")
	fmt.Println(tagsID)
	fmt.Println(blogID)
	// tags := tagsID[1 : len(tagsID)-1]
	strs := strings.Split(tagsID, ",")
	db.DB.Where("blog_id = ?",blogID).Delete(&models.BlogTag{})
	
	for i:=0;i<len(strs);i++{
		err := db.DB.Create(&models.BlogTag{BlogID:StrToUInt(blogID),TagID:StrToUInt(strs[i])}).Error
		if err!=nil{
			c.JSON(http.StatusBadRequest,err)
			return
		}
	}
	c.JSON(http.StatusOK,"标签分配成功")
}

func StrToUInt(str string) uint {
    i, e := strconv.Atoi(str)
    if e != nil {
        return 0
    }
    return uint(i)
}