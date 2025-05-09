import { View, StyleSheet, Image, TextInput, Pressable, Text, ScrollView, Alert } from 'react-native';
import colors from '@/constants/colors';
import { Link, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Verifica conexão
    useEffect(() => {
        const checkConnection = async () => {
            try {
                const response = await fetch('https://facebook.com', { method: 'HEAD' });
                if (!response.ok) throw new Error('Sem resposta');
            } catch (error) {
                Alert.alert('Sem conexão', 'Você será redirecionado para o modo offline.');
                router.replace('./(offline)/painel');
            }
        };

        checkConnection();
    }, []);

    async function handleSignIn() {
        setLoading(true);

        const { error } = await supabase.auth.signIn({
            email,
            password,
        });

        if (error) {
            Alert.alert('Erro', error.message);
            setLoading(false);
            return;
        }

        setLoading(false);
        router.replace('/(panel)/profile/page');
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.container}>
                <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.form}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        placeholder="Digite seu e-mail..."
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />

                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        placeholder="Digite sua senha..."
                        style={styles.input}
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />

                    <Pressable style={styles.button} onPress={handleSignIn}>
                        <Text style={styles.buttonText}>
                            {loading ? 'Carregando...' : 'Entrar'}
                        </Text>
                    </Pressable>

                    <Link href='/(auth)/signup/page' style={styles.link}>
                        <Text>Ainda não possui uma conta? Cadastre-se</Text>    
                    </Link>
                    <Link href="/(auth)/forgot-password/page" style={styles.forgotLink}>
                        <Text>Esqueci minha senha</Text>
                    </Link>
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
    },
    logo: {
        width: 250,
        height: 160,
        marginBottom: 30,
        marginTop: -25,
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
    link: {
        marginTop: 16,
        textAlign: 'center',
    },
    forgotLink: {
        marginTop: 12,
        textAlign: 'center',
    }
});
