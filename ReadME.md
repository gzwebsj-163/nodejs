# 云端api数据开放源项目
##编程语言：NodeJS+MySql数据交互
***
##项目介绍：
大家好，我是disman，nodejs开源模块，xml＋map查询数据库，暂时只支持mysql。数据表现：json形态。多条数据能同时快速的查询。喜欢的朋友请慢用。版本会继续更新，做api的朋友们肯定是一个不错的选择。只要懂查询语句，就能帮到你实现愿望。数据库的查询，就从这里开始。。。。。
***
##使用方法：
就用java中的map差不多，只要有会java的朋友们就知道map的操作。希望各位能理解我的意思。只要你懂得查询语句，跟nodejs数据结合那就是简单。
***
		*－－表达式
		
		map ＝ xml + 键值 + 查询语句 注意：是xml格式

       <mysql id="mysql" name="name" value="SELECT * FROM test WHERE name=?"></mysql>
***
		* JSON
		查询结果 : {0:{"name":"disman","arg":"20","sex":"男"}}
***
	备注：
api结构：已经处理成 ＋ json对象。直接调用即可。
建议结合：c＋＋使用，达到云api概念。
***
	/**
	 * 列表查询
	 * 数据模型
	 * 注意：需要回调方法
	 */
	function list(){
		return new Promise (function(res){
			res(datebase.get_data(map,'list',null));
		})
	}
***

	/**
		 * 列表查询
		 * 模型层
		 * 注意：需要回调方法
		 */
		function list() {
		    return new Promise(function (res) {
		        list().then(rs => {
		        //公共类的方法 objtostrmap
		            let map = pub.objToStrMap(rs);
		            let json = 
		            //自己转json
		            pub.strMapToJson(map);
		            res(json);
		        })
		    })
		}
		
nodejs最噁心就是回调，但是这个回调可是异步跟同步的差异咯。那也是必须遵守规则的。此版本只是初型。那只能说是测试版咯。我会继续更新的。请各位好好的在坑里摩擦出好的东西。
###THE END
	




