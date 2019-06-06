import React, { Component } from 'react';
import { 
  Image,
  StyleSheet,
  View,  
  TouchableOpacity, 
  TextInput
} from 'react-native';
 
export default class InputComentario extends Component {
  render() {
    const { comentarioCallback, idFoto } = this.props;
    return(
      <View style={styles.novoComentario}>
      <TextInput style={styles.input}
        placeholder="Adicione um comentário..."
        ref={input => this.inputComentario = input}
        onChangeText={texto => this.setState({valorComentario: texto})}
        underlineColorAndroid="transparent"
      />
      <TouchableOpacity onPress={() => {
        comentarioCallback(idFoto, this.state.valorComentario, this.inputComentario);
        this.setState({valorComentario: ''});
      }}>
        <Image style={styles.icone}
          source={require('../../resources/img/send.png')} />
      </TouchableOpacity>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 40,
  },
  icone: {
    width: 30,
    height: 30,
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
})