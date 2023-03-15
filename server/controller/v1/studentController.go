package v1

import (
	"server/util/app"

	"github.com/gin-gonic/gin"
)

type StudentLoginBody struct {
	Account  string `json:"account" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func StudentLogin(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	var body AdminLoginBody
	if !appG.ParseJSONRequest(&body) {
		return
	}
	appG.SuccessResponse("student")
}
