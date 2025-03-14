//Importa componentes essenciais do React Native para estruturar a tela de carregamento
import { View, Text, ActivityIndicator } from 'react-native'

//Importa React para criar componentes funcionais
import React from 'react'

//Função de componente que exibe uma tela inicial com um indicador de carregamento
export default function StartPage() {
    return (
        //View principal com estilo de flexbos para centralizar o conteudo na tela
        <View style={{ flex: 1, justifyContent: 'center' }}>
            {/*Exibe um indicador de atividade circular, mostrando ao usuário que algo está carregando*/}
            <ActivityIndicator size="large" color="gray" />
        </View>
    )
}