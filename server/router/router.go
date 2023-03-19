package router

import (
	v1 "server/controller/v1"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	r := gin.New()
	//全局 Recovery 中间件从任何 panic 恢复，如果出现 panic，它会写一个 500 错误。
	r.Use(gin.Recovery())
	//全局 跨域中间件
	r.Use(cors.Default())

	//v1版本
	V1 := r.Group("/v1")
	initAdminRouter(V1)
	initStudentRouter(V1)
	initExamRouter(V1)

	return r
}

func initAdminRouter(V1 *gin.RouterGroup) {
	admin := V1.Group("/admin")
	{
		// 管理员登录
		admin.POST("/login", v1.AdminLogin)
	}
}

func initStudentRouter(V1 *gin.RouterGroup) {
	student := V1.Group("/student")
	{
		student.POST("/login", v1.StudentLogin)
	}
}
func initExamRouter(V1 *gin.RouterGroup) {
	exam := V1.Group("/exam")
	{
		exam.GET("/recent", v1.GetTodayExam)
		exam.POST("/addone", v1.AddOneExam)
	}
}
