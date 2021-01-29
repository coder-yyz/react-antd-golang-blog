/*
 * @Author: yyz
 * @Date: 2021-01-23 21:27:50
 */
package utils

import (
	"crypto/md5"
	"encoding/hex"
)

func MD5(v string) string {
	d := []byte(v)
	m := md5.New()
	m.Write(d)
	return hex.EncodeToString(m.Sum(nil))
}
