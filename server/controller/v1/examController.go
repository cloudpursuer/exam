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
	err := exam_service.AddOneExam(body.Name, body.StartTime, body.Duration, body.Day, body.Month, body.Position, body.Number, body.Grade, body.Specialty, body.Class, body.Organizer, body.Content)
	if err != nil {
		appG.BadResponse("添加失败")
		return
	}
	appG.SuccessResponse("考试添加成功")
}

// 获取当天的全部考试
func GetTodayExam(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	examArr, err := exam_model.GetRecentExam()
	if err != nil {
		appG.BadResponse("出错了")
		return
	}
	appG.SuccessResponse(examArr)
}
