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

class Inputs extends Component{
    constructor(props){
        super(props);
        this.state = {
            holder:this.props.holder
        }
    }
    render(){
        return (
            <View style={{height:46, borderBottomWidth:Util.pixel,borderColor:'#ccc'}}>
                <TextInput style={styles.search} placeholder= {this.state.holder}
                           autoCapitalize="none"
                           onSubmitEditing={(event) =>this._onSubmitEditing.bind(this,event)}
                           selectionColor="#000"
                           underlineColorAndroid='transparent'
                           placeholderTextColor="#494949" autoFocus={false} onChangeText={this._onChangeText}/>
            </View>
        );
    }

    _onChangeText(){}

    _onSubmitEditing(event) {

    }


}

const styles = StyleSheet.create({
    search: {
        marginLeft: 10,
        marginRight: 10,
        height: 36,
        borderWidth: Util.pixel,
        borderColor: '#ccc',
        borderRadius:5,
        marginTop:5,
        paddingLeft:0,
        fontSize:15
    }
});

module.exports = Search;