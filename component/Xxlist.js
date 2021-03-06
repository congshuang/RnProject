import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ListView
  } from 'react-native';

import Util from '../Utils/util';

class Xxlist extends Component{
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
          <View style={styles.top}><Text style={styles.title}>信息</Text></View>

        <ListView dataSource={this.state.dataSource} enableEmptySections={true}
                  renderRow={(rowData) =>
          (
          <TouchableOpacity style={[styles.item, styles.row]} onPress={this._showDetail.bind(this, rowData.url)}>
            <View>
              <Image style={styles.img} source={rowData.img} resizeMode="contain"/>
            </View>
            <Text style={styles.text}>{rowData.title}</Text>
            <Image source={require('../state/yjt.png')} style={styles.images} resizeMode="contain"/>
          </TouchableOpacity>
          )
        }/>
      </View>
    );
  }
  componentDidMount(){
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let data = [
        {url:"",title:"信息搜索",img:require('../state/xxss.png')},
        {url:"",title:"我的信息",img:require('../state/wdxx.png')},
        {url:"",title:"我的签收",img:require('../state/wdqs.png')},
        {url:"",title:"信息分类",img:require('../state/xxfl.png')},
    ];
      this.setState({
          dataSource: ds.cloneWithRows(data)
      });
  }

  _showDetail(url){

  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
      backgroundColor:'#fff',
      marginTop:10

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
    height:30,
    width:30,
    marginLeft:10,
  },
  text:{
    marginLeft:10,
      color:'#196be6',
      fontSize:16,
      width:(Util.size.width-110),
  },
    top:{
      height:50,
        justifyContent:'center',
        borderBottomWidth: Util.pixel,
        borderBottomColor:'#ccc',
    },
  title:{
      fontSize:19,
      paddingLeft:20
  },
    images:{
        height:25,
        width:25,
        margin:10
    }
});


module.exports = Xxlist;
