import { View, Text, StyleSheet, Pressable, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import colors from '@/constants/colors';

export default function AtualizarPerfilScreen() {
    return (
        <View style={styles.container}>
            {/* Botão de voltar */}
            <Pressable style={styles.backButton} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={colors.white} />
            </Pressable>

            {/* Logo */}
            <Image
                source={require('@/assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Atualizar perfil</Text>

            {/* Foto do perfil (estática) 
            <Image
                source={require('@/assets/images/perfil.png')} // Substitua pelo seu caminho real da imagem
                style={styles.profileImage}
            />*/}

            {/* Campos */}
            <TextInput placeholder="Nome*" style={styles.input} />
            <TextInput placeholder="CPF*" style={styles.input} />
            <TextInput placeholder="Matrícula*" style={styles.input} />
            <TextInput placeholder="Telefone pessoal_" style={styles.input} />
            <TextInput placeholder="Endereço residencial_" style={styles.input} />
            <TextInput placeholder="CEP_" style={styles.input} />

            {/* Botão Enviar */}
            <Pressable style={styles.sendButton} onPress={() => {/* enviar para Supabase */}}>
                <Text style={styles.sendButtonText}>ENVIAR</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 40,
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
    logo: {
        width: 200,
        height: 120,
        marginTop: 60,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: colors.black,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 20,
    },
    input: {
        width: '80%',
        backgroundColor: colors.gray,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 4,
        marginVertical: 6,
        fontSize: 14,
        color: colors.black,
    },
    sendButton: {
        backgroundColor: colors.green,
        paddingVertical: 12,
        paddingHorizontal: 60,
        borderRadius: 4,
        marginTop: 20,
    },
    sendButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});
