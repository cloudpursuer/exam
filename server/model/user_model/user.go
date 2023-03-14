package user_model

/* import (
	"context"

	"github.com/qiniu/qmgo"
	"go.mongodb.org/mongo-driver/bson"
)

var UserColl *qmgo.Collection

type User struct {
	Name     string `json:"name"`
	Account  string `json:"account"`
	Password string `json:"password"`
	Position string `json:"position"`
}

// 用户登录
func Login(account string) (User, error) {
	one := User{}
	err := UserColl.Find(context.Background(), bson.M{"account": account}).One(&one)
	if err != nil {
		return one, err
	} else {
		return one, err
	}
} */
