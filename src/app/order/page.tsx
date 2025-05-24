import { View, Text, StyleSheet, Image, TextInput, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import colors from '@/constants/colors';

export default function MenuScreen() {
    return (
        <View style={styles.container}>
            {/* Botão de voltar */}
            <Pressable style={styles.backButton} onPress={() => router.push('/')}>
                <Ionicons name="arrow-back" size={24} color={colors.white} />
            </Pressable>

            {/* Logo */}
            <Image
                source={require('../../../../assets/images/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <Text style={styles.title}>Equipe</Text>

            {/* Campos de texto */}
            <TextInput
                placeholder="Nome do motorista"
                style={styles.input}
            />
            <TextInput
                placeholder="Nome do ajudante 1"
                style={styles.input}
            />
            <TextInput
                placeholder="Nome do ajudante 2"
                style={styles.input}
            />
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
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
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
        marginVertical: 8,
    },
});
