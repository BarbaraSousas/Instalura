import React, { Component } from 'react';
import {
  FlatList,
  AsyncStorage,
  View, } from 'react-native';
import Post from './Post';
import InstaluraFetchService from '../services/InstaluraFetchService';
import { NavigationEvents } from 'react-navigation';
import HeaderUsuario from './HeaderUsuario';
import { ScrollView } from 'react-native-gesture-handler';

export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      fotos: [],
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('usuario', 'Instalura'),
    };
  };

  componentDidMount() {
    this.atualizaFeed();
  }

  atualizaFeed() {
    let uri = '/fotos';
    const { navigation } = this.props;
    const usuario = navigation.getParam('usuario');

    if(usuario)
      uri = `/public/fotos/${usuario}`;

    InstaluraFetchService.get(uri)
      .then(json => this.setState({ fotos: json }))
  }
  
  buscaPorId = idFoto => {
    const { fotos } = this.state;
    return fotos.find(f => f.id === idFoto)
  }

  atualizaFotos = fotoAtualizada => {
    const { fotos } = this.state;
    const fotosAtualizadas = fotos.map(f => f.id === fotoAtualizada.id ? fotoAtualizada : f);
    this.setState({ fotos: fotosAtualizadas });
  }

  like = (idFoto) => {
    const foto = this.buscaPorId(idFoto);

    AsyncStorage.getItem('usuario')
      .then(usuarioLogado => {
        let novaLista = [];
        if(!foto.likeada) {
          novaLista = [
            ...foto.likers,
            { login: usuarioLogado }
          ];
        } else {
          novaLista = foto.likers.filter(liker => {
            return liker.login !== usuarioLogado
          });
        }
        return novaLista;
      })
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          likeada: !foto.likeada,
          likers: novaLista
        };
        this.atualizaFotos(fotoAtualizada)
      })

      InstaluraFetchService.post(`/fotos/${idFoto}/like`)
        .catch(e => {
          this.setState({ fotos: listaOriginal })
          Notificacao.exibe('Opss...', 'Algo deu errado ao curtir');
        });
  }

  adicionaComentario = (idFoto, valorComentario, inputComentario) => {
    if(valorComentario === '') 
      return;

    const foto = this.buscaPorId(idFoto);
    
    const comentario = {
      texto: valorComentario,
    };

    InstaluraFetchService.post(`/fotos/${idFoto}/comment`, comentario)
      .then(comentario => [...foto.comentarios, comentario])
      .then(novaLista => {
        const fotoAtualizada = {
          ...foto,
          comentarios: novaLista,
        }
        this.atualizaFotos(fotoAtualizada);
        inputComentario.clear();
      })
      .catch(e => {
        this.setState({ fotos: listaOriginal })
        Notificacao.exibe('Opss...', 'Algo deu errado ao curtir');
      });
  }

  verPerfilUsuario = (idFoto) => {
    const { navigation } = this.props;
    const foto = this.buscaPorId(idFoto);
    navigation.navigate('PerfilUsuario', { 
      usuario: foto.loginUsuario,
      fotoDePerfil: foto.urlPerfil,
    });
  }

  exibeHeader() {
    const { navigation } = this.props;
    const { fotos } = this.state;
    const usuario = navigation.getParam('usuario');
    const fotoDePerfil = navigation.getParam('fotoDePerfil')
    
    return (
      usuario && <HeaderUsuario 
        usuario={usuario}
        posts={fotos.length}
        fotoDePerfil={fotoDePerfil} />
      )
  }

  render() {
    return (
      <ScrollView>
        <NavigationEvents onWillFocus={() => this.atualizaFeed()} />
        <FlatList
          keyExtractor={item => String(item.id)}
          data={this.state.fotos}
          renderItem={ ({item}) =>
            <Post foto={item}
              likeCallback={this.like}
              comentarioCallback={this.adicionaComentario}
              verPerfilCallback={this.verPerfilUsuario} />
          }
        />
      </ScrollView>
    );
  }
}
