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
	var body exam_model.ExamT
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

// 获取所有考试列表
func GetAllExamList(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	examlist, err := exam_service.GetExamList()
	if err != nil {
		appG.BadResponse("出错了")
		return
	}
	appG.SuccessResponse(examlist)
}

// 获取考试内容
type getContentBody struct {
	Id string `json:"id"`
}

func GetExamContent(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	var body getContentBody
	if !appG.ParseJSONRequest(&body) {
		return
	}
	content, err := exam_service.GetExamContent(body.Id)
	if err != nil {
		appG.BadResponse("出错了")
		return
	}
	appG.SuccessResponse(content)
}

// 删除考试
func DelExam(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	var body getContentBody
	if !appG.ParseJSONRequest(&body) {
		return
	}
	err := exam_model.DelExam(body.Id)
	if err != nil {
		appG.BadResponse("出错了")
		return
	}
	appG.SuccessResponse("考试成功删除")
}
