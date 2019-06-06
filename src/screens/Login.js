import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  Button,
  Text,
  YellowBox,
  AsyncStorage,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

const width = Dimensions.get('screen').width;

YellowBox.ignoreWarnings(['Require cycle:', 'Async Storage']);

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      usuario: 'rafael',
      senha: '123456',
      mensagem: '',
    }
  }

  static navigationOptions = { 
    header: null,
  };  

  efetuaLogin = () => {
    const { usuario, senha } = this.state;
    const { navigation } = this.props;
    const uri = 'https://instalura-api.herokuapp.com/api/public/login'; 

    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({
        login: usuario,
        senha: senha,
      }),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    }

    fetch(uri, requestInfo)
      .then(response => {
        if (response.ok)
          return response.text();
        
        throw new Error('Não foi possível efetuar login');
      })
      .then(token => {
        AsyncStorage.setItem('token', token);
        AsyncStorage.setItem('usuario', usuario);
        const resetAction = StackActions.reset({ 
          index: 0, 
          actions: [NavigationActions.navigate({ routeName: 'Feed' })], 
        });
        navigation.dispatch(resetAction); 
      })
      .catch(error => this.setState({ mensagem: error.message }));
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Instalura</Text>
        <View style={styles.form}>
          <TextInput
            autoCapitalize="none"
            style={styles.input}
            placeholder="Usuário..."
            value="rafael"
            onChangeText={texto => this.setState({ usuario: texto })}
          />
          <TextInput
            autoCapitalize="none"
            secureTextEntry={true}
            style={styles.input}
            placeholder="Senha..."
            value="123456"
            onChangeText={texto => this.setState({ senha: texto })}
          />
          <Button title="login"
            onPress={this.efetuaLogin} />
        </View>
        <View style={{ marginTop: 50 }}> 
            <Button 
              title="Temos uma novidade!" 
              onPress={() => navigation.navigate('AluraLingua')}
            /> 
          </View> 
        <Text style={styles.mensagem}>{this.state.mensagem}</Text> 
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    width: width * 0.8,
  },
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',   
  },
  titulo: {
    fontWeight: 'bold',
    fontSize: 26,
  }
})