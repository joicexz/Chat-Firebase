// Importa os componentes básicos do React Native
import { View, Text } from 'react-native'

// Importa o React (necessário para criar componentes)
import React from 'react'

// Importa funções para trabalhar com medidas responsivas (porcentagem da tela)
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Define o componente MessageItem como exportação padrão
// Ele recebe dois parâmetros: a `message` (mensagem exibida) e o `currentUser` (usuário atual logado)
export default function MessageItem({ message, currentUser }) {

    // Verifica se o autor da mensagem é o usuário atual
    if (currentUser?.userId == message?.userId) {
        // Se for o usuário atual, renderiza a mensagem no lado direito (estilo "minha mensagem")
        return (
            <View className="flex-row justify-end mb-3 mr-3">
                {/* Define a largura da mensagem como 80% da largura da tela */}
                <View style={{ width: wp(80) }}>

                    {/* Caixa da mensagem com padding, bordas arredondadas, borda cinza clara e fundo branco */}
                    <View className="flex self-end p-3 rounded-2xl px-4 bg-white border border-neutral-200">
                        {/* Texto da mensagem, com tamanho ajustado à altura da tela */}
                        <Text style={{ fontSize: hp(1.9) }}>
                            {message?.text}
                        </Text>
                    </View>

                </View>
            </View>
        )
    } else {
        // Se for uma mensagem de outra pessoa, renderiza no lado esquerdo com estilo diferente
        return (
            // Largura também de 80% da tela, margem à esquerda para afastar da borda
            <View style={{ width: wp(80) }} className="ml-3 mb-3">

                {/* Caixa da mensagem com padding, bordas arredondadas, borda e fundo azul claro */}
                <View className="flex self-start p-3 px-4 rounded-2xl bg-indigo-100 border border-indigo-200">
                    {/* Texto da mensagem com o mesmo tamanho da versão anterior */}
                    <Text style={{ fontSize: hp(1.9) }}>
                        {message?.text}
                    </Text>
                </View>

            </View>
        )
    }
}