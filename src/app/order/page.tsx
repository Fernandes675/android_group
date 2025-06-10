import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import colors from '@/constants/colors';

interface FormState {
  motorista: string;
  ajudante_1: string;
  ajudante_2: string;
  placa: string;
  km_inicial: string;
  km_final: string;
  hora_inicial: string;
  hora_final: string;
  data_ordem: string;
  codigo_ordem: string;
}

export default function MenuScreen() {
  const [form, setForm] = useState<FormState>({
    motorista: '',
    ajudante_1: '',
    ajudante_2: '',
    placa: '',
    km_inicial: '',
    km_final: '',
    hora_inicial: '',
    hora_final: '',
    data_ordem: '',
    codigo_ordem: '',
  });

  const handleChange = (key: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleHoraChange = (key: keyof FormState, text: string) => {
    const digits = text.replace(/\D/g, '');
    let formatted = '';

    if (digits.length === 0) {
      formatted = '';
    } else if (digits.length <= 2) {
      formatted = digits;
    } else {
      const hours = digits.substring(0, 2);
      const minutes = digits.substring(2, 4);
      formatted = `${hours}h${minutes}`;
    }

    handleChange(key, formatted);
  };

  const validateFields = () => {
    const obrigatorios = [
      { campo: 'motorista', valor: form.motorista },
      { campo: 'placa', valor: form.placa },
      { campo: 'km_inicial', valor: form.km_inicial },
      { campo: 'hora_inicial', valor: form.hora_inicial },
      { campo: 'data_ordem', valor: form.data_ordem },
      { campo: 'codigo_ordem', valor: form.codigo_ordem },
    ];

    const faltando = obrigatorios.filter(item => item.valor.trim() === '');
    if (faltando.length > 0) {
      const campos = faltando.map(item => item.campo).join(', ');
      Alert.alert('Campos obrigatórios', `Preencha os campos: ${campos}`);
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateFields()) return;

    const kmInicialNum = parseInt(form.km_inicial) || 0;
    const codigoOrdemNum = parseInt(form.codigo_ordem) || 0;

    const { error } = await supabase.from('table').insert({
      motorista: form.motorista,
      ajudante_1: form.ajudante_1,
      ajudante_2: form.ajudante_2,
      placa: form.placa,
      km_inicial: kmInicialNum,
      km_final: null,
      hora_inicial: form.hora_inicial,
      hora_final: null,
      data_ordem: form.data_ordem,
      codigo_ordem: codigoOrdemNum,
    });

    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      Alert.alert('Ordem Criada', 'A ordem de serviço foi criada com sucesso!');
      setForm({
        motorista: '',
        ajudante_1: '',
        ajudante_2: '',
        placa: '',
        km_inicial: '',
        km_final: '',
        hora_inicial: '',
        hora_final: '',
        data_ordem: '',
        codigo_ordem: '',
      });
      setTimeout(() => router.replace('/order/inicial'), 500);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen name="(order)/inicial" options={{ headerShown: false }} />

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.white} />
      </Pressable>

      <Text style={styles.title}>Equipe</Text>
      <TextInput
        placeholder="Nome do motorista"
        style={styles.input}
        value={form.motorista}
        onChangeText={text => handleChange('motorista', text)}
      />
      <TextInput
        placeholder="Nome do ajudante 1"
        style={styles.input}
        value={form.ajudante_1}
        onChangeText={text => handleChange('ajudante_1', text)}
      />
      <TextInput
        placeholder="Nome do ajudante 2"
        style={styles.input}
        value={form.ajudante_2}
        onChangeText={text => handleChange('ajudante_2', text)}
      />

      <Text style={styles.title}>Veículo</Text>
      <TextInput
        placeholder="Placa"
        style={styles.input}
        value={form.placa}
        onChangeText={text => handleChange('placa', text)}
      />
      <TextInput
        placeholder="Km inicial"
        style={styles.input}
        keyboardType="numeric"
        value={form.km_inicial}
        onChangeText={text => handleChange('km_inicial', text)}
      />
      <TextInput
        placeholder="Km final"
        style={[styles.input, styles.disabledInput]}
        value={form.km_final}
        editable={false}
        selectTextOnFocus={false}
      />

      <Text style={styles.title}>Dados da Ordem</Text>
      <TextInput
        placeholder="Hora inicial"
        style={styles.input}
        keyboardType="numeric"
        value={form.hora_inicial}
        onChangeText={text => handleHoraChange('hora_inicial', text)}
      />
      <TextInput
        placeholder="Hora final"
        style={[styles.input, styles.disabledInput]}
        value={form.hora_final}
        editable={false}
        selectTextOnFocus={false}
      />
      <TextInput
        placeholder="Data (YYYY-MM-DD)"
        style={styles.input}
        value={form.data_ordem}
        onChangeText={text => handleChange('data_ordem', text)}
      />
      <TextInput
        placeholder="Código da ordem"
        style={styles.input}
        keyboardType="numeric"
        value={form.codigo_ordem}
        onChangeText={text => handleChange('codigo_ordem', text)}
      />

      <Pressable style={styles.finalizarButton} onPress={handleSubmit}>
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
  disabledInput: {
    opacity: 0.5,
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
