package api

import (
	"encoding/json"
	"fmt"
	"github.com/gin-gonic/gin"
	"mall.com/common"
	"mall.com/global"
	"mall.com/models"
	"mall.com/response"
	"net/http"
)

// WebGetCaptcha 获取验证码
func WebGetCaptcha(c *gin.Context) {
	id, b64s, _ := common.GenerateCaptcha()
	data := map[string]interface{}{"captchaId": id, "captchaImg": b64s}
	response.Success("操作成功", data, c)
}

// WebUserLogin 后台管理用户登录
func WebUserLogin(c *gin.Context) {
	var param models.WebUserParam
	_ = c.ShouldBindJSON(&param)

	// 检查验证码
	if !common.VerifyCaptcha(param.CaptchaId, param.CaptchaValue) {
		response.Failed("验证码错误", c)
		return
	}
	// 生成token
	uid := user.WebLogin(param)
	if  uid > 0 {
		token, _ := common.GenerateToke(param.Username)
		res := map[string]interface{}{"token": token, "uid": uid}
		response.Success("登录成功", res, c)
		return
	}
	response.Failed("用户名或密码错误", c)
}

// AppUserLogin 微信小程序用户登录
func AppUserLogin(c *gin.Context) {
	var acsJson models.AppCode2SessionJson
	acs := models.AppCode2Session{
		Code:      c.PostForm("code"),
		AppId:     global.Config.Code2Session.AppId,
		AppSecret: global.Config.Code2Session.AppSecret,
	}
	api := "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code"
	path := fmt.Sprintf(api, acs.AppId, acs.AppSecret, acs.Code)
	res, err := http.DefaultClient.Get(path)
	if err != nil {
		fmt.Println("微信登录凭证校验接口请求错误")
		return
	}
	if err := json.NewDecoder(res.Body).Decode(&acsJson); err != nil {
		fmt.Println("decoder error...")
		return
	}
	response.Success("登录成功", acsJson.OpenId, c)
}
