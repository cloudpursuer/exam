package v1

import (
	"server/model/answer_model"
	"server/service/answer_service"
	"server/util/app"

	"github.com/gin-gonic/gin"
)

type AnswerSubmitBody struct {
	ID        string        `json:"id" validate:"required"`
	Name      string        `json:"name" validate:"required"`
	Grade     string        `json:"grade" validate:"required"`
	Specialty string        `json:"specialty" validate:"required"`
	Organizer string        `json:"organizer" validate:"required"`
	Content   []interface{} `json:"content" validate:"required"`
}

// 提交答案
func SubmitAnswer(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	var body AnswerSubmitBody
	if !appG.ParseJSONRequest(&body) {
		return
	}
	var answer answer_model.Answer
	answer.ID = body.ID
	answer.Name = body.Name
	answer.Grade = body.Grade
	answer.Specialty = body.Specialty
	answer.Organizer = body.Organizer
	answer.Content = body.Content
	err := answer_service.SubmitAnswer(answer)
	if appG.HasError(err) {
		return
	}
	appG.SuccessResponse("答案提交成功")
}
