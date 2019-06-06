import {
  AsyncStorage
} from 'react-native';

export default class InstaluraFetchService {
  static base = 'https://instalura-api.herokuapp.com/api';

  static get(recurso) {
    return this.request(recurso)
  }

  static post(recurso, dados) {
    return this.request(recurso, 'POST', dados);
  }

  static async request(recurso, metodo, dados) {
    const uri = `${this.base}${recurso}`;
    const token = await AsyncStorage.getItem('token')
    const requestInfo = {
        method: metodo || 'GET',
        body: JSON.stringify(dados),
        headers: new Headers({
          'Content-type': 'application/json',
          'X-AUTH-TOKEN': token,
        }),
      };

      const resposta = await fetch(uri, requestInfo);
      if (resposta.ok) {
        return resposta.json();
      }

    throw new Error('Não foi possível completar a operação');
  }
}