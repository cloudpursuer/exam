package answer_service

import (
	"server/model/answer_model"

	"go.mongodb.org/mongo-driver/bson"
)

// 根据班级- 年级获取答案
func GetAnswerByClass(class string, grade string) ([]answer_model.Answer, error) {
	filter := bson.M{"class": class, "grade": grade}
	answerList, err := answer_model.GetAllAnswer(filter)
	if err != nil {
		return nil, err
	} else {
		return answerList, nil
	}
}

// 根据专业-年级获取答案
func GetAnswerBySpecialty(specialty string) ([]answer_model.Answer, error) {
	filter := bson.M{"specialty": specialty}
	answerList, err := answer_model.GetAllAnswer(filter)
	if err != nil {
		return nil, err
	} else {
		return answerList, nil
	}
}

// 提交答案
func SubmitAnswer(answer answer_model.Answer) error {
	err := answer_model.Submit(answer)
	if err != nil {
		return err
	} else {
		return nil
	}
}
