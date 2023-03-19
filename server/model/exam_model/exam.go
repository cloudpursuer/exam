package exam_model

import (
	"context"
	"strconv"
	"time"

	"github.com/qiniu/qmgo"
	"go.mongodb.org/mongo-driver/bson"
)

var ExamColl *qmgo.Collection

type Exam struct {
	ID        string        `json:"id"`
	Name      string        `json:"name"`
	StartTime string        `json:"start-time"`
	Duration  string        `json:"duration"`
	Day       string        `json:"day"`
	Month     string        `json:"month"`
	Position  string        `json:"position"`
	Number    string        `json:"number"`
	Grade     string        `json:"grade"`
	Specialty string        `json:"specialty"`
	Class     []string      `json:"class"`
	Organizer string        `json:"organizer"` //承办单位，xx教研室
	Content   []interface{} `json:"content"`
}

// type choiceQuestion struct {
// 	title  string
// 	choice []string
// }

// 获取所有考试
func GetAllEXamInfo() ([]Exam, error) {
	Info := []Exam{}
	filter := bson.M{}
	err := ExamColl.Find(context.Background(), filter).All(&Info)
	if err != nil {
		return Info, err
	} else {
		return Info, err
	}
}

// 获取某天的考试的部分信息
func GetRecentExam() ([]string, error) {
	var Info []string
	_, month, day := time.Now().Date()
	Exams := []Exam{}
	filter := bson.M{"day": strconv.Itoa(day), "month": strconv.Itoa(int(month))}
	err := ExamColl.Find(context.Background(), filter).All(&Exams)
	for _, value := range Exams {
		Info = append(Info, value.Name)
	}
	if err != nil {
		return Info, err
	} else {
		return Info, err
	}
}

// 添加一场考试
func AddOneExam(exam Exam) error {
	_, err := ExamColl.InsertOne(context.Background(), exam)
	return err
}

// 批量添加考试
func AddManyEXam(examList []Exam) error {
	_, err := ExamColl.InsertMany(context.Background(), examList)
	return err
}

// 删除考试
func DelExam(id string) error {
	err := ExamColl.Remove(context.Background(), bson.M{"id": id})
	return err
}

// 删除所有考试
func DelAll() error {
	filter := bson.M{}
	_, err := ExamColl.RemoveAll(context.Background(), filter)
	return err
}

// 修改考试信息
func MutExamInfo(id string, newExamInfo Exam) error {
	filter := bson.M{"id": id}
	err := ExamColl.UpdateOne(context.Background(), filter, newExamInfo)
	return err
}
