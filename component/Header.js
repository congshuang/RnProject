import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Image,
    BackHandler,
    DrawerLayoutAndroid,
    TouchableOpacity
} from 'react-native';
import Util from '../Utils/util';
import Menu from './Menu'
import Search from '../view/search';
import AndroidSwiper from './AndroidSwiper';
import CenterComponent from './CenterComponent';
import Splist from './Splist';
import Xxlist from './Xxlist';
import Wdlist from './Wdlist';
import Bblist from './Bblist';
import Gzlist from './Gzlist';
import TxlList from './TxlList';
import GrList from './GrList';


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            isShowLeft:props.isShowLeft,
            title:props.title,
        };
    }
    /*static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        headerTitle: '主页',
        //设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题
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
        headerLeft: (<Text style={{color: 'white', marginRight: 13}}
                           onPress={() => navigation.state.params.openMenuClick(navigation)}>菜单
        </Text>)
        //设置顶部导航栏左边的视图
        //设置顶部导航栏左边的视图  和 解决当有返回箭头时，文字不居中
    });*/
    render(){

        return(
            <View style={styles.container}>
                {
                    this.state.isShowLeft?
                        (<TouchableOpacity  style={styles.left} onPress={this._onPressDown()}>
                            <Image source={require('../state/cyx.png')} resizeMode='contain' style={styles.img} />
                        </TouchableOpacity >):
                        (<View style={styles.left}>

                        </View>)
                }
                <View style={styles.center}>
                    <Text style={styles.text}>{this.state.title}</Text>
                </View>
                <View style={styles.right}></View>
            </View>
        );
    }
    _onPressDown(){
        this.props.toggle();
    }

}



const styles = StyleSheet.create({
    container: {
        width:Util.size.width,
        backgroundColor:'#196be6',
        height:50,
        flexDirection:'row'
    },
    left:{
        width:Util.size.width/3,
        height:50,
        alignItems:'center',
        paddingLeft:10,
        flexDirection:'row'
    },
    center:{
        width:Util.size.width/3,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    text:{
        color:'#fff',
        fontSize: 19,
        alignSelf: 'center',
    },
    right:{
        width:Util.size.width/3,
        height:50,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    img:{
        width:30,
        height:30,
    }
});

module.exports = Header;