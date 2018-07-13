import React, { Component } from 'react';
import { AppRegistry,
    StyleSheet,
    Image,
    Text,
    TextInput,
    ActivityIndicator,
    TouchableOpacity,
    AsyncStorage,
    BackHandler,
    ToastAndroid,
    View} from 'react-native';
import Util from '../Utils/util';
import Storage  from '../Utils/storage';
/*import MessageMap from '../assets/Protobuf'*/
import { NavigationActions } from 'react-navigation'

export default class Login extends Component<{}>{
    constructor(props){
        super(props);
        this.state = {
            title:"韩城政务",
            subTitle:"HANCHENG COVERNMENT AFFAIRS",
            uesrName:"",
            password:"",
            uesrdisplay:false,
            passdisplay:false,
            userText:"",
            passText:"",
            loadding:false,
            isShow:false,
            uri:'http://192.168.0.106/getme',
            socketPath:'ws://219.145.160.7:3049/ws',
            change:true,
            titlemame:'短信验证',
            phone:'',
            code:60,
            password_1:'',
            password_2:'',
            clickSend:true
        };
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        headerTitle: 'Login',
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        header: null,
    });
    render(){
        return (
            <View style={styles.container}>

                {
                    this.state.isShow?
                        (
                            <View style={styles.container}>
                            <BackImage/>
                            <View style={styles.container_out} >
                            {
                                this.state.loadding?
                                    ( <ActivityIndicator animating={true} style={[{height: 80,position:'absolute',top:30}]} size="large" color="#196BE6"/>):
                                    (null)
                            }


                            <Text style={styles.titletext}>
                                {this.state.title}
                            </Text>
                            <Text style={styles.subtext}>
                                {this.state.subTitle}
                            </Text>
                            {
                                this.state.change?
                                ( <View>
                                    <View style={[styles.container_item,{marginTop:70}]}>
                                    <Image style={styles.image} source={require('../state/yhm.png')} resizeMode="contain"/>
                                    <TextInput style={styles.input} underlineColorAndroid="#196BE6"
                                               placeholder="账户/用户名/邮箱" placeholderTextColor="#646A71"
                                               value={this.state.uesrName}
                                               onChangeText={(text) => this._onUpdateText(text,1)}
                                               autoFocus={false}/>
                                </View>
                                {
                                    this.state.uesrdisplay?
                                        (<View style={styles.showStyle}>
                                            <Text style={styles.showText}>{this.state.userText}</Text>
                                        </View>):
                                        (<View style={styles.showStyle}></View>)
                                }
                                <View style={[styles.container_item,{marginTop:10}]} >
                                    <Image style={styles.image} source={require('../state/dlmm.png')} resizeMode="contain"/>
                                    <TextInput style={styles.input} underlineColorAndroid="#196BE6"
                                               ref="textInput"
                                               onChangeText={(text) => this._onUpdateText(text,2)}
                                               value={this.state.password}
                                               secureTextEntry={true} placeholder="密码" placeholderTextColor="#646A71"
                                               autoFocus={false}/>
                                </View>
                                {
                                    this.state.passdisplay?
                                        (<View style={styles.showStyle}>
                                            <Text style={styles.showText}>请输入密码...{this.state.passText}</Text>
                                        </View>):
                                        (<View style={styles.showStyle}></View>)
                                }
                                </View>):
                                (
                                <View style={styles.marginStyle}>
                                    <View style={[styles.container_item_1,{marginTop:10}]} >
                                        <TextInput style={styles.inputtwo} underlineColorAndroid="#196BE6"
                                                placeholder="手机号码" placeholderTextColor="#646A71"
                                                value={this.state.password_1}
                                                onChangeText={(text) => this._onUpdateText(text,3)}
                                                autoFocus={false}/>
                                        
                                    
                                            <Text style={[styles.phone,{color:this.state.clickSend?'#196BE6':'#999'}]}  onPress={this._getCode.bind(this)}>
                                                获取动态码
                                            </Text>
                                
                                    </View>
                                <View style={[styles.container_item_1,{marginTop:20,marginBottom:10}]} >
                                    
                                    <TextInput style={styles.inputtwo} underlineColorAndroid="#196BE6"
                                            placeholder="验证码" placeholderTextColor="#646A71"
                                            value={this.state.password_2}
                                            onChangeText={(text) => this._onUpdateText(text,4)}
                                            autoFocus={false}/>
                                    <Text style={styles.phone}>
                                            {this.state.code}
                                        </Text>
                                </View>
                                </View>
                                )
                            }
                            <TouchableOpacity onPress={this._onChangeButton.bind(this)} style={styles.touchOpacity}>
                                <Text style={{color:"#fff",fontSize:18}}>{this.state.titlemame}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={this._onPressButton.bind(this)} style={styles.touchOpacity}>
                                <Text style={{color:"#fff",fontSize:18}}>登录</Text>
                            </TouchableOpacity>
                        </View>
                            </View>):
                        (<View style={styles.container}>
                            <BackImage/>
                            <View style={styles.container_out} >
                                <Text style={styles.titletext}>
                                    {this.state.title}
                                </Text>
                                <Text style={styles.subtext}>
                                    {this.state.subTitle}
                                </Text>
                            </View>
                        </View>)
                }
            </View>
        );
    }
    _onUpdateText(text,flag){
        if(flag == 1){
            this.setState({
                uesrName:text
            });
        }else if(flag == 2){
            this.setState({
                password:text
            });
        }else if(flag == 3){
            this.setState({
                password_1:text
            });
        }else{
            this.setState({
                password_2:text
            });
        }
    }
    _getCode(){
        var that = this;
        if(this.state.password_1 == ''){
            ToastAndroid.show('请输入手机号码...', ToastAndroid.SHORT);
            return;
        }
        if(this.state.clickSend){
            that.setState({
                clickSend:false
            });
            var timer = setInterval(function(){
                var code = that.state.code - 1;
                that.setState({
                    code:code
                });
                if(that.state.code == 0){
                    clearInterval(timer);
                }
            },1000);
        }else{
            ToastAndroid.show('获取验证码太过频繁...', ToastAndroid.SHORT);
        }

    }
    _onChangeButton(){
        if(this.state.change){
            this.setState({
                titlemame:'登录验证'
            }); 
        }else{
            this.setState({
                titlemame:'短信验证'
            }); 
        }
        this.setState({
            change:!this.state.change
        });
       
    }
    _onPressButton(){

     let username = this.state.uesrName;
        let password = this.state.password;
        let that = this;
        if(password == "" && username ==""){
            this._onSetState(true,true,"请输入账户/用户名/邮箱...","请输入密码...",false);
        }else if(password == "" ){
            this._onSetState(false,true,"请输入账户/用户名/邮箱...","请输入密码...",false);
        }else if(username ==""){
            this._onSetState(true,false,"请输入账户/用户名/邮箱...","请输入密码...",false);
        }else{
            this._onSetState(false,false,"请输入账户/用户名/邮箱...","请输入密码...",true);
            this._fecth(false);
        }
    }
    _fecth(flag){
        let username = this.state.uesrName;
        let password = this.state.password;
        let that = this;
        let uri = "http://219.145.160.7:8381/silence/login?account="+username+"&password="+password;
        let formDatas =new FormData();
        formDatas.append("account",this.state.uesrName);
        formDatas.append("password",this.state.password);
        let formData =new FormData();
        formData.append("name",this.state.uesrName);
        formData.append("password",this.state.password);
        let formData1 =new FormData();
        formData1.append("emp_no",this.state.uesrName);
        formData1.append("password",this.state.password);
        Util.get(uri,function (data2) {
            Storage.save("id",data2.data.id);
            Util.post("http://219.145.160.7:8480/wcp/login/mobile/submit.do",formData,function (data1) {
                Util.post("http://219.145.160.7:81/index.php?m=&c=public&a=check_m_login",formData1,function (data) {

                    that.setState({
                        loadding:false
                    });
                    if(data.success == false){
                        that._onSetState(true,true,data.message,data.message,false);
                    }else{

                        Storage.save("name",that.state.uesrName);
                        Storage.save("user_pic",data.user_pic);
                        Storage.save("isLogin",true);
                        Storage.save("userName",data.user_name);
                        Storage.save("password",password);
                        that._onPressRegist('App',{userName:data.user_name,userId:data.user_id,userPic:data.user_pic,
                            callback:((data) =>{that.setState({
                                isShow:data
                            })})
                        })
                    }
                },function (data) {
                    that.setState({
                        loadding:false
                    });
                    that._onSetState(true,true,data.message,data.message,false);
                    ToastAndroid.show('登录失败...', ToastAndroid.SHORT);
                })
            },function (data) {
                that.setState({
                    loadding:false
                });
                that._onSetState(true,true,data.message,data.message,false);
                ToastAndroid.show('登录失败...', ToastAndroid.SHORT);
            });
        },function (data2) {
            ToastAndroid.show('登录失败...', ToastAndroid.SHORT);
        });
    }
    componentDidMount() {
        var _this = this;
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
        Storage.get("name").then((tag) =>{
            _this.setState({
                uesrName:tag
            })
        });

    }
    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        var _this = this;
        Storage.get("isLogin").then((tags) =>{
            if(tags){
                Storage.get("name").then((tag1) =>{
                    Storage.get("password").then((tag2) =>{
                        _this.setState({
                            uesrName:tag1,
                            password:tag2
                        })
                        _this._fecth(true);
                    });
                });
            }else{
                _this.setState({
                    isShow:true
                })
            }
        })
    }
    onBackAndroid = () => {
        if (this.lastBackPressed && this.lastBackPressed + 4000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
            return true;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };
    _onPressRegist(demo,params){
        this.props.navigation.navigate(demo, params);
    }
    _onSetState(uesrdisplay,passdisplay,userText,passText,loadding){
        this.setState({
            uesrdisplay:uesrdisplay,
            passdisplay:passdisplay,
            userText:userText,
            passText:passText,
            loadding:loadding
        });
    }
}
class BackImage extends Component{
    render(){
        return(
            <Image style={styles.backImage} resizeMode="stretch"
                   source={require('../state/login.png')}/>
        );

    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    image:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    backImage:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        position:'absolute',
        //不加这句，就是按照屏幕高度自适应
        //加上这几，就是按照屏幕自适应
        //resizeMode:Image.resizeMode.contain,
        //祛除内部元素的白色背景
    },
    marginStyle:{
        marginTop:80
    },
    container_out:{
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:20,
        paddingRight:20
    },
    container_item:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    container_item_1:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    titletext:{
        color:'#196BE6',
        fontSize:55
    },
    phone:{
    
        color:'#196BE6',
        fontSize:16
    },
    subtext:{
        color:'#196BE6',
        fontSize:15
    },
    image:{
        width:40,
        height:40,
        paddingLeft:10
    },
    input:{
        height:46,
        flex:1,
        paddingLeft:10,
        fontSize:20

    },
    inputtwo:{
        height:46,

        width:(Util.size.width-130),
        paddingRight:10,
        marginLeft:40,
        fontSize:20
    },

    touchOpacity:{
        width:(Util.size.width-60),
        backgroundColor:'#196BE6',
        borderRadius:20,
        height:45,
        marginTop:10,
        alignItems:'center',
        justifyContent:'center',

    },
    touchOpacity_1:{
        width:19,
        height:45,
        alignItems:'center',
        justifyContent:'center',

    },
    touchOpacity1:{
        width:(Util.size.width-60),
        backgroundColor:'rgba(0,0,0,0)',
        borderRadius:20,
        borderColor:'#196BE6',
        borderStyle:'solid',
        borderWidth:Util.pixel,
        height:40,
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',

    },
    showStyle:{
        width:(Util.size.width-110),
        height:20,
        justifyContent:'center',
    },
    showText:{
        flex:1,
        fontSize:13,
        color:'#ff0003',
    }
});