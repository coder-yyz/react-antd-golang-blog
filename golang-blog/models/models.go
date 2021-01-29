/*
 * @Author: yyz
 * @Date: 2020-10-24 12:03:16
 */
package models

import (
	// "github.com/jinzhu/gorm"
	// "time"
)

//User 结构体
type User struct {
	ID          uint
	Username    string
	Email       string
	Password    string
	Age         int
	Sex         string
	CreatedTime string
	Avator      string
}

// UserBlog 关系
// type UserBlog struct{
// 	ID	uint
// 	UserID	uint
// 	BlogID	uint
// }

//Type 结构体
type Type struct {
	ID          uint
	Type        string
	CreatedTime string
}

//Tag 结构体
type Tag struct {
	ID          uint
	Tag         string
	CreatedTime string
}

// BlogTag 	关系
type BlogTag struct {
	ID     uint
	BlogID uint
	TagID  uint
}

// BlogType 	关系
// type BlogType struct{
// 	ID uint
// 	BlogID		uint
// 	TypeID		uint
// }

//Blog 结构体
type Blog struct {
	ID          uint
	Title       string
	Content     string `gorm:"type:longtext"`
	FirstPic    string
	Description string
	CreatedTime string
	IsPublish   uint
	User        User `gorm:"foreignKey:UserID"`
	Type        Type `gorm:"foreignKey:TypeID"`
	UserID      uint
	TypeID      uint
	// Tags			[]Tag   `gorm:"many2many:blog_tags;`
}
