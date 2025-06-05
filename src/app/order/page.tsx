// Importações dos componentes básicos do React Native
import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, Alert } from 'react-native';
// Ícones do Ionicons para usar no botão de voltar
import { Ionicons } from '@expo/vector-icons';
// Router e Stack do expo-router para navegação entre telas
import { router, Stack } from 'expo-router';
// useState para gerenciar estado local
import { useState } from 'react';
// Cliente supabase para comunicação com banco de dados
import { supabase } from '../../lib/supabase'; // ajuste o caminho conforme sua estrutura
// Importa as cores personalizadas do projeto
import colors from '@/constants/colors';

// Define o formato do estado "form" usando uma interface TypeScript,
// garantindo que as propriedades tenham tipos corretos (todas strings aqui)
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

// Componente funcional principal da tela MenuScreen
export default function MenuScreen() {
  // Cria o estado "form" com os campos iniciais todos vazios
  // useState com tipagem FormState para controlar o formulário
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

  // Função para atualizar o estado do formulário
  // Recebe a chave (key) que deve ser uma das propriedades do FormState
  // e o valor (value) digitado pelo usuário
  const handleChange = (key: keyof FormState, value: string) => {
    // Atualiza o estado mantendo os valores antigos e
    // sobrescrevendo a propriedade especificada pelo usuário
    setForm(prev => ({ ...prev, [key]: value }));
  };

  // Função assíncrona chamada quando o usuário clica em FINALIZAR
  const handleSubmit = async () => {
    // Converte as strings numéricas para números inteiros
    // Caso o valor não possa ser convertido, usa 0 como fallback
    const kmInicialNum = parseInt(form.km_inicial) || 0;
    const kmFinalNum = parseInt(form.km_final) || 0;
    const codigoOrdemNum = parseInt(form.codigo_ordem) || 0;

    // Envia os dados para o Supabase, inserindo uma nova linha na tabela "table"
    // Cada campo do formulário é mapeado para a coluna correspondente no banco
    const { error } = await supabase.from('table').insert({
      motorista: form.motorista,
      ajudante_1: form.ajudante_1,
      ajudante_2: form.ajudante_2,
      placa: form.placa,
      km_inicial: kmInicialNum,
      km_final: kmFinalNum,
      hora_inicial: form.hora_inicial,
      hora_final: form.hora_final,
      data_ordem: form.data_ordem,
      codigo_ordem: codigoOrdemNum,
    });

    // Se houver erro, exibe alerta com a mensagem do erro
    if (error) {
      Alert.alert('Erro', error.message);
    } else {
      // Caso sucesso, mostra alerta de confirmação e volta para a tela anterior
      Alert.alert('Sucesso', 'Dados enviados com sucesso!');
    }
  };

  // JSX para renderizar o formulário dentro de um ScrollView para permitir scroll
  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Configura a tela dentro do Stack navigator, sem mostrar header */}
      <Stack.Screen name="(order)/inicial" options={{ headerShown: false }} />

      {/* Botão de voltar posicionado no topo esquerdo */}
      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.white} />
      </Pressable>

      {/* Seção "Equipe" com os inputs */}
      <Text style={styles.title}>Equipe</Text>
      <TextInput
        placeholder="Nome do motorista"
        style={styles.input}
        value={form.motorista} // valor do input controlado pelo estado
        onChangeText={text => handleChange('motorista', text)} // atualiza o estado ao digitar
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

      {/* Seção "Veículo" */}
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
        keyboardType="numeric" // teclado numérico no celular
        value={form.km_inicial}
        onChangeText={text => handleChange('km_inicial', text)}
      />
      <TextInput
        placeholder="Km final"
        style={styles.input}
        keyboardType="numeric"
        value={form.km_final}
        onChangeText={text => handleChange('km_final', text)}
      />

      {/* Seção "Dados da Ordem" */}
      <Text style={styles.title}>Dados da Ordem</Text>
      <TextInput
        placeholder="Hora inicial"
        style={styles.input}
        value={form.hora_inicial}
        onChangeText={text => handleChange('hora_inicial', text)}
      />
      <TextInput
        placeholder="Hora final"
        style={styles.input}
        value={form.hora_final}
        onChangeText={text => handleChange('hora_final', text)}
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

      {/* Botão FINALIZAR que chama handleSubmit ao ser pressionado */}
      <Pressable style={styles.finalizarButton} onPress={handleSubmit}>
        <Text style={styles.finalizarButtonText}>FINALIZAR</Text>
      </Pressable>
    </ScrollView>
  );
}

// Estilos para todos os elementos da tela, usando StyleSheet do React Native
const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // centraliza itens horizontalmente
    paddingVertical: 40, // espaço acima e abaixo do conteúdo
    paddingBottom: 80, // espaço extra no final para scroll confortável
    backgroundColor: colors.white, // cor de fundo da tela
  },
  backButton: {
    position: 'absolute', // posiciona de forma absoluta na tela
    top: 40, // distância do topo
    left: 20, // distância da esquerda
    backgroundColor: colors.green, // cor do botão
    padding: 10, // espaçamento interno
    borderRadius: 50, // deixa o botão redondo
    zIndex: 1, // fica acima de outros elementos
  },
  title: {
    fontSize: 20, // tamanho da fonte
    fontWeight: 'bold', // texto em negrito
    marginTop: 30, // espaçamento acima do título
    marginBottom: 10, // espaçamento abaixo do título
    color: colors.black, // cor do texto
  },
  input: {
    width: '80%', // ocupa 80% da largura do container
    paddingVertical: 12, // espaço interno vertical
    paddingHorizontal: 16, // espaço interno horizontal
    backgroundColor: colors.gray, // cor de fundo do input
    borderRadius: 4, // cantos arredondados
    color: colors.black, // cor do texto digitado
    fontSize: 16, // tamanho do texto
    marginVertical: 6, // espaçamento entre inputs
  },
  finalizarButton: {
    marginTop: 30, // espaço acima do botão
    backgroundColor: colors.green, // cor do botão
    paddingVertical: 14, // espaçamento interno vertical
    paddingHorizontal: 32, // espaçamento interno horizontal
    borderRadius: 4, // cantos arredondados
    marginBottom: 40, // espaço abaixo do botão para o final do scroll
  },
  finalizarButtonText: {
    color: colors.white, // cor do texto do botão
    fontWeight: 'bold', // texto em negrito
    fontSize: 16, // tamanho da fonte
  },
});
