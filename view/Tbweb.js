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
export default class Tbweb extends Component<{}>{

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
        headerRight: (<View/>)
        //设置顶部导航栏左边的视图
        //设置顶部导航栏左边的视图  和 解决当有返回箭头时，文字不居中
    });

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
            copyProps.navigation.goBack(null);
        }
        return true;
    };
    componentDidMount(){
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

module.exports = Tbweb;