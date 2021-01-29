/*
 * @Author: yyz
 * @Date: 2020-10-25 16:17:17
 */
package controller

import (
	"golang-blog/db"
	"golang-blog/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// TypeController ...
type TypeController struct{}

// Create ...
func (TypeController) Create(c *gin.Context) {
	t := &models.Type{}
	c.Bind(&t)
	var count int64
	var result = ""
	db.DB.Where("type = ?", t.Type).Find(&models.Type{}).Count(&count)
	if int(count) >= 1 {
		result = "该类型已存在"
	} else {
		err := db.DB.Create(t).Error
		if err != nil {
			result = "添加类型失败"
		} else {
			result = "添加类型成功"
		}
	}
	// fmt.Println(result)
	c.JSON(http.StatusOK, gin.H{
		"msg": result,
	})
}

//Delete ...
func (TypeController) Delete(c *gin.Context) {
	id := c.Param("id")
	intID, _ := strconv.Atoi(id)
	var result = ""
	err := db.DB.Where("id = ?", intID).Delete(&models.Type{}).Error
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
func (TypeController) List(c *gin.Context) {
	var result []models.Type
	err := db.DB.Find(&result).Error
	if err != nil {
		c.JSON(http.StatusOK, gin.H{
			"msg": "查询出现错误",
		})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"msg": result,
		})
	}

}

// Update ...
func (TypeController) Update(c *gin.Context) {
	t := &models.Type{}
	c.Bind(&t)
	var result = ""
	err := db.DB.Model(&models.Type{}).Where("id = ?",t.ID).Updates(models.Type{Type:t.Type,CreatedTime:t.CreatedTime}).Error
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
