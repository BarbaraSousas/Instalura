import React, { Component } from 'react';
import { 
  Image,
  StyleSheet,
  View,  
  TouchableOpacity,
  Text,
} from 'react-native';

export default class Likes extends Component {
  carregaIcone(likeada) {
    return likeada ? 
    require('../../resources/img/s2-checked.png') :
    require('../../resources/img/s2.png')
  }

  exibeLikes(likers) {
    return (
      <Text style={styles.likes}>
        {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
      </Text>
    );
  }

  render() {
    const { foto, likeCallback } = this.props;
    return (
      <View style={styles.rodape}>
        <TouchableOpacity onPress={() => likeCallback(foto.id)}>
          <Image style={styles.botaoDeLike}
            source={this.carregaIcone(foto.likeada)}
          />
        </TouchableOpacity>

        {this.exibeLikes(foto.likers)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  rodape: {
    margin: 10,
  },
  botaoDeLike: {
    height: 40,
    width: 40,
  },
})