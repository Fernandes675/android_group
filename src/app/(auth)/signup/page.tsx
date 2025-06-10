import {View,StyleSheet,Image,TextInput,Pressable,Text,ScrollView,SafeAreaView,Alert,} from 'react-native';
import colors from '@/constants/colors';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      Alert.alert('Erro', error.message);
      return;
    }

    router.replace('/');
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Botão de voltar */}
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </Pressable>

        {/* Logo */}
        <Image
          source={require('@/assets/images/logo.png')} // <-- use esse se o alias estiver funcionando
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Formulário */}
        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            placeholder="Nome completo..."
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Digite seu e-mail..."
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            placeholder="Digite sua senha..."
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.button} onPress={handleSignUp}>
            <Text style={styles.buttonText}>
              {loading ? 'Carregando...' : 'Cadastrar'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    position: 'relative',
  },
  logo: {
    width: 250,
    height: 160,
    marginBottom: 30,
    marginTop: 10,
  },
  form: {
    width: '85%',
    backgroundColor: colors.gray,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.green,
    width: '100%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 1,
    left: 20,
    padding: 8,
    borderRadius: 50,
    backgroundColor: colors.green,
    zIndex: 10,
  },
});
