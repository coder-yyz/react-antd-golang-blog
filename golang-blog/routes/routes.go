/*
 * @Author: yyz
 * @Date: 2020-10-24 12:03:16
 */
package routes

import (
	"golang-blog/controller"
	"golang-blog/middleware"
	"net/http"

	"github.com/gin-gonic/gin"
)

// InitRouter ...
func InitRouter() *gin.Engine {
	r := gin.Default()
	r.Use(middleware.Cors())
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello!",
		})
	})
	user := &controller.UserController{}
	t := &controller.TypeController{}
	tag := &controller.TagController{}
	blog := &controller.BlogController{}
	r.POST("/user", user.Create)

	r.POST("/type/create", t.Create)
	r.POST("/type/delete/:id", t.Delete)
	r.POST("/type/update", t.Update)
	r.GET("/type", t.List)
	r.GET("/type/:typeID", blog.FindBlogsByType)

	r.POST("/tag/create", tag.Create)
	r.POST("/tag/delete/:id", tag.Delete)
	r.POST("/tag/update", tag.Update)
	r.GET("/tag", tag.List)
	r.GET("/tag/:tagID", tag.FindBlogsByTag)
	r.GET("/tagsByBlog/:id",tag.FindTagsByBlogID)
	r.POST("/tagsForBlog",tag.AddTagsForBlog)

	r.POST("/blog/create", blog.Create)
	r.POST("/blog/delete/:id", blog.Delete)
	r.POST("/blog/update", blog.Update)
	r.GET("/blog", blog.List)
	r.GET("/blogs", blog.AllBlogs)
	r.GET("/blog/:id",blog.Detail)
	

	r.POST("/image",blog.Image)	
    r.StaticFS("/images", http.Dir("images"))

	return r
}
