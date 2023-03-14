package main

import (
	"fmt"
	"net/http"
	"time"

	"server/model"
	"server/router"
	"server/util/validator"
)

func init() {
	validator.Setup()
	model.Init()
}

func main() {

	/* app := gin.Default()
	app.Use(cors.Default())
	//login
	app.POST("api/v2/login", func(ctx *gin.Context) {
		var user user_model.User
		err := ctx.ShouldBind(&user)
		if err != nil {
			fmt.Println("ctx.ShouldBindJSON err: ", err)
			return
		}
		account := user.Account
		password := MD5(user.Password)
		one, err := user_model.Login(account)
		if (err != nil) || (password != one.Password) {
			rspMap := map[string]interface{}{
				"code": 403,
				"rsp":  "密码错误",
			}
			ctx.JSON(http.StatusForbidden, rspMap)
		} else {
			rspMap := map[string]interface{}{
				"code":     200,
				"rsp":      "登录成功",
				"position": one.Position,
			}
			ctx.JSON(http.StatusOK, rspMap)
			fmt.Println(password, account)
		}
	}) */
	//app.Run("localhost:8080")

	timeLocal := time.FixedZone("CST", 8*3600)
	time.Local = timeLocal
	httpPort := fmt.Sprintf(":%d", 8080)
	server := &http.Server{
		Addr:           httpPort,
		Handler:        router.InitRouter(),
		MaxHeaderBytes: 1 << 20,
	}
	if err := server.ListenAndServe(); err != nil {
		fmt.Println(err)
	}

}
