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
    ActivityIndicator
} from 'react-native';
/*import { connect } from 'react-redux';*/ // 引入connect函数
import *as loginAction from '../actions/loginAction';// 导入action方法
import  Storage from '../Utils/storage';
import  Util from '../Utils/util';
var  copyProps ="";
export default class Pending extends Component<{}> {
    constructor(props){
        super(props);
        copyProps = props;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            url:'',
            dataSource: ds.cloneWithRows([]),
            isShow:true
        };
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle: '待审批',
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
        },
        //返回按钮的颜色
        headerTintColor: 'white',
        headerRight: (<View/>),
        headerLeft: (<TouchableOpacity  style={styles.left} onPress={() => navigation.state.params ? navigation.state.params.backClickFun() : null}>
            <Image source={require('../state/back.png')} resizeMode='contain' style={{width:20,height:20}} />
        </TouchableOpacity >),
        //设置顶部导航栏左边的视图
        //设置顶部导航栏左边的视图  和 解决当有返回箭头时，文字不居中
    });
    backClickFun(){
        const params = copyProps.navigation.state.params;
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

    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{height:54,backgroundColor:'#EAECEF',alignItems:'center'}}>
                    <View style={styles.search}>
                        <Image style={styles.Image} source={require('../state/serch.png')}/>
                        <TextInput  style={styles.input} placeholder="搜索"
                                    autoCapitalize="none"
                                    onSubmitEditing={this._onSubmitEditing.bind(this)}
                                    selectionColor="#000"
                                    returnKeyLabel='search'
                                    underlineColorAndroid='transparent'
                                    placeholderTextColor="#494949" autoFocus={false} onChangeText={this._onChangeText}/>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={[styles.header,styles.bodert]}>
                        <View style={[styles.headerItem_1,{alignItems:'center',}]}>
                            <Text style={styles.headerText}>
                                标题
                            </Text>
                        </View>
                        <View style={[styles.headerItem_2,styles.boderlr]}>
                            <Text style={styles.headerText}>
                                创建人
                            </Text>
                        </View>
                        <View style={styles.headerItem_2}>
                            <Text style={styles.headerText}>
                                状态
                            </Text>
                        </View>
                    </View>
                    <ScrollView style={styles.container}>
                        {
                            this.state.isShow?
                                (<ActivityIndicator animating={true} style={[{height: 100},styles.loadding]} size="large" color="#196BE6"/>)
                                :
                                (
                                    <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                                              renderRow={(rowData) =>
                                                  (
                                                      <TouchableOpacity style={styles.header} onPress={this._showDetail.bind(this, rowData.id)}>
                                                          <View style={[styles.headerItem_1,{alignItems:'flex-start',paddingLeft:10,paddingRight:20}]}>
                                                              <Text style={{fontSize:15,color:'#196be6',fontWeight:'100'}} numberOfLines={1}>{rowData.name}</Text>
                                                          </View>
                                                          <View style={styles.headerItem_2}>
                                                              <Text style={{fontSize:15,color:'#000',fontWeight:'300'}}> {rowData.user_name}</Text>
                                                          </View>
                                                          <View style={styles.headerItem_2}>
                                                              <Text style={{fontSize:15,color:'#2f2f2f',fontWeight:'100'}}>待审批</Text>
                                                          </View>
                                                      </TouchableOpacity>
                                                  )
                                              }/>
                                )
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
    _onChangeText(){}
    _showDetail(id){
        this.props.navigation.navigate('SubPending', {id: id,callback:((data) =>{this.setdata(data)})});
    }
    setdata(obj){
        let _this =this;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        if(obj == null){
            _this.setState({
                isShow:false,
                dataSource: ds.cloneWithRows([]),
            });
        }else{
            _this.setState({
                isShow:false,
                dataSource: ds.cloneWithRows(obj),
            });
        }

    }
    _onSubmitEditing(event) {
        let formData = new FormData();
        let str = event.nativeEvent.text;

        formData.append("keyword",str);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            isShow:true
        });
        let _this =this;
        Util.post( "http://219.145.160.7:81/index.php?m=&c=flow&a=folder&fid=confirm&async=true",formData,function (data) {
            let obj = data.list;
            if(obj == null){
                _this.setState({
                    isShow:false,
                    dataSource: ds.cloneWithRows([]),
                });
            }else{
                _this.setState({
                    isShow:false,
                    dataSource: ds.cloneWithRows(obj),
                });
            }
           /* */
        },function (data) {
            ToastAndroid.show('搜索失败...', ToastAndroid.SHORT);
        });
    }

    componentWillMount() {

    }
    componentDidMount() {
        this.props.navigation.setParams({
            backClickFun: this.backClickFun,
        });
        this._fetch();
        /*this.login();
        alert(JSON.stringify(this.state.user));*/
    }
    _fetch(){
        let url = "http://219.145.160.7:81/index.php?m=&c=flow&a=folder&fid=confirm&async=true";
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let self = this;
        Util.get(url,function (data) {
            let obj = data.list;
            if(obj == null){
                self.setState({
                    isShow:false,
                    dataSource: ds.cloneWithRows([]),
                });
            }else{
                self.setState({
                    isShow:false,
                    dataSource: ds.cloneWithRows(obj),
                });
            }
        },function (data) {
            ToastAndroid.show('提交失败...', ToastAndroid.SHORT);
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e1e1e1',
    },
    search: {
        marginLeft: 10,
        marginRight: 10,
        height: 40,
        marginTop:7,
        borderWidth: Util.pixel,
        borderColor: '#ccc',
        borderRadius:18,
        padding:0,
        alignItems:'center',
        flexDirection:'row',
        backgroundColor:'#fff'
    },
    Image:{
        width:30,
        height:30,
        marginLeft:6,
        backgroundColor:'#fff'
    },
    input:{
        height: 40,
        paddingLeft:10,
        flex:1,
        fontSize:15,
    },
    header:{
        height:45,
        borderBottomWidth: Util.pixel,
        borderBottomColor:'#ccc',
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:'#fff'
    },
    headerItem_1:{
        flex:3,
        height:43,
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    headerItem_2:{
        flex:1,
        height:43,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff'
    },
    headerText:{
        fontSize:16,
        color:'#656565',
        fontWeight:'100'
    },
    bodert:{
        borderTopWidth: Util.pixel,
        borderTopColor:'#ccc',
    },
    boderlr:{
        borderLeftWidth: Util.pixel,
        borderLeftColor:'#ccc',
        borderRightWidth: Util.pixel,
        borderRightColor:'#ccc',
    },
    left:{
        width:Util.size.width/3,
        height:50,
        alignItems:'center',
        paddingLeft:10,
        flexDirection:'row'
    },
});
/*
export default connect(
    (state) => ({
        status: state.loginIn.status,
        isSuccess: state.loginIn.isSuccess,
        user: state.loginIn.user,
    }),
    (dispatch) => ({
        login: () => dispatch(loginAction.login()),
    })
)(Pending)*/
