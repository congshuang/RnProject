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
    TouchableOpacity,
    ListView,
    ToastAndroid,
    TextInput,
    WebView
} from 'react-native';
import { NavigationActions } from 'react-navigation'
import HTMLView from 'react-native-htmlview';
import  Storage from '../Utils/storage';
import  Util from '../Utils/util';
export default class SubPendingIdea extends Component<{}> {
    constructor(props){
        super(props);

        let id =this.props.navigation.state.params.id;
        let flowId =this.props.navigation.state.params.flowId;
        let step =this.props.navigation.state.params.step;
        this.state = {
            id:id,
            flowId:flowId,
            step:step,
            comment:''
        };
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle: '审批意见',
        gestureResponseDistance: {horizontal: 300},
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: '审批',
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
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.input}>
                        <TextInput  style={{ width:Util.size.width-60,fontSize:17,color:'#196be6'}}
                                    autoCapitalize="none"
                                    onSubmitEditing={ this._onChangeText.bind(this)}
                                    selectionColor="#000"
                                    multiline={true}
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor="#494949" autoFocus={false} onChange={this._onChangeText.bind(this)}/>
                    </View>

                </View>
                <View style={{marginTop:20, flexDirection:'row',justifyContent:'center',
                    alignItems:'center'}}>
                    <TouchableOpacity onPress={this._onPressButton.bind(this,false)} style={[styles.touchOpacity,{backgroundColor:'#ffa01c'}]}>
                        <Text style={{color:"#fff",fontSize:18}}>否决</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._onPressButton.bind(this,true)} style={[styles.touchOpacity,{backgroundColor:'#196be6',marginLeft:20}]}>
                        <Text style={{color:"#fff",fontSize:18}}>同意</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _onChangeText(event){
        this.setState({
                comment: event.nativeEvent.text,
        });
    };
    _onSubmitEditing(event){

    }
    _onPressButton(flag){
        let params = new FormData();
        if(flag){
            this.props.navigation.navigate('Rnsign',{
                comment:this.state.comment,
                flow_id:this.state.flowId,
                id:this.state.id,
                step:this.state.step,
                callback:this.props.navigation.state.params.callback
            });
        }else{
            params.append("flow_id",this.state.flow_id);
            params.append("id",this.state.id);
            params.append("step",this.state.step);
            let formData = new FormData();
            let str = "";
            let _this =this;
            formData.append("keyword",str);
            Util.post("http://219.145.160.7:81/index.php?m=&c=flow&a=reject&async=true",params,function (data) {
                ToastAndroid.show("审批否决",ToastAndroid.LONG);
               
            },function (data) {
                ToastAndroid.show("审批否决",ToastAndroid.LONG);
            });
           
            
            Util.post( "http://219.145.160.7:81/index.php?m=&c=flow&a=folder&fid=confirm&async=true",formData,function (data) {
                let obj = data.list;
                _this.props.navigation.state.params.callback.callback(obj);
                /*_this.props.navigation.goBack('Pending');*/
                _this.props.navigation.navigate('Pending');
            },function (data) {
                ToastAndroid.show('搜索失败...', ToastAndroid.SHORT);
            });

        }
        /*this.props.navigation.goBack('Pending');*/

    }
    componentWillMount() {

    }
    componentDidMount() {

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1e1e1',
        alignItems:'center',
    },
    header:{
        width:Util.size.width,
        height:200,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        marginTop:15,
        padding:15
    },
    input:{
        flex:1,
        width:Util.size.width-30,
        borderWidth: Util.pixel,
        borderColor: '#196be6',
        borderRadius:8,
        paddingLeft:15,
        paddingRight:15,
    },
    touchOpacity:{
        width:(Util.size.width/2-40),
        backgroundColor:'#196BE6',
        borderRadius:20,
        height:40,
        alignItems:'center',
        justifyContent:'center',
    }
});
