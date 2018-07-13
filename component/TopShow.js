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
    ToolbarAndroid,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Util from '../Utils/util';
import Storage  from '../Utils/storage';
export default class TopShow extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {
            url:'',
            name : '',
            version:1.0,
            flag:false
        };
    }
    render() {
        return (
            <ScrollView style={styles.contenter}>
                <View>
                    <View style={styles.showView}>
                        <Image source={require('../state/showView.jpg')} resizeMode='cover' style={{width:300,height:200,position:'absolute',top:0,left:0,}}/>
                        <Image source={{uri:this.state.url}} style={styles.img}/>
                        <Text style={styles.text}>{this.state.name}</Text>
                    </View>
                    <View style={styles.center}>
                        <TouchableOpacity style={styles.item} onPress={this._onOpen.bind(this,"http://219.145.160.7:81/index.php?m=&c=message&a=index")}>
                            <Image source={require('./xx.png')} style={styles.image} resizeMode='contain'/>
                            <Text style={styles.str}>我的消息</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={this._onOpen.bind(this,"http://219.145.160.7:81/index.php?m=&c=doc&a=index")}>
                            <Image source={require('./wd.png')} style={styles.image} resizeMode='contain'/>
                            <Text style={styles.str}>我的文档</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={this._onOpen.bind(this,"http://219.145.160.7:8480/wcp/webuser/PubHome.do?type=know&userid=40288b854a329988014a329a12f30002")}>
                            <Image source={require('./zs.png')} style={styles.image} resizeMode='contain'/>
                            <Text style={styles.str}>我的知识</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={this._onOpen.bind(this,"http://219.145.160.7:81/index.php?m=&c=profile&a=index")}>
                            <Image source={require('./zh.png')} style={styles.image} resizeMode='contain'/>
                            <Text style={styles.str}>我的资料</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.item} onPress={this._onOpenTo.bind(this,'About')}>
                            <Image source={require('./gy.png')} style={styles.image} resizeMode='contain'/>
                            <Text style={styles.str}>关于韩城政务</Text>
                            <Text style={{color:'#ff0003',fontSize:18,fontWeight:'100',fontStyle :'italic',marginLeft:20}}>NEW</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.item} onPress={this.onEdit.bind(this)}>
                        <Image source={require('../state/tc.png')} style={styles.image} resizeMode='contain' />
                        <Text style={styles.str}>退出</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        );
    }
    _onOpen(url){
        this.props.onItemSelected();
        var params = {
            url:url
        };
        this.props.navigation.navigate('Tbweb', params);
    }
    _onOpenTo(demo){
        this.props.onItemSelected();
        this.props.navigation.navigate(demo,{
            flag:this.state.flag,
            version:this.state.version
        });
    }
    onEdit(){
        Storage.save("isLogin",false);
        this.props.onItemSelected();
        this.props.navigation.state.params.callback(true);
        this.props.navigation.goBack(null);
       /* this.props.navigation.goBack();*/
    }
    componentDidMount() {
        var _this = this;
        Util.get("http://219.145.160.7:81/hczw.v",function (data) {
            if(_this.state.version < data){
                _this.setState({
                    flag:true
                });
            }
        },function (data) {
            ToastAndroid.show("网络问题,请检查网络...")
        });
        Storage.get("name").then((tags) =>{
            _this.setState({
                name:tags
            })
        });

        Storage.get("user_pic").then((tags) =>{
            var path ="http://219.145.160.7:81/"+tags;
            _this.setState({
                url:path
            })
        });
    }
}

const styles = StyleSheet.create({
    container:{
        width:300,
        height:Util.size.height,
        backgroundColor:'#fff'
    },
    showView:{
        width:300,
        height:150,
        padding:20,
        flexDirection:'row',
        alignItems:'center',
        position:'relative'
    },
    img:{
        width:50,
        height:50,
        borderRadius:25,
    },
    image:{
        width:30,
        height:30,
    },
    item:{
        marginTop:5,
        width:300,
        height:50,
        backgroundColor:'#fff',
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        borderBottomWidth: Util.pixel,
        borderBottomColor:'#ccc',
       /* borderTopWidth: Utils.pixel,
        borderTopColor:'#ccc',*/
    },
    text:{
        fontSize:20,
        color:'#fff',
        marginLeft:10
    },
    str:{
        fontSize:18,
        color:'#196be6',
        marginLeft:8
    },
    center:{
        width:300,
        height:Util.size.height-235,
        backgroundColor:'#fff'
    }
});
