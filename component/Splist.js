import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ListView,
    ToastAndroid
  } from 'react-native';

import Util from '../Utils/util';

class SpList extends Component{
  constructor(props){
    super(props);
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      type: this.props.type,
      dataSource: ds.cloneWithRows([])
    };

  }
  render(){
    return(
      <View style={styles.container}>
          <View style={styles.top}>
              <Image source={require('../state/gw.png')} resizeMode="contain" style={{width:26,height:26,marginTop:12,marginLeft:10}}/>
              <Text style={styles.title}>知识库</Text>
              <TouchableOpacity style={{flexDirection:'row',height:25,marginTop:13}} onPress={this._onSetBind.bind(this, 'Tcwebview')}>
                  <Text style={{fontSize:17,color:'#646a71'}}>更多</Text>
                  <Image source={require('../state/yjt.png')} style={styles.images} resizeMode="contain"/>
              </TouchableOpacity>
          </View>

        <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                  renderRow={(rowData) =>
          (
          <TouchableOpacity style={[styles.item, styles.row]} onPress={this._showDetail.bind(this, rowData.id)}>
            <View>
              <Image style={styles.img} source={require('../state/zxzz.png')} resizeMode="cover"/>
            </View>
              <View style={styles.text}>
                  <Text style={styles.text1}>{this.setTime(rowData.publishTime)}</Text>
                  <Text style={styles.text2} numberOfLines={1}>{rowData.title}</Text>
              </View>
            <Image source={require('../state/yjt.png')} style={styles.images} resizeMode="contain"/>
          </TouchableOpacity>
          )
        }/>
      </View>
    );
  }
    setTime(time){
      var date = new Date(time);
      return date.toLocaleDateString();
    }
    _onSetBind(demo){
        var params = {
            url:"http://219.145.160.7:8480/wcp/webtype/view/Pub1.html"
        };
        this.props.navigation.navigate('Tcwebview', params);
    }
  componentDidMount(){
        var _this = this;
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  Util.get("http://219.145.160.7:8180/knowledge?page=0&size=15",function (data) {

        _this.setState({
            dataSource: ds.cloneWithRows(data)
        });
    },function (data) {
      ToastAndroid.show('加载失败...', ToastAndroid.SHORT);
    });

  }

  _showDetail(id){
      var params = {
          url:"http://219.145.160.7:8480/wcp/webdoc/view/Pub"+id+".html"
      };
      this.props.navigation.navigate('Tcwebview', params);
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
      backgroundColor:'#fff',
      marginTop:10,
      paddingBottom:20

  },
  item:{
    height:50,
    borderBottomWidth: Util.pixel,
    borderBottomColor:'#ccc',
      alignItems:'center'
  },
  row:{
    flexDirection: 'row'
  },
  img:{
    height:50,
    width:29,
    marginLeft:10,
  },
  text:{
      marginLeft:10,
      width:(Util.size.width-78),
      height:50,
  },
    text1:{
        height:25,
        color:'#999999',
        fontSize:14,
        textAlignVertical:'center'
    },
    text2:{
        height:25,
        color:'#646a71',
        fontSize:16,
        textAlignVertical:'center'
    },
    top:{
      height:50,
        justifyContent:'center',
        borderBottomWidth: Util.pixel,
        borderBottomColor:'#ccc',
        flexDirection:'row'
    },
    title:{
        fontSize:19,
        paddingLeft:5,
        width:Util.size.width-110,
        height:25,
        color:'#196be6',
        marginTop:12
    },
    images:{
        height:25,
        width:25,
    }



});


module.exports = SpList;
