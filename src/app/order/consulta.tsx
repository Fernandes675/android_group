import { View,Text,StyleSheet,ScrollView,Pressable,ActivityIndicator,TextInput,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import colors from '@/constants/colors';

interface OrdemServico {
  codigo_ordem: number;
  motorista: string;
  ajudante_1: string;
  ajudante_2: string;
  placa: string;
  km_inicial: number;
  km_final: number | null;
  hora_inicial: string;
  hora_final: string | null;
  data_ordem: string;
}

function formatarData(data: string): string {
  if (!data) return '';
  const partes = data.split('-');
  if (partes.length !== 3) return data;
  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

export default function ConsultaScreen() {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [filteredOrdens, setFilteredOrdens] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  const buscarOrdens = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('table')
      .select('*')
      .order('data_ordem', { ascending: false });

    if (error) {
      console.error('Erro ao buscar ordens:', error.message);
    } else {
      setOrdens(data as OrdemServico[]);
      setFilteredOrdens(data as OrdemServico[]);
    }

    setLoading(false);
  };

  useEffect(() => {
    buscarOrdens();
  }, []);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredOrdens(ordens);
    } else {
      const filtered = ordens.filter((ordem) =>
        ordem.codigo_ordem.toString().includes(searchText.trim())
      );
      setFilteredOrdens(filtered);
    }
  }, [searchText, ordens]);

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Stack.Screen name="(order)/consulta" options={{ headerShown: false }} />

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color={colors.white} />
      </Pressable>

      <Text style={styles.title}>Ordens de Serviço</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={colors.gray} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pelo código"
          keyboardType="numeric"
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="while-editing"
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.green} />
      ) : filteredOrdens.length > 0 ? (
        filteredOrdens.map((ordem, index) => {
          const isFinalizada = ordem.km_final !== null && ordem.hora_final !== null;
          return (
            <View key={index} style={styles.card}>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: isFinalizada ? colors.green : colors.yellow },
                  ]}
                />
                <Text style={styles.cardText}>Código: {ordem.codigo_ordem}</Text>
              </View>

              <Text style={styles.cardText}>Motorista: {ordem.motorista}</Text>
              <Text style={styles.cardText}>
                Ajudantes: {ordem.ajudante_1}, {ordem.ajudante_2}
              </Text>
              <Text style={styles.cardText}>Placa: {ordem.placa}</Text>
              <Text style={styles.cardText}>
                KM: {ordem.km_inicial} → {ordem.km_final ?? '---'}
              </Text>
              <Text style={styles.cardText}>
                Hora: {ordem.hora_inicial} → {ordem.hora_final ?? '---'}
              </Text>
              <Text style={styles.cardText}>Data: {formatarData(ordem.data_ordem)}</Text>
            </View>
          );
        })
      ) : (
        <Text style={styles.noResultsText}>Nenhuma ordem encontrada.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: colors.white,
    paddingBottom: 80,
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
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.black,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    width: '85%',
    marginTop: 20,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    paddingVertical: 0,
  },
  card: {
    width: '85%',
    backgroundColor: colors.gray,
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
  },
  cardText: {
    fontSize: 16,
    color: colors.black,
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 20,
  },
});
