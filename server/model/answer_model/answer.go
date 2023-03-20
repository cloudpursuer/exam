package answer_model

import (
	"context"

	"github.com/qiniu/qmgo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var AnswerColl *qmgo.Collection

type Answer struct {
	Identifier string        `json:"identifier"`
	ID         string        `json:"id"`
	Name       string        `json:"name"`
	Grade      string        `json:"grade"`
	Specialty  string        `json:"specialty"`
	Class      string        `json:"class"`
	Organizer  string        `json:"organizer"` //承办单位，xx教研室
	Content    []interface{} `json:"content"`
}

// 提交答案
func Submit(answer Answer) error {
	_, err := AnswerColl.InsertOne(context.Background(), answer)
	if err != nil {
		return err
	} else {
		return nil
	}
}

// 获取所有回答
func GetAllAnswer(filter primitive.M) ([]Answer, error) {
	Info := []Answer{}
	err := AnswerColl.Find(context.Background(), filter).All(&Info)
	if err != nil {
		return nil, err
	} else {
		return Info, nil
	}
}

// 根据标识符获取答案
func GetAnswer(identifier string) (Answer, error) {
	One := Answer{}
	filter := bson.M{"identifier": identifier}
	err := AnswerColl.Find(context.Background(), filter).One(&One)
	if err != nil {
		return One, err
	} else {
		return One, nil
	}
}
