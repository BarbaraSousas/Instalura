import React, { Component } from 'react';
import { 
  Image,
  StyleSheet,
  Text, 
  View, 
  Dimensions, 
  TouchableOpacity, 
} from 'react-native';
import InputComentario from './InputComentario';
import Likes from './Likes';

const { width } = Dimensions.get('screen');

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      foto: this.props.foto,
      valorComentario: '',
    }
  }

  exibeLegenda(foto) {
    if(foto.comentario == '')
      return;

    return (
      <View style={styles.comentario}>
        <Text style={styles.tituloComentario}>
          {foto.loginUsuario}
        </Text>
        <Text>{foto.comentario}</Text>
      </View>
    )
  }

  render() {
    const { likeCallback, comentarioCallback, foto, verPerfilCallback } = this.props;

    return(
      <View>
        <TouchableOpacity style={styles.cabecalho}
          onPress={() => verPerfilCallback(foto.id)}>
          <View>
            <Image source={{uri: foto.urlPerfil}}
              style={styles.fotoDoPerfil}
            />
            <Text>{foto.loginUsuario}</Text>
          </View>  
        </TouchableOpacity>
        <Image source={{uri: foto.urlFoto}}
          style={styles.foto}
        />
        <Likes foto={foto} likeCallback={likeCallback} />
        {this.exibeLegenda(foto)}
        {foto.comentarios.map((comentario, index) => 
          <View style={styles.comentario} key={index}>
            <Text style={styles.tituloComentario}>{comentario.login}</Text>
            <Text>{comentario.texto}</Text>
          </View>
        )}
        <InputComentario idFoto={foto.id}
          comentarioCallback={comentarioCallback} />
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  cabecalho: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fotoDoPerfil: {
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40,
  },
  foto: {
    width: width,
    height: width,
  },
  comentario: {
    flexDirection: 'row',
    margin: 10,
  },
  tituloComentario: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  likes: {
    margin: 10,
  },
})