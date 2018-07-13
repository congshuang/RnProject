<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
  <style type="text/css">
  	.index-button{margin-bottom: 30px;}
	.index-button div{margin: 20px 30px 10px;}
	.index-button .layui-btn+.layui-btn{margin-left: 0;}
	.index-button .layui-btn{margin: 0 7px 10px 0; }
  </style>
</head>
<body>
  <div style="margin: 30px;" id="testApp">
   	<span>账户</span><input v-model='account' />
   	<span>密码</span><input v-model='password' />
   	<input @click='login()' type="button" value="登录" />	
   </div>
   
   <div id='userlist'>
   <span v-if='me.userInfo != null'>{{me.userInfo.name}} 欢迎回来！你的朋友列表如下：</span>
   	<ul> 
   		<user-label v-for="user in users" :user="user" :key="user.id">
   		</user-label>
   	</ul>
   </div>
    <div id='grouplist'>
   <span v-if='me.userInfo != null && groups != null'>{{me.userInfo.name}} 你的朋友群列表如下：</span>
   	<ul> 
   		<group-label v-for="group in groups" :group="group" :key="group.id">
   		</group-label>
   	</ul>
   	<span v-if='reGroup != null'>向{{reGroup.name}}发送信息:<input v-model='imessage' /><input type="button" value='发送' @click='sendMessage()' /></span>
   	<ul> 
   		<li v-for="message in messages">{{message.user.userInfo.name}}在{{message.time}}说：{{message.content}}</li>
   	</ul>
   </div>
   
   
    <div id='chatPanel' v-if='reuser.userInfo != null || messages.length != 0'>
    	发信息给 {{reuser.userInfo.name}}:<input v-model='imessage' /><input type="button" value='发送' @click='sendMessage()' />
   	<ul> 
   		<li v-for="message in messages">{{message.user.userInfo.name}}在{{message.time}}说：{{message.content}}</li>
   	</ul>
   </div>
   
   <script type="text/javascript" src="js/vue.js"></script>
   <script type="text/javascript" src="js/vuex.js"></script>
   <script type="text/javascript" src="js/util.js"></script>  
   <script type="text/javascript" src="js/message.js?v=1"></script>
   <script type="text/javascript" src="js/messagebody.js"></script>
   <script type="text/javascript" src="js/vue-resource.min.js"></script>
   <script type="text/javascript" src="js/websocketconfig.js"></script>
   <script type="text/javascript" src="js/vue-cookie.js"></script>
   
   
   <script type="text/javascript">
   let contactsMap = {};
   	var reMsg = function(c1,c2,c3){
   		console.log(c1+" "+c2+" "+c3);
   	}
   	
   	Date.prototype.Format = function (fmt) { //author: meizz 
   	    var o = {
   	        "M+": this.getMonth() + 1, //月份 
   	        "d+": this.getDate(), //日 
   	        "h+": this.getHours(), //小时 
   	        "m+": this.getMinutes(), //分 
   	        "s+": this.getSeconds(), //秒 
   	        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
   	        "S": this.getMilliseconds() //毫秒 
   	    };
   	    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
   	    for (var k in o)
   	    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
   	    return fmt;
   	}
  
	  var initWebsocket1 = function (currentId){
		  currentId = ''+currentId;
	   	  //初始化websocket
			  if (!window.WebSocket) {
			      window.WebSocket = window.MozWebSocket; 
			  }  
			  if (window.WebSocket) {
		          socket = new WebSocket(websocketurl);
		          socket.binaryType = "arraybuffer"; 
		          //收到消息后
		          socket.onmessage = function(event) {
		          	  if (event.data instanceof ArrayBuffer){
		          	       var msg =  proto.Model.deserializeBinary(event.data);      //如果后端发送的是二进制帧（protobuf）会收到前面定义的类型
		          	       //心跳消息
		          	       if(msg.getCmd()==2){
		          	    	   //发送心跳回应
		          	    	   var message1 = new proto.Model();
		                       message1.setCmd(1);
		                       socket.send(message1.serializeBinary());
		          	       }else if(msg.getCmd()==3){
		          	    	   if(msg.getSender()!=currentId){
		          	    		var user = contactsMap[msg.getSender()];
		          	    		user.online = true;
		          	    		var username = user.userInfo.name;	          	    		  
		          	    		console.log("用户"+username+"上线了");
		          	    	   }
		          	       }else if(msg.getCmd()==4){
		           	    	if(msg.getSender()!=currentId){
		          	    		var user = contactsMap[msg.getSender()];
		          	    		if(!!user)user.online = false;
		          	    		var username = user.userInfo.name;	          	    		  
		          	    		console.log("用户"+username+"下线了");
		          	    	   }	          	    	   
		          	    	   }else if(msg.getCmd()==5){
		          	    	   //显示非自身消息    
		          	    	   if(msg.getSender()!=currentId){
		          	    		
		          	    		   //不显示用户组消息
		          	    		   var msgCon =  proto.MessageBody.deserializeBinary(msg.getContent()); 
		          	    		 console.log(msgCon.getContent())
		          	    		   if(msg.getGroupid()==null||msg.getGroupid().length<1){
		          	    			chatPanelApp.receiveMessage(msgCon.getContent(),contactsMap[msg.getSender()+''],msg.getTimestamp())
		          	    		   }else{
		          	    			 groupsApp.receiveMessage(msgCon.getContent(),contactsMap[msg.getSender()+''],msg.getTimestamp())
		          	    		   } 
		          	    	   } 
		          	       }
		          	  }else {
		                    var data = event.data;                //后端返回的是文本帧时触发
		              } 
		          };
		          //连接后
		          socket.onopen = function(event) {
		        	   var message = new proto.Model();
		        	   var browser=BrowserUtil.info();
			   	       message.setVersion("1.0");
			   	       message.setDeviceid("")
			   	       message.setCmd(1);
			   	       message.setSender(currentId);
			   	       message.setMsgtype(1); 
			   	       message.setFlag(1);
			   	       message.setPlatform(browser.name);
			   	       message.setPlatformversion(browser.version);
			   	       message.setToken(currentId);
			   	       var bytes = message.serializeBinary();  
		               socket.send(bytes);
		          };
		          //连接关闭
		          socket.onclose = function(event) {
		        	  reMsg("","","连接已关闭,欢迎下次光临！");
			      };
		      } else {
		          console.log("你的浏览器不支持websocket！");
		      }
	   	}
	  
	  
	  var initWebsocket = function (currentId){
		  currentId = ''+currentId;
	   	  //初始化websocket
			  if (!window.WebSocket) {
			      window.WebSocket = window.MozWebSocket; 
			  }  
			  if (window.WebSocket) {
		          socket = new WebSocket(websocketurl);
		          socket.binaryType = "arraybuffer"; 
		          //收到消息后
		          socket.onmessage = function(event) {
		          	  if (typeof event.data == 'string'){
		          	       var msg = JSON.parse(event.data);      //如果后端发送的是二进制帧（protobuf）会收到前面定义的类型
		          	       console.log(msg)
		          	       //心跳消息
		          	       if(msg.cmd==2){
		          	    	   //发送心跳回应
		          	    	   var message1 = {};
		                       message1.cmd=1;
		                       socket.send(JSON.stringify(message1));
		          	       }else if(msg.cmd==3){
		          	    	   if(msg.sender!=currentId){
		          	    		var user = contactsMap[msg.sender];
		          	    		user.online = true;
		          	    		var username = user.userInfo.name;	          	    		  
		          	    		console.log("用户"+username+"上线了");
		          	    	   }
		          	       }else if(msg.cmd==4){
		           	    	if(msg.sender!=currentId){
		          	    		var user = contactsMap[msg.sender+''];
		          	    		if(!!user)user.online = false;
		          	    		var username = user.userInfo.name;	          	    		  
		          	    		console.log("用户"+username+"下线了");
		          	    	   }	          	    	   
		          	    	   }else if(msg.cmd==5){
		          	    	   //显示非自身消息    
		          	    	   if(msg.sender!=currentId){
		          	    		
		          	    		   //不显示用户组消息
		          	    		   var msgCon =  msg.content; 
		          	    		 console.log(msgCon.content)
		          	    		   if(msg.groupid==null||msg.groupid.length<1){
		          	    			chatPanelApp.receiveMessage(msgCon.content,contactsMap[msg.sender+''],msg.timestamp)
		          	    		   }else{
		          	    			 groupsApp.receiveMessage(msgCon.content,contactsMap[msg.sender+''],msg.timestamp)
		          	    		   } 
		          	    	   } 
		          	       }
		          	  }else {
		                    var data = event.data;                //后端返回的是文本帧时触发
		              } 
		          };
		          //连接后
		          socket.onopen = function(event) {
		        	   var message = {};
		        	   var browser=BrowserUtil.info();
			   	       message.version="1.0";
			   	       message.deviceid="";
			   	       message.cmd=1;
			   	       message.sender=currentId;
			   	       message.msgtype=1; 
			   	       message.flag=1;
			   	       message.platform=browser.name;
			   	       message.platformversion=browser.version;
			   	       message.token=currentId;
			   	       //var bytes = message.serializeBinary();
		               socket.send(JSON.stringify(message));
		          };
		          //连接关闭
		          socket.onclose = function(event) {
		        	  reMsg("","","连接已关闭,欢迎下次光临！");
			      };
		      } else {
		          console.log("你的浏览器不支持websocket！");
		      }
	   	}
	  //发送消息
      var sendMsg1=function(seuser,reuser,msg,isGroup){
		  console.log(isGroup)
		  console.log(reuser)
		  
    	  var message = new proto.Model(); 
      	  var content = new proto.MessageBody();
           message.setMsgtype(4)
           message.setCmd(5);
           if(!!isGroup){
        	   message.setGroupid(reuser);//群组
           }else{
        	   message.setReceiver(reuser);//机器人ID默认为0
           }
           message.setToken(seuser);  
           message.setSender(seuser);
          
           content.setContent(msg);
           content.setType(0)
           message.setContent(content.serializeBinary())
           socket.send(message.serializeBinary());
	  }
	  
    //发送消息
      var sendMsg=function(seuser,reuser,msg,isGroup){
		  
    	 // var message = new proto.Model(); 
      	 // var content = new proto.MessageBody();
      	  var message = {};
      	  var content = {};
      	  
          // message.setMsgtype(4)
           message.msgtype = 4;
          // message.setCmd(5);
           message.cmd = 5;
           
           if(!!isGroup){
        	  // message.setGroupid(reuser);//群组
        	   message.groupid = reuser;
           }else{
        	//   message.setReceiver(reuser);//机器人ID默认为0
        	   message.receiver = reuser;
           }
          // message.setToken(seuser);  
           message.token=seuser;
          // message.setSender(seuser);
           message.sender=seuser;
           
           
          // content.setContent(msg);
           content.content = msg;
          // content.setType(0);
           content.type = 0;
          // message.setContent(content);
           message.content = content;
           socket.send(JSON.stringify(message));
         //  message.setContent(content.serializeBinary())
          // socket.send(message.serializeBinary());
	  }
	  
   
   var testApp = new Vue({
	   el: '#testApp',
	   data: {
		   account: '',
		   password:''
	   },
   	   methods:{
   		 login:function(){
   			 console.log(this.account)
   			console.log(this.password)
   			var that = this;
   		  this.$http.get('silence/login?account='+this.account+'&password='+this.password).then(function(res){
   			  if(res.data.code == -1)return;
   			  //登录成功之后 打开websocket
              that.showUserList(res.body.data);
              initWebsocket(res.body.data.id);
              
            },function(){
              console.log('登录失败');
            });
   		 },
   		showUserList:function(me){
   		  this.$http.post('useraccount/list',{},{emulateJSON: true}).then(function(res){
   		//	usersApp.data.users= res.bd
   			  //登录成功之后 打开websocket
   			var userListObj = eval('('+res.data+')');
   			usersApp.me = me;
   			chatPanelApp.me = me;
   			usersApp.users = userListObj.data;
   			//存储联系人信息为可以维护
   			for(var i = 0;i < usersApp.users.length;i++){
   				var cell = usersApp.users[i];
   				contactsMap[cell.id+'']=cell;
   			}
   			console.log(contactsMap)
            },function(){
              console.log('获取用户列表失败');
            });
   		  
   		this.$http.get('getgroups',{},{emulateJSON: true}).then(function(res){
   	   		var outdata = eval(res.body);
   	   		groupsApp.groups = outdata;
   	 		groupsApp.me = me;
   	            },function(){
   	              console.log('获取用户群组失败');
   	            });
   	   		  
   		
   	  }
   	   }
	 });
   
   
   Vue.component('user-label', {
	   props: ['user'],
	   template: ' <li><a href="javascript:void(0)" @click="chatwith()">{{user.userInfo.name}}</a>-<span v-if="user.online == true">在线</span><span v-else>离线</span></li>',
	   methods:{
		   chatwith:function(){
			   chatPanelApp.reuser=this.user;
			   this.$http.get('historymessageajax?id='+this.user.id+'&skipToPage=1&pageSize=20').then(function(res){
		   			  if(res.data.code == -1)return;
		   				var outdata = eval("("+res.data+")");
		   			 	for(var i = outdata.data.length-1;i>-1;i--){
		   			 		var cell = outdata.data[i]
		   			 		chatPanelApp.messages.push({user:{userInfo:{name:cell.sendusername}},time:cell.createdate.substring(0,cell.createdate.length-2),content:cell.content});
		   			 	}
		              
		            },function(){
		              console.log('获取聊天记录失败');
		            });
		   }
	   }
   })
      
   Vue.component('group-label', {
	   props: ['group'],
	   template: ' <li><a href="javascript:void(0)" @click="chatwith()">{{group.name}}</a></li>',
	   methods:{
		   chatwith:function(){
			   groupsApp.reGroup=this.group;
			   
			   this.$http.get('historymessageajax?gid='+this.group.id+'&skipToPage=1&pageSize=20').then(function(res){
		   			  if(res.data.code == -1)return;
		   				var outdata = eval("("+res.data+")");
		   			 	for(var i = outdata.data.length-1;i>-1;i--){
		   			 		var cell = outdata.data[i];
		   			 		groupsApp.messages.push({user:{userInfo:{name:cell.sendusername}},time:cell.createdate.substring(0,cell.createdate.length-2),content:cell.content});
		   			 	}
		            },function(){
		              console.log('获取聊天记录失败');
		            });
		   }
	   }
   })
   var usersApp = new Vue({
	   el: '#userlist',
	   data: {
		   me:{userInfo:null},
		   users: []
	   }
	   });
   
   var groupsApp = new Vue({
	   el: '#grouplist',
	   data:{
		   me:{userInfo:null},
		   groups:[],
		   reGroup:null,
		   messages:[],
		   imessage:null
	   },
	   methods:{
		   sendMessage:function(){
			   if(!this.imessage){alert('请输入消息再发送！');return}
			   sendMsg(this.me.id+'',this.reGroup.id+'',this.imessage,true);
			   this.messages.push({user:this.me,time:(new Date().Format("yyyy-MM-dd hh:mm:ss")),content:this.imessage});
		   },
		   receiveMessage:function(message,sender,time){
			   this.messages.push({user:sender,time:time,content:message});
		   }
	   }
   })
   
   var chatPanelApp = new Vue({
	   el:'#chatPanel',
	   data:{
		   me:{},
		   reuser:{},
		   messages:[],
	   	   imessage:null
	   },
	   methods:{
		   sendMessage:function(){
			   if(!this.imessage){alert('请输入消息再发送！');return}
			   sendMsg(this.me.id+'',this.reuser.id+'',this.imessage);
			   this.messages.push({user:this.me,time:(new Date().Format("yyyy-MM-dd hh:mm:ss")),content:this.imessage});
		   },
		   receiveMessage:function(message,sender,time){
			   console.log(sender)
			   if(!this.reuser.userInfo)this.reuser = sender;
			   
			   this.messages.push({user:sender,time:time,content:message});
		   }
	   }
	   
   })
   
   </script>
   
</body>
</html>