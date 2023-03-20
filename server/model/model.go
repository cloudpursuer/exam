package model

import (
	"context"

	"log"
	"server/model/admin_model"
	"server/model/answer_model"
	"server/model/exam_model"
	"server/model/student_model"

	"github.com/qiniu/qmgo"
)

var ctx context.Context
var client *qmgo.Client
var err error

func Init() {
	ctx = context.Background()
	client, err = qmgo.NewClient(ctx, &qmgo.Config{Uri: "mongodb://localhost:27017"})
	if err != nil {
		log.Fatal("数据库初始化错误")
	}
	db := client.Database("exam")
	admin_model.AdminColl = db.Collection("admin")
	exam_model.ExamColl = db.Collection("exam")
	answer_model.AnswerColl = db.Collection("answer")
	student_model.StudentColl = db.Collection("student")
	//loadAdmin(admin_model.AdminColl)
	//loadAdmin(user_model.UserColl)
	//defer DBClose()
}

/* func loadAdmin(Coll *qmgo.Collection) {
	filePtr, err := os.OpenFile("./model/admin.json", os.O_RDONLY, 0666)
	if err != nil {
		println(err)
	}
	var result admin_model.AdminList
	defer filePtr.Close()
	decoder := json.NewDecoder(filePtr)
	err = decoder.Decode(&result)
	if err != nil {
		log.Println("解码错误")
	} else {
		for i := range result.Admin {
			result.Admin[i].Password = sign.EncodeMD5(result.Admin[i].Password)
		}
		for i := range result.SuperAdmin {
			result.SuperAdmin[i].Password = sign.EncodeMD5(result.SuperAdmin[i].Password)
		}
		Coll.InsertMany(context.TODO(), result.Admin)
		Coll.InsertMany(context.TODO(), result.SuperAdmin)
	}
} */
