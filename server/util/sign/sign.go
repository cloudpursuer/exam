package sign

import (
	"time"

	"github.com/dgrijalva/jwt-go"
)

type ClaimsType string

const (
	AdminClaimsType      ClaimsType = "admin-claims-type"   //管理员用户
	SuperAdminClaimsType ClaimsType = "super-claims-type"   //超级管理员用户
	StudentClaimsType    ClaimsType = "student-claims-type" //学生用户
)
const secret = "asdadfadassdsadass"

type Claims struct {
	Type ClaimsType
	jwt.StandardClaims
}

func GenToken(account string, issuer string, claimsType ClaimsType, minute ...int) (string, error) {
	nowTime := time.Now()
	var expireTime time.Time
	if len(minute) > 0 {
		expireTime = nowTime.Add(time.Duration(minute[0]) * time.Minute)
	} else {
		expireTime = nowTime.Add(7 * 24 * time.Hour)
	}
	claims := Claims{
		claimsType,
		jwt.StandardClaims{
			ExpiresAt: expireTime.Unix(),  // 失效时间
			IssuedAt:  time.Now().Unix(),  // 签发时间
			NotBefore: time.Now().Unix(),  // 生效时间
			Issuer:    issuer,             // 签发人
			Subject:   string(claimsType), // 主题
			Audience:  account,            // 受众
		},
	}
	tokenClaims := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	token, err := tokenClaims.SignedString([]byte(secret))
	return token, err
}

func ParseToken(token string) (*Claims, error) {
	jwtToken, err := jwt.ParseWithClaims(token, &Claims{}, func(token *jwt.Token) (interface{}, error) {
		return []byte(secret), nil
	})
	if jwtToken != nil {
		if claims, ok := jwtToken.Claims.(*Claims); ok && jwtToken.Valid {
			return claims, nil
		}
	}
	return nil, err
}
