package student_service

import (
	"server/model/student_model"
	"server/util/errors"
	"server/util/sign"
)

func GenerateToken(account string, password string) (interface{}, error) {
	var student student_model.Student
	var token string
	student, err := student_model.FindStudentInfo(account)
	if err != nil {
		return nil, errors.BadError("密码错误")
	}
	if student.Password != sign.EncodeMD5(password) {
		return nil, err
	}
	token, err = sign.GenToken(account, account, sign.StudentClaimsType)
	if err != nil {
		return nil, err
	}
	return token, nil
}
func HashStudentPassword(student student_model.Student) student_model.Student {
	var newStudent student_model.Student
	newStudent.ID = student.ID
	newStudent.Name = student.Name
	newStudent.Password = sign.EncodeMD5(student.Password)
	newStudent.Grade = student.Grade
	newStudent.Specialty = student.Specialty
	newStudent.Class = student.Class
	return newStudent
}
