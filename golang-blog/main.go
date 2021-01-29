/*
 * @Author: yyz
 * @Date: 2020-10-24 12:02:24
 */
package main

import (
	_ "golang-blog/db"
	"golang-blog/routes"
)

func main() {
	// defer db.DB.Close()

	r := routes.InitRouter()
	r.Run(":8080")
}
