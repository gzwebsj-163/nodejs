const model = require("../model/OpenToken.model");
const pub = require("../../public");

//查询Open_id
function Openid(){
    return new Promise(function (res) {
        model.OpenID().then(s => {
            let manages_map = pub.objToStrMap(s);
            let json = pub.strMapToJson(manages_map);
            res(json);
        })
    })
}
Openid();

module.exports = {
    OpenID:Openid
}