var yunapi = require("./yunapi.node");
var node = require("./framework/system/controller/Opentoken.controller.js")
const koa = require('koa');
const app = new koa();
const config = require('./framework/config/config');
const Router = require('koa-router');
const router = new Router();
const json = require('koa-json');
const common = require('./framework/common/common');
const middle = require('./framework/common/middle');
const koabody = require('koa-body');
app.use(json({ pretty: false, param: 'pretty' }));
app.use(koabody({}));

class App {
    constructor(data) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    set data(val) {
        this._data = val;
    }
}


const dis_man = {
    //openid
    data: {
        data(){
            return new App(common.OpenID.OpenID().then(res=> {
                console.log(res);
                return JSON.parse(res);
            }));
        }
    }
};

const o = dis_man.data.data();

const obj = {};

//数据绑定
Object.defineProperty(obj, 'dis_main_data', {
    enumerable: false,
    onfigurable: true,
    writable: false,
    value: (prop, handle)=> {
        let oval = this[prop],
            nval = oval,
            get = function () {
                return dis_man.data.data();
            },
            set = function (val) {
                oval = JSON.parse(nval);
                return  nval = handle.call(this, prop, oval, dis_man.data.data.value = val);
            };
        if (delete this[prop]) {
            Object.defineProperty(this, prop, {
                get: get
                , set: set
                , enumerable: true
                , configurable: true
            });
        }
    }
});


if (!Object.prototype.unwatch) {
    Object.defineProperty(Object.prototype, "unwatch", {
        enumerable: false
        , configurable: true
        , writable: false
        , value: function (prop) {
            var val = this[prop];
            delete this[prop];
            this[prop] = val;
        }
    });
}

obj.dis_main_data();

dis_man.data.data()["_data"].then(res=>{
    router.get(config.config.api.openapi,ctx=>{
        ctx.body = res;
    })
});

app.use(router.routes());
app.listen(config.config.port, () => {
    console.log('start server');
})






