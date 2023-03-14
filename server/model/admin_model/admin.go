package admin_model

import (
	"context"

	"github.com/qiniu/qmgo"
	"go.mongodb.org/mongo-driver/bson"
)

var AdminColl *qmgo.Collection

type AdminItem struct {
	Name     string `json:"name"`
	Account  string `json:"account"`
	Password string `json:"password"`
	Position string `json:"position"`
}
type AdminList struct {
	Admin      []AdminItem `json:"admin"`
	SuperAdmin []AdminItem `json:"superAdmin"`
}

// 添加一个管理员
func AddOneAdmin(admin AdminItem) error {
	_, err := AdminColl.InsertOne(context.TODO(), admin)
	return err
}

// 批量添加管理员
func AddManyAdmin(adminList []AdminItem) error {
	_, err := AdminColl.InsertMany(context.Background(), adminList)
	return err
}

// 删除一个管理员
func DelOneAdmin(account string) error {
	filter := bson.M{"account": account}
	err := AdminColl.Remove(context.TODO(), filter)
	return err
}

// 通过管理员账号修改管理员密码
func MutPassword(account string, password string) error {
	filter := bson.M{"account": account}
	err := AdminColl.UpdateOne(context.TODO(), filter, bson.M{"$set": bson.M{"password": password}})
	return err
}

// 获取所有的管理员信息
func GetAllAdminInfo() ([]AdminItem, error) {
	info := []AdminItem{}
	filter := bson.M{}
	err := AdminColl.Find(context.Background(), filter).All(&info)
	if err != nil {
		return info, err
	} else {
		return info, err
	}
}

// 通过管理员账号获得管理员信息
func GetAdminInfo(account string) (AdminItem, error) {
	one := AdminItem{}
	err := AdminColl.Find(context.Background(), bson.M{"account": account}).One(&one)
	if err != nil {
		return one, err
	} else {
		return one, err
	}
}
