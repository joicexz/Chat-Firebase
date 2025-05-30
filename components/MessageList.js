// Importa componentes visuais do React Native
import { View, Text, ScrollView } from 'react-native'

// Importa o React (necessário para criar componentes funcionais)
import React from 'react'

// Importa o componente que representa uma única mensagem
import MessageItem from './MessageItem'

// Declara e exporta o componente MessageList
// Ele recebe três props:
// - messages: um array de mensagens a serem exibidas
// - scrollViewRef: uma referência para controlar a rolagem (útil para rolar até o final automaticamente)
// - currentUser: o usuário atual (para saber quais mensagens são dele)
export default function MessageList({ messages, scrollViewRef, currentUser }) {
    return (
        // ScrollView permite rolagem vertical do conteúdo
        // A `ref` é usada para controlar a rolagem programaticamente (ex: rolar até a última mensagem)
        // `showsVerticalScrollIndicator={false}` oculta a barra de rolagem vertical
        // `contentContainerStyle={{paddingTop: 10}}` adiciona um espaçamento no topo
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingTop: 10 }}
        >
            {
                // Mapeia o array de mensagens, renderizando um componente <MessageItem> para cada uma
                messages.map((message, index) => {
                    return (
                        // Cada mensagem recebe:
                        // - a própria mensagem
                        // - a chave única (index do array)
                        // - o usuário atual (para determinar estilo de envio ou recebimento)
                        <MessageItem
                            message={message}
                            key={index}
                            currentUser={currentUser}
                        />
                    )
                })
            }
        </ScrollView>
    )
}