package admin_service

import (
	"server/model/admin_model"
	"server/util/errors"
	"server/util/sign"
)

// 生成管理员token
func GenerateToken(account string, password string) (interface{}, interface{}, error) {
	var admin admin_model.AdminItem
	var token string
	admin, err := admin_model.GetAdminInfo(account)
	if err != nil {
		return nil, nil, err
	}
	if admin.Password != sign.EncodeMD5(password) {
		return nil, nil, errors.BadError("密码错误")
	}
	switch admin.Position {
	case "admin":
		token, err = sign.GenToken(account, account, sign.AdminClaimsType)
	case "superAdmin":
		token, err = sign.GenToken(account, account, sign.AdminClaimsType)
	}
	if err != nil {
		return nil, nil, err
	}

	return token, admin.Position, nil
}
