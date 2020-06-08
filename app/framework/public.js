const url = require("url");
const path = require("path");
const fs = require("fs");
const pub = require("./public");
const basepath = require('../framework/config/config');
const querystring = require("querystring");
function set_header(res,value,callback){
    if(!callback)return;
    callback = (res)=>{
        const o = Object.values(value);
        for(let i = 0; i < o.length; i++){
            res.setHeader(o[i]);
        }
    }
    return callback;
}

/**
 * 文件类型转换
 * @param {*} type 
 * @param {*} url 
 */
function typeConfirm(type, url) {
    let ext = path.extname(path.basename(url));
    if (type.contain(ext)) {
        return true;
    }
    return false;
}

Array.prototype.contain = function (obj) {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === obj)
            return true;
    }
    return false;
};

/**
 * css类型配置
 * @param {*} request 
 * @param {*} response 
 * @param {*} pathname 
 */
function getCSS(request, response, pathname) {
    fs.readFile(process.cwd() + pathname, function (e, result) {
        if (e) throw e;
        response.writeHead(200, { "Content-Type": "text/css" });
        response.write(result);
        response.end();
    });
}

/**
 * img图片配置
 * @param {*} request 
 * @param {*} response 
 * @param {*} pathname 
 */
function getImg(request, response, pathname) {
    fs.readFile(process.cwd() + pathname, function (e, result) {
        if (e) throw e;
        response.writeHead(200, { "Content-Type": "data:image/jpg;image/jpeg;image/gif;image/svg;image/bmp;base64," });
        response.write(result);
        response.end();
    });
}

/**
 * 文字文件配置
 * @param {*} request 
 * @param {*} response 
 * @param {*} pathname 
 */
function getFont(request, response, pathname) {
    fs.readFile(process.cwd() + pathname, function (e, result) {
        if (e) throw e;
        response.writeHead(200, { "Content-Type": "application/octet-stream" });
        response.write(result);
        response.end();
    })
}

/**
 * json文件配置
 * @param {*} request 
 * @param {*} response 
 * @param {*} pathname 
 */
function getJson(request, response, pathname) {
    fs.readFile(process.cwd() + pathname, function (e, result) {
        if (e) throw e;
        response.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
        response.write(result);
        response.end();
    })
}

/**
 * js文件配置
 * @param {*} request 
 * @param {*} response 
 * @param {*} pathname 
 */
function getScript(request, response, pathname) {
    fs.readFile(process.cwd() + pathname, function (e, result) {
        if (e) throw e;
        response.writeHead(200, { "Content-Type": "text/javascript" });
        response.write(result);
        response.end();
    });
}

/**
 * 读取文件源
 * @param {*} filepath 
 * @param {*} res 
 */
function readerFile(filepath, res) {
    let dist = path.resolve(basepath.config.dir.pages_dir, filepath);
    fs.readFile(dist, (e, data) => {
        console.log(dist);
        if (e) return;
            else {
                const str = data.toString();
                const imgReg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
                const arr = [];
                while (tem = imgReg.exec(str)) {
                    arr.push(tem[2]);
                }
                if (arr.length !== 0) {
                    const temp_str = arr.join(',');
                    const temp_arr = temp_str.split(',');
                    for (let i = 0; i < temp_arr.length; i++) {
                        const chunks = fs.readFileSync(temp_arr[i]);
                        const base64img = chunks.toString('base64');
                        const urldata = "data:image/jpg;image/jpeg;image/gif;image/svg;image/bmp;base64," + base64img + "";
                        data = data.toString().replace(new RegExp(temp_arr[i], 'igm'), urldata);
                    }
                }
            }
            res.end();
        }
    );
}

/**
 * 公有json
 * @param {*} msg 
 * @param {*} code 
 * @param {*} state 
 */
function public_json(msg,code,state){
    const obj = {
        msg:msg,
        code:code,
        state:state
    }
    return JSON.stringify(obj);
}

/**
 * strMap 转 obj
 * @param {*} strMap 
 */
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

/**
 * obj 转 strMap
 * @param {*} obj 
 */
function objToStrMap(obj) {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}

/**
 * strMap 转 json
 * @param {*} strMap 
 */
function strMapToJson(strMap) {
    return JSON.stringify(strMapToObj(strMap));
}

/**
 * 判断是否是post数据
 * @param {*} req 
 * @param {*} res 
 * @param {*} url 
 */
function isPost(req,res,url){
    let body = "";
    if(req.method === 'POST' && req.url === url){
        req.on('data',(chunk)=>{
            body += chunk;
            body = querystring.parse(body);
            for(let key in body){
                let json = JSON.parse(key);
                let jdk = json.data;
                for(let i = 0; i < jdk.length; i++){
                    return jdk[i];
                }
            }
        })
        res.end();
    }
}


module.exports = {
    set_header:set_header,
    typeConfirm:typeConfirm,
    getCSS:getCSS,
    getImg:getImg,
    getFont:getFont,
    getJson:getJson,
    getScript:getScript,
    readerFile:readerFile,
    public_json:public_json,
    strMapToObj:strMapToObj,
    objToStrMap:objToStrMap,
    strMapToJson:strMapToJson,
    isPost:isPost
};