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
import HTMLView from 'react-native-htmlview';
import Modal from 'react-native-modalbox';
import  Storage from '../Utils/storage';
import  Util from '../Utils/util';
export default class SubPending extends Component<{}> {
    constructor(props){
        super(props);
        let callback = this.props.navigation.state.params;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            url:'',
            id:'',
            flowId:'',
            step:'',
            dataSource: ds.cloneWithRows([]),
            dataSourceImg: ds.cloneWithRows([]),
            text1:"",
            text2:"",
            text3:"",
            text4:"",
            text5:"",
            text6:"",
            text7:"",
            modalVisible:false,
            uri:'',
            callback:callback
        };
    }
    static navigationOptions = ({navigation, screenProps}) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        headerTitle: '审批',
        gestureResponseDistance: {horizontal: 300},
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
        headerBackTitle: '待审批',
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
            <View style={[styles.container]}>
                <Modal
                    style={styles.model}
                    ref={"modal"}>
                    <Image source={{uri:this.state.uri}} style={{width:Util.size.width,height:400}} resizeMode="contain"/>
                </Modal>
                <ScrollView style={[styles.container]}>
                    <View style={[styles.bodert,styles.boderb,{marginTop:10,backgroundColor:'#fff'}]}>
                        <View style={[{height:40,width:Util.size.width, alignItems:'flex-start',justifyContent:'center',paddingLeft:15}]}>
                            <Text style={{fontSize:17,fontWeight:'100',color:'#196be6'}}>审批情况</Text>
                        </View>
                        <ScrollView style={styles.container}>
                            <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                                      renderRow={(rowData) =>
                                          (
                                              <View style={[{height:40,width:Util.size.width, alignItems:'center',justifyContent:'center',flexDirection:'row',backgroundColor:'#fff'},styles.bodert]}>
                                                  <View style={{flex:1,height:40,paddingLeft:15,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                                      <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>审批人</Text>
                                                      <Text style={{fontSize:16,fontWeight:'100',color:'#464646',marginLeft:30}}>{rowData.user_name}</Text>
                                                  </View>
                                                  <View style={[{flex:1,height:40,paddingLeft:15,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'},styles.boderl]}>
                                                      <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>审批情况</Text>
                                                      <Text style={{fontSize:16,fontWeight:'100',color:'#464646',marginLeft:30}}>{rowData.result}</Text>
                                                  </View>
                                              </View>
                                          )
                                      }/>
                        </ScrollView>
                    </View>
                    <View style={[styles.boderb,{marginTop:10,backgroundColor:'#fff',flexDirection:'row'}]}>
                        <View style={{flex:1,height:40,alignItems:'flex-start',justifyContent:'center',paddingLeft:15}}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>文件编号</Text>
                        </View>
                        <View style={[{flex:2,height:40,alignItems:'flex-start',justifyContent:'center',paddingLeft:15,paddingRight:15},styles.boderl]}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#464646'}}>{this.state.text1}</Text>
                        </View>
                    </View>
                    <View style={[styles.boderb,{backgroundColor:'#fff',flexDirection:'row'}]}>
                        <View style={{flex:1,height:40,alignItems:'flex-start',justifyContent:'center',paddingLeft:15}}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>日期</Text>
                        </View>
                        <View style={[{flex:2,height:40,alignItems:'flex-start',justifyContent:'center',paddingLeft:15,paddingRight:15},styles.boderl]}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#464646'}}>{this.state.text2}</Text>
                        </View>
                    </View>
                    <View style={[styles.boderb,{backgroundColor:'#fff',flexDirection:'row'}]}>
                        <View style={{flex:1,height:40,alignItems:'flex-start',justifyContent:'center',paddingLeft:15}}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>编写人</Text>
                        </View>
                        <View style={[{flex:2,height:40,alignItems:'flex-start',justifyContent:'center',paddingLeft:15,paddingRight:15},styles.boderl]}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#464646'}}>{this.state.text3}</Text>
                        </View>
                    </View>
                    <View style={[styles.boderb,{backgroundColor:'#fff',flexDirection:'row'}]}>
                        <View style={{flex:1,height:40,alignItems:'flex-start',justifyContent:'center',paddingLeft:15}}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>部门</Text>
                        </View>
                        <View style={[{flex:2,height:40,alignItems:'flex-start',justifyContent:'center',paddingLeft:15,paddingRight:15},styles.boderl]}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#464646'}}>{this.state.text4}</Text>
                        </View>
                    </View>
                    <View style={[styles.boderb,{backgroundColor:'#fff',flexDirection:'row'}]}>
                        <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:15}}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>审批</Text>
                        </View>
                        <View style={[{flex:2,minHeight:40,alignItems:'flex-start',justifyContent:'center',padding:15},styles.boderl]}>
                            <HTMLView
                                value={this.state.text5}
                                style={{fontSize:16,fontWeight:'100',color:'#464646'}}
                            />
                        </View>
                    </View>
                    <View style={[styles.boderb,{backgroundColor:'#fff',flexDirection:'row'}]}>
                        <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:15}}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>协商</Text>
                        </View>
                        <View style={[{flex:2,minHeight:40,alignItems:'flex-start',justifyContent:'center',padding:15},styles.boderl]}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#464646'}}>{this.state.text6}</Text>
                        </View>
                    </View>
                    <View style={[styles.boderb,{backgroundColor:'#fff',flexDirection:'row'}]}>
                        <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:15}}>
                            <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>审批</Text>
                        </View>
                        <View style={[{flex:2,minHeight:40,alignItems:'flex-start',justifyContent:'center',padding:15},styles.boderl]}>
                            <HTMLView
                                value={this.state.text7}
                                style={{fontSize:16,fontWeight:'100',color:'#464646'}}
                            />
                        </View>
                    </View>
                   <View style={[styles.boderb,{backgroundColor:'#fff',flexDirection:'row'}]}>
                                <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:15}}>
                                    <Text style={{fontSize:16,fontWeight:'100',color:'#646a71'}}>签名</Text>
                                </View>
                                <View style={[{flex:2,minHeight:40,alignItems:'center',justifyContent:'center',padding:15},styles.boderl]}>
                                    <ListView dataSource={this.state.dataSourceImg} enableEmptySections={true}
                                              renderRow={(rowData) =>
                                                  (
                                                      <TouchableOpacity style={[{margin:5,borderWidth: Util.pixel,
                                                          borderColor:'#ccc',borderRadius:5,height:30,alignItems:'center',
                                                          justifyContent:'center',paddingLeft:10,paddingRight:10}]} onPress={this._onPressImg.bind(this,rowData.signature)} >
                                                          <Text style={{color:"#000",fontSize:16}}>{rowData.user_name}的签名</Text>
                                                      </TouchableOpacity>
                                                  )
                                              }/>
                                </View>
                            </View>
                    <TouchableOpacity onPress={this._onPressButton.bind(this)} style={styles.touchOpacity}>
                        <Text style={{color:"#fff",fontSize:18}}>审批意见</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    _onPressButton(){

        this.props.navigation.navigate('SubPendingIdea', {flowId: this.state.flowId,id:this.state.id,step:this.state.step,callback:this.state.callback});
    }
    componentWillMount() {

    }
    _onPressImg(uri){
        this.setState({
            modalVisible:true,
            uri:uri
        });
        this.refs.modal.open()
    }

    componentDidMount() {
        
        let id = this.props.navigation.state.params.id;
        let url = "http://219.145.160.7:81/index.php?m=&c=flow&a=read&id="+id+"&fid=confirm&async=true";
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let self = this;
        Util.get(url,function (data) {
            let obj = data.flow_log;
            let consult = data.flow_type.consult_name;
            let conmment= data.vo.content;
            if(obj == null){
                obj = [];
            }
            if(consult == null || consult == ""){
                consult = "没有相应的协商内容"
            }
            if(conmment == null || conmment == ""){
                conmment = "没有相应的协商内容"
            }
            self.setState({
                dataSource: ds.cloneWithRows(obj),
                dataSourceImg: ds.cloneWithRows(obj),
                text1:data.vo.doc_no,
                text2:data.flow_type.create_time,
                text3:data.vo.user_name,
                text4:data.vo.dept_name,
                text5:data.flow_type.confirm_name,
                text6:consult,
                text7:conmment,
                id:data.to_confirm.id,
                step:data.to_confirm.step,
                flowId:data.to_confirm.flow_id
            });
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
    model:{
        width:Util.size.width,
        height:Util.size.height,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, 0.8)',

    },
    header:{
        height:40,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        backgroundColor:'#fff'
    },
    touchOpacity:{
        width:(Util.size.width-60),
        backgroundColor:'#196BE6',
        borderRadius:20,
        height:40,
        marginTop:20,
        marginLeft:30,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20
    },
    bodert:{
        borderTopWidth: Util.pixel,
        borderTopColor:'#ccc',
    },
    boderb:{
        borderBottomWidth: Util.pixel,
        borderBottomColor:'#ccc',
    },
    boderl:{
        borderLeftWidth: Util.pixel,
        borderLeftColor:'#ccc',
    },
    exit:{
        width:50,
        height:50,
        alignItems:'center',
        flexDirection:'row',
        position:'absolute',
        top:10,
        left:10
    }
});
