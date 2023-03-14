package student_model

import (
	"context"

	"github.com/qiniu/qmgo"
	"go.mongodb.org/mongo-driver/bson"
)

var StudentColl *qmgo.Collection

type Student struct {
	ID        string `json:"id"` //学号
	Name      string `json:"name"`
	Password  string `json:"password"`
	Grade     string `json:"grade"`
	Specialty string `json:"specialty"`
	Class     string `json:"class"`
}

// 批量添加学生信息
func AddManyStudentInfo(studentList []Student) error {
	_, err := StudentColl.InsertMany(context.Background(), studentList)
	return err
}

// 根据学号删除学生信息
func DelOneStudentInfo(id string) error {
	filter := bson.M{"id": id}
	err := StudentColl.Remove(context.Background(), filter)
	return err
}

// 根据学号查找学生信息
func FindStudentInfo(id string) error {
	one := Student{}
	filter := bson.M{"id": id}
	err := StudentColl.Find(context.Background(), filter).One(&one)
	return err
}
