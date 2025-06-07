import { View, Text } from 'react-native';

export default function PainelOffline() {
    return (
        <View style={{ flex: 1 }}>
            {/* Página atual */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Sem conexão. Modo offline ativado.</Text>
            </View>

            {/* Página em branco */}
            <View style={{ flex: 1, backgroundColor: 'white' }}>
              
            </View>
        </View>
    );
}
