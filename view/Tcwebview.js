import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
    ToastAndroid,
    Platform,
    BackHandler,
    TouchableOpacity,
    Image,
  } from 'react-native';
var WEBVIEW_REF = 'webview';
import Util from '../Utils/util'
import  Storage from '../Utils/storage';
var  copyProps ="";
export default class TcWebView extends Component<{}>{

  constructor(props){
    super(props);
      copyProps = props;
    this.state = {
      url: this.props.navigation.state.params.url,
      isMargin: this.props.isMargin,
      isShowErrorPage: false,
        backButtonEnabled: "",
        forwardButtonEnabled: "",
        uri: "",
        status: "",
        loading: "",
    };
  }
    static navigationOptions = ({navigation, screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle: '韩城政务OA',
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        gestureResponseDistance: {horizontal: 300},
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: null,
        //顶部标题栏的样式
        headerStyle: {
            backgroundColor:'#0A66D4',
        },
        //顶部标题栏文字的样式
        headerTitleStyle: {
            color:'#fff',
            fontSize: 19,
            alignSelf: 'center',
        },
        //返回按钮的颜色
        headerTintColor: 'white',
        headerRight: (<View/>),
        headerLeft: (<TouchableOpacity  style={styles.left} onPress={() => navigation.state.params ? navigation.state.params.backClick() : null}>
            <Image source={require('../state/back.png')} resizeMode='contain' style={{width:20,height:20}} />
        </TouchableOpacity >),
        //设置顶部导航栏左边的视图
        //设置顶部导航栏左边的视图  和 解决当有返回箭头时，文字不居中
    });
   backClick(){
       const params = copyProps.navigation.state.params;
       copyProps.navigation.goBack(null);
     /*  Storage.get("name").then((tags) =>{
           const tag = "http://219.145.160.7:8180/"+tags+"/oa/mymenus";
           Util.get(tag, function(data){
               params.callback(data);
               ToastAndroid.show("返回并刷新页面",ToastAndroid.LONG);
               copyProps.navigation.goBack(null);
           }, function(err){
               ToastAndroid.show("服务异常,正在紧急修复,请耐心等待",ToastAndroid.LONG);
           });
       })*/

  }
  render(){
    let url = {uri: this.state.url};
    return(
      <View style={styles.container}>
        {
          this.state.isShowErrorPage?
            <View style={styles.textView}>
              <Text style={styles.text}>不好意思,请检查网络连接情况或者报告错误</Text>
            </View>
            :
            <WebView
              ref={WEBVIEW_REF}
              style={[styles.container,{marginTop: this.state.isMargin || -20}]}
              startInLoadingState={true}
              onError={this._loadError.bind(this)}
              domStorageEnabled={true}
              javaScriptEnabled={true}
              onNavigationStateChange={this._onNavigationStateChange}
              source={url}>
            </WebView>
        }
      </View>
    );
  }
    _onNavigationStateChange = (navState) => {
        console.log(navState)
        this.setState({
            backButtonEnabled: navState.canGoBack,
            forwardButtonEnabled: navState.canGoForward,
            uri: navState.url,
            status: navState.title,
            loading: navState.loading,
        });
    }
    goBack = () => {
        this.refs[WEBVIEW_REF].goBack();
    };
    reload = () => {
        this.refs[WEBVIEW_REF].reload();
    };
    _loadError(){
    this.setState({
      isShowErrorPage: true
    });
  }
    onBackAndroid = () => {
        if(this.state.backButtonEnabled){
            this.goBack();
        }else{
            const params = copyProps.navigation.state.params;
            if(params.id){
                Storage.get("name").then((tags) =>{
                    const tag = "http://219.145.160.7:8180/"+tags+"/oa/mymenus";
                    Util.get(tag, function(data){
                        params.callback(data);
                        ToastAndroid.show("返回并刷新页面",ToastAndroid.LONG);
                        copyProps.navigation.goBack(null);
                    }, function(err){
                        ToastAndroid.show("服务异常,正在紧急修复,请耐心等待",ToastAndroid.LONG);
                    });
                })
            }else{
                copyProps.navigation.goBack();
            }
        }
        return true;
    };
    componentDidMount(){
        this.props.navigation.setParams({
            backClick: this.backClick,
        });
        BackHandler.addEventListener('hardwareBackPressed', this.onBackAndroid);
    }

    componentWillMount() {

        BackHandler.removeEventListener('hardwareBackPressed', this.onBackAndroid);
    }

}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text:{
    fontSize:16,
    fontWeight:'300'
  },
  textView:{
    flex:1,
    justifyContent:'center',
    alignItems: 'center'
  },
    left:{
        width:Util.size.width/3,
        height:50,
        alignItems:'center',
        paddingLeft:10,
        flexDirection:'row'
    },
    img:{
        width:30,
        height:30,
    }
});

module.exports = TcWebView;