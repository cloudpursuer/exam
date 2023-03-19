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
