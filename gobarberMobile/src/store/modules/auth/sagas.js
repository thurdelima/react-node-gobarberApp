import { takeLatest, call, put, all } from 'redux-saga/effects';
import {Alert} from 'react-native';


import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert('Erro no login', 'O usuário não pode ser prestador de servico');

      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    //history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha ao autenticar', 'Houve um erro, verifique seus dados.');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    console.log('data: ', payload);

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: false,
    });

    console.log('r response: ', r);



    //history.push('/');
    Alert.alert('Sucesso!', 'Seu usuário foi criado com sucesso.');

  } catch (err) {
    Alert.alert('Falha no cadastro', 'Houve um erro no cadastro, verifique seus dados.');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  //history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
