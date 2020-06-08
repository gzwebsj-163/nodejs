const datebase = require("../../unit/datebase");
const map = '../../unit/model/Manages.xml';


    /**
	 * 验证用户名是否存在
	 * @param {*} username 
	 */
    function LoginCheck_name(username){
    	return new Promise (function(res){
    		res(datebase.get_data(map,'check_manages_name',[username]));
    	})
    };

    /**
	 * 登录验证
	 * @param {*} username 
	 * @param {*} password 
	 */
    function LoginCheck(username,password){
    	return new Promise (function(res){
    		res(datebase.get_data(map,'select_manages',[username,password]));
    	})
	};
	
	/**
	 * 管理员列表
	 */
	function Manages_list(){
		return new Promise (function(res){
			res(datebase.get_data(map,'manages_list',null));
		})
	}

	/**
	 * 更新管理员权限
	 * @param {*} global 
	 * @param {*} id 
	 */
	function manages_global(global,id){
		return new Promise (function(res){
			res(datebase.get_data(map,'manages_global',[global,id]));
		})
	}

	/**
	 * 更新管理员状态
	 * @param {*} sw
	 * @param {*} id 
	 */
	function manages_switch(sw,id){
		return new Promise (function(res){
			res(datebase.get_data(map,'manages_switch',[sw,id]));
		})
	}




module.exports = {
	LoginCheck_name:LoginCheck_name,
	LoginCheck:LoginCheck,
	Manages_list:Manages_list,
	manages_global:manages_global,
	manages_switch:manages_switch
}