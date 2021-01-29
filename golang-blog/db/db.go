package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"fmt"
	"golang-blog/models"
)

// DB ... 
var DB *gorm.DB

func init() {
	var err error
	DB, err = gorm.Open(sqlite.Open("data/blog.db"), &gorm.Config{})
	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println("数据库连接成功")
	}
	DB.AutoMigrate(&models.User{}, &models.Type{}, &models.Tag{},&models.Blog{},&models.BlogTag{})
}
