import React, { Component } from 'react';
import { AppRegistry} from 'react-native';
/*import { Provider } from 'react-redux';
import configureStore from './store/ConfigureStore';*/
import Reg from './component/Reg';
/*
 * 初始化StackNavigator
 */
/*const store = configureStore();*/
export default class ReaderComponent extends Component {
    render() {
        return (
            <Reg></Reg>
            /*<Provider store={store}>
                <Reg></Reg>
            </Provider>*/
        );
    }
}

AppRegistry.registerComponent('RnProject', () => ReaderComponent);
