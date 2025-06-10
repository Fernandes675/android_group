import { View, Text, TextInput, Pressable, StyleSheet, Alert, ScrollView, Image } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { router, Stack } from 'expo-router';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  async function handleResetPassword() {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu e-mail');
      return;
    }

    const { error } = await supabase.auth.api.resetPasswordForEmail(email);

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Sucesso', 'E-mail de recuperação enviado!');
      router.back(); // Volta para a tela de login
    }
  }

  return (

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        
        <Stack.Screen
        name="(auth)/forgot-password/page" 
        options={{ headerShown: false }} 
        />

         <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.white} />
            </Pressable>

        <Image
          source={require('../../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
<View style={styles.form}>
        <Text style={styles.title}>Recuperar Senha</Text>

        <TextInput
          style={styles.input}
          placeholder = "Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />

        <Pressable style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Enviar E-mail</Text>
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
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 160,
    marginBottom: 30,
    marginTop: -25,
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlign: 'left',
    width: 200,
    fontSize: 16,
    color: colors.black,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    
  },
  button: {
    backgroundColor: colors.green,
    width: '80%',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  form: {
    width: '85%',
    backgroundColor: colors.gray,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },

  backButton: {
      position: 'absolute',
      top: 40,
      left: 20,
      backgroundColor: colors.green,
      padding: 10,
      borderRadius: 50,
      zIndex: 1,
 },    
});
