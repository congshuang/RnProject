import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  } from 'react-native';

import Util from '../Utils/util';

class Search extends Component{
    render(){
        return (
            <View style={{height:54,backgroundColor:'#EAECEF',alignItems:'center'}}>
                <View style={styles.search}>
                    <Image style={styles.Image} source={require('../state/serch.png')}/>
                    <TextInput  style={styles.input} placeholder="搜索"
                                autoCapitalize="none"
                                onSubmitEditing={this._onSubmitEditing.bind(this)}
                                selectionColor="#000"
                                underlineColorAndroid='transparent'
                                placeholderTextColor="#494949" autoFocus={false} onChangeText={this._onChangeText}/>
                </View>
            </View>
        );
    }

    _onChangeText(){}

    _onSubmitEditing(event) {
        var params = {
            url:"http://219.145.160.7:8480/wcp/websearch/PubDo.do?word="+event.nativeEvent.text
        };
        this.props.navigation.navigate('Tcwebview', params);
    }


}

const styles = StyleSheet.create({
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
    }
});

module.exports = Search;