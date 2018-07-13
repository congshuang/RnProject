/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { AppRegistry,
    StyleSheet,
    Image,
    Text,
    DrawerLayoutAndroid,
    ScrollView,
    ToastAndroid,
    BackHandler,
    View} from 'react-native';
import TabNavigator from 'react-native-tab-navigator'
import Message from './Message';
import Contacts from './Contacts';
import Chatting from './Chatting';
import Study from './Study';
import TopShow from './TopShow'
import SideMenu from 'react-native-side-menu';
import Storage  from '../Utils/storage';
import Util from '../Utils/util';
export default class App extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: '首页',
            isOpen:false
        };
    }
    lastBackPressed1;
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        header:null
    });
    render(){
        var menu= <TopShow onItemSelected = {this.onMenuItemSelected} navigation={this.props.navigation} /> ;
        return (
            <SideMenu
                menu={menu}
                isOpen = {this.state.isOpen}
                onChange={(isOpen) => this.updateMenuState(isOpen)}
            >
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '首页'}
                        title={'首页'}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require('../state/nvg_message_normal.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('../state/nvg_message_selected.png')} />}
                        onPress={() => this.setState({ selectedTab: '首页' })}
                    >
                        <Message navigation={this.props.navigation}></Message>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '督办'}
                        title={'督办'}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require('../state/nvg_contacts_normal.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('../state/nvg_contacts_selected.png')} />}
                        onPress={() => this.setState({ selectedTab: '督办' })}
                    >
                        <Contacts navigation={this.props.navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '通讯录'}
                        title={'通讯录'}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require('../state/work_normal.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('../state/work_select.png')} />}
                        onPress={() => this.setState({ selectedTab: '通讯录' })}
                    >
                        <Chatting navigation={this.props.navigation}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === '知识库'}
                        title={'知识库'}
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require('../state/nvg_star_normal.png')} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require('../state/nvg_star_selected.png')} />}
                        onPress={() => this.setState({ selectedTab: '知识库' })}
                    >
                        <Study navigation={this.props.navigation}/>
                    </TabNavigator.Item>
                    {/*</DrawerLayoutAndroid>*/}
                </TabNavigator>
            </SideMenu>


        );
    }
    toggle(){
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen){
        this.setState({isOpen : isOpen
        });
    }

    onMenuItemSelected = () =>{
        this.setState({
            isOpen :false,
        });
    }

    componentWillMount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);

    }

    componentDidMount(){
        /*BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);*/
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    onBackAndroid = () => {
        if (this.lastBackPressed1 && this.lastBackPressed1 + 4000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            BackHandler.exitApp();
        }
        this.lastBackPressed1 = Date.now();
        ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
        return true;
    };
    _onRefresh(){

    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    tabText:{
        color:'#000000',
        fontSize:11
    },
    selectedTabText:{
        color:'#0A66D4'
    },
    icon:{
        width:22,
        height:22
    }
});
