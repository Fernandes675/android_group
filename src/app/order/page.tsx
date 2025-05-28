import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import colors from '@/constants/colors';

export default function MenuScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {/* Botão de voltar */}
            <Pressable style={styles.backButton} onPress={() => router.push('/')}>
                <Ionicons name="arrow-back" size={24} color={colors.white} />
            </Pressable>

            {/* Equipe */}
            <Text style={styles.title}>Equipe</Text>
            <TextInput placeholder="Nome do motorista" style={styles.input} />
            <TextInput placeholder="Nome do ajudante 1" style={styles.input} />
            <TextInput placeholder="Nome do ajudante 2" style={styles.input} />

            {/* Veículo */}
            <Text style={styles.title}>Veículo</Text>
            <TextInput placeholder="Placa" style={styles.input} />
            <TextInput placeholder="Km inicial" style={styles.input} />
            <TextInput placeholder="Km final" style={styles.input} />

            {/* Dados da Ordem */}
            <Text style={styles.title}>Dados da Ordem</Text>
            <TextInput placeholder="Hora inicial" style={styles.input} />
            <TextInput placeholder="Hora final" style={styles.input} />
            <TextInput placeholder="Data" style={styles.input} />
            <TextInput placeholder="Código da ordem" style={styles.input} />

            {/* Botão Finalizar */}
            <Pressable style={styles.finalizarButton}>
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
