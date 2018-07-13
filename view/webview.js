import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
    ToastAndroid,
    BackHandler
  } from 'react-native';
import Header from '../component/Header';
var WEBVIEW_REF = 'webview';

class TWebView extends Component{

  constructor(props){
    super(props);
    /*alert(JSON.stringify(props))*/
    this.state = {
      url: this.props.url,
      isMargin: this.props.isMargin,
      isShowErrorPage: false,
        backButtonEnabled: false,
        forwardButtonEnabled: "",
        uri: "",
        status: "",
        loading: "",
    };
  }
    lastBackPressed4;
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
    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPressed', this.onBackAndroid.bind(this));
    }

    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPressed', this.onBackAndroid.bind(this));
    }
    onBackAndroid(){
        if(this.state.backButtonEnabled){
            this.goBack();
        }else{
            if (this.lastBackPressed4 && this.lastBackPressed4 + 5000 >= Date.now()) {
                //最近2秒内按过back键，可以退出应用。
                BackHandler.exitApp();
            }
            this.lastBackPressed4 = Date.now();
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        }
        return true;
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
  }
});

module.exports = TWebView;