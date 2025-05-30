// Importação de componentes básicos do React Native
import { View, Text } from 'react-native'
// Importação do React
import React from 'react'
// Importação da biblioteca Lottie para animações
// Lottie permite usar animações JSON criadas no After Effects
import LottieView from 'lottie-react-native';

/**
 * Componente Loading
 * 
 * Este componente renderiza uma animação de carregamento usando Lottie
 * 
 * @param {number} size - Tamanho do indicador de carregamento (altura em unidades de medida do React Native)
 * @returns {JSX.Element} Componente de loading com animação
 */
export default function Loading({ size }) {
    return (
        // Container que envolve a animação
        // Usa a propriedade size para definir a altura
        // aspectRatio 1 garante que o componente seja um quadrado perfeito (largura = altura)
        <View style={{ height: size, aspectRatio: 1 }}>
            {/* 
        Componente LottieView que exibe a animação
        - style={{flex: 1}} faz com que a animação ocupe todo o espaço disponível no container
        - source carrega o arquivo JSON da animação da pasta assets/images
        - autoPlay inicia a animação automaticamente quando o componente é montado
        - loop faz com que a animação se repita indefinidamente
      */}
            <LottieView style={{ flex: 1 }} source={require('../assets/images/loading.json')} autoPlay loop />
        </View>
    )
}