package utils

import (
	"bytes"
	"encoding/binary"
	"fmt"
	"golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
	"io/ioutil"
	"math"
	"strings"
)

//保留小数点后n位数
func Round(f float64, n int) float64 {
	n10 := math.Pow10(n)
	return math.Trunc((f+0.5/n10)*n10) / n10
}
func Uint16ToBytes(num uint16) []byte {
	var buffer bytes.Buffer
	binary.Write(&buffer, binary.BigEndian, num)
	return buffer.Bytes()
}
func Uint32ToBytes(num uint32) []byte {
	var buffer bytes.Buffer
	binary.Write(&buffer, binary.BigEndian, num)
	fmt.Println(buffer.Bytes())
	return buffer.Bytes()
}
func Float32ToBytes(n float32) []byte {
	var buffer bytes.Buffer
	binary.Write(&buffer, binary.BigEndian, n)
	return buffer.Bytes()
}
func Int2Bytes(num int32) []byte {
	var buffer bytes.Buffer
	binary.Write(&buffer, binary.BigEndian, num)
	return buffer.Bytes()
}

//转换十进制10为0x10,而非0x0a
func Int2Byte(n int) byte {
	var (
		ret uint = 0
		i   uint = 0
		t   uint = 0
	)
	a := uint(n)
	for {
		t = a % 10
		ret |= t << (i * 4)
		a /= 10
		i++
		if i > 8 {
			break
		}
	}
	return byte(ret)
}

func Uint64ToBytes(num uint64) []byte {
	var buffer bytes.Buffer
	binary.Write(&buffer, binary.BigEndian, num)
	return buffer.Bytes()

}

//获取数字位数
func GetNumBits(number int64) (n int) {
	for number > 0 {
		number /= 10
		n++
	}
	return
}

func GbkToUtf8(s []byte) ([]byte, error) {
	reader := transform.NewReader(bytes.NewReader(s), simplifiedchinese.GBK.NewDecoder())
	d, e := ioutil.ReadAll(reader)
	if e != nil {
		return nil, e
	}
	return d, nil
}

//float转成3位小数点字符串
func FloatToStr3(num float32) string {
	strNum := fmt.Sprint(num)
	arrNum := strings.Split(strNum, ".")
	if len(arrNum) == 1 {
		return arrNum[0] + ".000"
	}
	if len(arrNum[1]) >= 3 {
		return arrNum[0] + "." + arrNum[1][:3]
	} else {
		lenNum1 := 3 - len(arrNum[1])
		for i := 0; i < lenNum1; i++ {
			arrNum[1] += "0"
		}
		return arrNum[0] + "." + arrNum[1]
	}

}