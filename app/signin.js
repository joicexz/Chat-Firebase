//Importa componentes do React Native para estruturar a interface e interatividade
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'

//Importa React, hooks de estado e referência para gerenciar os inputs e estado de carregamento
import React, { useRef, useState } from 'react'

//Importa funções para criar layouts responsivos com base no tamanho da tela
import { widhtPercentageToDP as wp, heightPercentage as hp } from 'react-native-responsive-screen';

//Importa o componente StatusBar para controlar a barra de status
import { StatusBar } from 'expo-status-bar';

//Importa ícones do pacote expo, como o ícone de email e cadeado para o input de senha
import { Octicons } from '@expo/vector-icons';

//Importa o hook de navegação do expo-router para navegação entre telas
import { useRouter } from 'expo-router';

//Importa componentes personalizados, como o carregamento (loading) e o gerenciamento de teclado customizado
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';

//Importa o contexto de autenticação para gerenciar o login
import { useAuth } from '../context/authContext';

//Função de componente para a tela de login
export default function Signin() {
    //Hook de navegação para redirecionar o usuário após o login
    const router = useRouter();

    //useState para gerenciar o estado de carregamento (loading) enquanto o login é processado 
    const [loading, setLoading] = useState(false);

    //Hook do contexto de autenticação, que inclui a função de login
    const { login } = useAuth();

    //useRef cria referências para os inputs de email e senha
    const emailRef = useRef("");
    const passwordRef = useRef("");

    //Função que lida com o processo de login
    const handleLogin = async () => {
        //Verifica se os campos de email e senha estão preenchidos
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('Sign In', "Por favor, preencha todos os campos");
            return;
        }
        //Ativa o estado de carregamento e tenta fazer o login com os dados fornecidos
        setLoading(true);
        const response = await login(emailRef.current, passwordRef.current);
        setLoading(false);

        //Se o login falhar, exibe uma mensagem de erro
        if (!response.success) {
            Alert.alert('Sign In', response.msg);
        }
    }
    return
}