import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/authSlice';

export default function Register({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const dispatch = useDispatch();
  const { loading, error, registerSuccessMessage } = useSelector((state) => state.auth);

  const handleRegister = () => {
    if (!email || !senha) return;
    console.log('handleRegister', { email, senha });
    dispatch(registerUser({ email, senha }));
  };

  useEffect(() => {
    if (registerSuccessMessage) {
      console.log('registerSuccessMessage', registerSuccessMessage);
      alert(registerSuccessMessage);
      navigation.goBack();
    }
    if (error) {
      console.log('Erro:', error);
    }
  }, [registerSuccessMessage, error, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Usuário</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#A78BFA"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        placeholderTextColor="#A78BFA"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#8B5CF6" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#1A1A1A',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#D8B4FE',
    alignSelf: 'center',
    marginBottom: 24,
    fontFamily: 'Roboto',
    textShadowColor: '#8B5CF6',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#6D28D9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    color: '#FFFFFF',
    backgroundColor: '#3C2F5F',
    fontFamily: 'Roboto',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'Roboto',
  },
  error: {
    color: '#F87171',
    marginBottom: 12,
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'Roboto',
  },
});
