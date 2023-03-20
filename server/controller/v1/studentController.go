package v1

import (
	"server/model/student_model"
	"server/service/student_service"
	"server/util/app"

	"github.com/gin-gonic/gin"
)

type StudentLoginBody struct {
	Account  string `json:"account" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func StudentLogin(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	var body StudentLoginBody
	if !appG.ParseJSONRequest(&body) {
		return
	}
	token, err := student_service.GenerateToken(body.Account, body.Password)
	if appG.HasError(err) {
		return
	}
	appG.StuLoginSuccessResponse(token)
}

type AddManyStudentInfoBody struct {
	StudentList []student_model.Student `json:"student-list" validate:"required"`
}

func AddManyStudentInfo(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	var body AddManyStudentInfoBody
	if !appG.ParseJSONRequest(&body) {
		return
	}
	var newStudentList []student_model.Student
	for _, value := range body.StudentList {
		newStudentList = append(newStudentList, student_service.HashStudentPassword(value))
	}
	err := student_model.AddManyStudentInfo(newStudentList)
	if appG.HasError(err) {
		return
	}
	appG.SuccessResponse("学生添加成功")
}
