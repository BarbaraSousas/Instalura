/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Feed from './src/Components/Feed';
import Login from './src/screens/Login';
  
const RootStack = createStackNavigator( 
  { 
    Login, 
    Feed,
    PerfilUsuario: Feed,
  }, 
  { 
    initialRouteName: 'Login', 
  } 
); 


const AppContainer = createAppContainer(RootStack); 

AppRegistry.registerComponent('InstaluraMobile', () => AppContainer); 

