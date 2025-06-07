import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import colors from '@/constants/colors';

export default function FinalizarScreen() {
  const [codigoOrdem, setCodigoOrdem] = useState('');
  const [kmFinal, setKmFinal] = useState('');
  const [horaFinal, setHoraFinal] = useState('');

  const handleHoraChange = (text: string) => {
    const digits = text.replace(/\D/g, '');
    let formatted = '';
    if (digits.length <= 2) {
      formatted = digits;
    } else {
      const hours = digits.substring(0, 2);
      const minutes = digits.substring(2, 4);
      formatted = `${hours}h${minutes}`;
    }
    setHoraFinal(formatted);
  };

  const handleFinalizar = async () => {
    const codigo = parseInt(codigoOrdem);
    const km = parseInt(kmFinal);

    if (!codigo || !horaFinal || !kmFinal) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const { error } = await supabase
      .from('table')
      .update({
        hora_final: horaFinal,
        km_final: km,
      })
      .eq('codigo_ordem', codigo);

    if (error) {
      Alert.alert('Erro ao finalizar', error.message);
    } else {
      Alert.alert('Sucesso', 'Ordem finalizada com sucesso!');
      setCodigoOrdem('');
      setKmFinal('');
      setHoraFinal('');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen name="(order)/finalizar" options={{ headerShown: false }} />

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.white} />
      </Pressable>

      <Text style={styles.title}>Finalizar Ordem</Text>

      <TextInput
        placeholder="Código da ordem"
        style={styles.input}
        keyboardType="numeric"
        value={codigoOrdem}
        onChangeText={setCodigoOrdem}
      />

      <TextInput
        placeholder="Km final"
        style={styles.input}
        keyboardType="numeric"
        value={kmFinal}
        onChangeText={setKmFinal}
      />

      <TextInput
        placeholder="Hora final"
        style={styles.input}
        value={horaFinal}
        keyboardType="numeric"
        onChangeText={handleHoraChange}
      />

      <Pressable style={styles.finalizarButton} onPress={handleFinalizar}>
        <Text style={styles.finalizarButtonText}>FINALIZAR</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingBottom: 80,
    backgroundColor: colors.white,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    color: colors.black,
  },
  input: {
    width: '80%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.gray,
    borderRadius: 4,
    color: colors.black,
    fontSize: 16,
    marginVertical: 6,
  },
  finalizarButton: {
    marginTop: 30,
    backgroundColor: colors.green,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 4,
    marginBottom: 40,
  },
  finalizarButtonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
