package v1

import (
	"server/model/exam_model"
	"server/service/exam_service"
	"server/util/app"

	"github.com/gin-gonic/gin"
)

// 添加一个考试
func AddOneExam(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	var body exam_model.Exam
	if !appG.ParseJSONRequest(&body) {
		return
	}
	err := exam_service.AddOneExam(body.Name, body.StartTime, body.Duration, body.Date, body.Position, body.Number, body.Grade, body.Specialty, body.Class, body.Organizer, body.Content)
	if err != nil {
		appG.BadResponse("添加失败")
		return
	}
	appG.SuccessResponse("考试添加成功")
}
