/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    TouchableHighlight,
    ListView,
    ToastAndroid,
    TextInput,
    WebView,
    Modal,
    ActivityIndicator
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import HTMLView from 'react-native-htmlview';
import  Storage from '../Utils/storage';
import Spinner from 'react-native-spinkit'
import  Util from '../Utils/util';
import SignatureCapture from 'react-native-signature-capture';
export default class Rnsign  extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {
            mode:"landscape",
            modalVisible:false,
            size: 70,
            color: "#FFFFFF",
            isVisible: true
        };
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle: '手签',
        gestureResponseDistance: {horizontal: 300},
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: null,
        //顶部标题栏的样式
        headerStyle: {
            backgroundColor:'#0A66D4',
            height:50
        },
        //顶部标题栏文字的样式
        headerTitleStyle: {
            color:'#fff',
            fontSize: 19,
            alignSelf: 'center',
            fontWeight:'100'
        },
        //返回按钮的颜色
        headerTintColor: 'white',
        headerRight: (<View/>),
        //设置顶部导航栏左边的视图
        //设置顶部导航栏左边的视图  和 解决当有返回箭头时，文字不居中
    });
    render() {
        return (
            <View style={{ flex: 1, flexDirection: "column",justifyContent:'center',
                alignItems:'center',}}>
                {
                    this.state.modalVisible?
                        (<View style={styles.model}>
                            <Spinner isVisible={this.state.isVisible} size={this.state.size} type='Circle' color={this.state.color}/>
                            <Text style={{color:'#fff',fontSize:16,marginTop:10}}>检测中...</Text>
                        </View>):
                        (null)
                }
                <SignatureCapture
                    style={[styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent.bind(this)}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={this.state.mode}/>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.saveSign() } } >
                        <Text style={{fontSize:20,color:'#fff'}}>保存</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonStyle}
                                        onPress={() => { this.resetSign() } } >
                        <Text style={{fontSize:20,color:'#fff'}}>清除</Text>
                    </TouchableHighlight>

                </View>


            </View>
        );
    }
    saveSign() {
        this.refs["sign"].saveImage();
        this.setState({
            mode:"portrait"
        });
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent(result) {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        let params = new FormData();
        let img ="data:image/png;base64,"+ result.encoded;
        params.append("comment",this.props.navigation.state.params.comment);
        params.append("flow_id",this.props.navigation.state.params.flow_id);
        params.append("id",this.props.navigation.state.params.id);
        params.append("step",this.props.navigation.state.params.step);
        params.append("signature",img);
        this.setState({
            modalVisible:true,
            mode:"portrait"
        });
        let _this = this;
        let formData = new FormData();
        let str = "";
        formData.append("keyword",str);
    Util.post( "http://219.145.160.7:81/index.php?m=&c=flow&a=approve&async=true",params,function (data) {
            ToastAndroid.show("审批同意",ToastAndroid.LONG);
            /*_this.props.navigation.navigate('Pending');*/
        /*_this.props.navigation.goBack('Pending');*/
        Util.post( "http://219.145.160.7:81/index.php?m=&c=flow&a=folder&fid=confirm&async=true",formData,function (data) {
            let obj = data.list;
            _this.props.navigation.state.params.callback.callback(obj);
            _this.props.navigation.navigate('Pending');
            _this.setState({
                modalVisible:false,
            });
        },function (data) {
            ToastAndroid.show('搜索失败...', ToastAndroid.SHORT);
        });


        },function (data) {

        });
    }
    _onDragEvent() {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }
}

const styles = StyleSheet.create({
    signature: {
        borderColor: '#000033',
        borderWidth: 1,
        height:Util.size.width-150,
        width:Util.size.height
    },
    model:{
        width:Util.size.width-100,
        height:180,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, 0.8)',
        borderRadius:10,
        position:'absolute',
        top:Util.size.height/2-150,
        zIndex:9999
    },
    buttonStyle: {
        flex: 1, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#196be6",
        margin: 10,
        borderRadius:10
    }
});
