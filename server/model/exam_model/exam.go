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
	ID        string    `json:"id"`
	Name      string    `json:"name"`
	StartTime string    `json:"startTime"`
	Duration  string    `json:"duration"`
	Day       string    `json:"day"`
	Month     string    `json:"month"`
	Position  string    `json:"position"`
	Number    string    `json:"number"`
	Grade     string    `json:"grade"`
	Specialty string    `json:"specialty"`
	Class     []string  `json:"class"`
	Organizer string    `json:"organizer"` //承办单位，xx教研室
	Content   []content `json:"content"`
}
type content struct {
	Type   string      `json:"type"`
	Title  string      `json:"title"`
	Choice interface{} `json:"choice"`
}
type ExamT struct {
	ID        string        `json:"id"`
	Name      string        `json:"name"`
	StartTime string        `json:"startTime"`
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
		return nil, err
	} else {
		return Info, nil
	}
}

type ExamInfo struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

// 获取某天的考试的部分信息
func GetRecentExam() ([]ExamInfo, error) {
	var Infos []ExamInfo
	var info ExamInfo
	_, month, day := time.Now().Date()
	Exams := []Exam{}
	filter := bson.M{"day": strconv.Itoa(day), "month": strconv.Itoa(int(month))}
	err := ExamColl.Find(context.Background(), filter).All(&Exams)
	for _, value := range Exams {
		info.ID = value.ID
		info.Name = value.Name
		Infos = append(Infos, info)
	}
	if err != nil {
		return Infos, err
	} else {
		return Infos, err
	}
}

// 根据考试id获取考试信息
func GetExamContent(id string) (Exam, error) {
	Info := Exam{}
	filter := bson.M{"id": id}
	err := ExamColl.Find(context.Background(), filter).One(&Info)
	if err != nil {
		return Info, err
	} else {
		return Info, nil
	}
}

// 添加一场考试
func AddOneExam(exam ExamT) error {
	_, err := ExamColl.InsertOne(context.Background(), exam)
	return err
}

// 批量添加考试
func AddManyEXam(examList []ExamT) error {
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
