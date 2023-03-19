package exam_service

import (
	"server/model/exam_model"
	"server/util/random"
)

// 添加一个考试
func AddOneExam(
	name string, startTime string, duration string, day string, month string,
	position string, nubmer string, grade string, specialty string,
	class []string, organizer string, content []interface{}) error {
	exam := exam_model.Exam{
		ID:        random.String(32),
		Name:      name,
		StartTime: startTime,
		Duration:  duration,
		Day:       day,
		Month:     month,
		Position:  position,
		Number:    nubmer,
		Grade:     grade,
		Specialty: specialty,
		Class:     class,
		Organizer: organizer,
		Content:   content,
	}
	err := exam_model.AddOneExam(exam)
	if err != nil {
		return err
	}
	return nil
}

// 获取考试列表
type ExamInfo struct {
	ID        string
	Name      string
	StartTime string
	Duration  string
	Day       string
	Month     string
	Position  string
	Number    string
	Grade     string
	Specialty string
	Class     []string
	Organizer string
}

func GetExamList() ([]ExamInfo, error) {
	var examlist []ExamInfo
	var examinfo ExamInfo
	examList, err := exam_model.GetAllEXamInfo()
	if err != nil {
		return nil, err
	} else {
		for _, value := range examList {
			examinfo.ID = value.ID
			examinfo.Name = value.Name
			examinfo.StartTime = value.StartTime
			examinfo.Duration = value.Duration
			examinfo.Day = value.Day
			examinfo.Month = value.Month
			examinfo.Position = value.Position
			examinfo.Number = value.Number
			examinfo.Grade = value.Grade
			examinfo.Specialty = value.Specialty
			examinfo.Class = value.Class
			examinfo.Organizer = value.Organizer
			examlist = append(examlist, examinfo)
		}
		return examlist, nil
	}
}
func GetExamContent(id string) ([]interface{}, error) {
	exam, err := exam_model.GetExamContent(id)
	if err != nil {
		return nil, err
	} else {
		return exam.Content, nil
	}
}
