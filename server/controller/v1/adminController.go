package v1

import (
	"server/service/admin_service"

	"server/util/app"

	"github.com/gin-gonic/gin"
)

type AdminLoginBody struct {
	Account  string `json:"account" validate:"required"`
	Password string `json:"password" validate:"required"`
}

func AdminLogin(c *gin.Context) {
	appG := app.Gin{Ctx: c}
	var body AdminLoginBody
	if !appG.ParseJSONRequest(&body) {
		return
	}
	token, position, err := admin_service.GenerateToken(body.Account, body.Password)
	if appG.HasError(err) {
		return
	}
	appG.AdminLoginSuccessResponse(token, position)
}
