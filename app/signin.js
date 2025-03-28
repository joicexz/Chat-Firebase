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
    return (
        //View customizada para ajustar o layout do teclao ao campo de entrada de texto
        <CustomKeyboardView>
            {/*StatusBar para configurar o estilo da barra de status */}
            <StatusBar style="dark" />
            <View style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }} className="flex-1 gap-12">
                {/*Exibe uma imagem de login no topo da tela */}
                <View className="items-center">
                    <Image style={{ height: hp(25) }} resizeMode='contain' source={require('../assets/images/login.png')} />
                </View>

                {/*Container dos campos de entrada e botões */}
                <View className="gap-10">
                    {/*Título da tela de login */}
                    <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">Sign In</Text>

                    {/*Campos de entrada de email e senha */}
                    <View className="gap-4">
                        {/*Campo de entrada de email */}
                        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                            <Octicons name="mail" size={hp(2.7)} color="gray" />
                            <TextInput
                                onChanceText={value => emailRef.current = value}
                                style={{ fontSize: hp(2) }}
                                className="flex-1 font-semibold text-nautral-700"
                                placeholder='E-mail'
                                placeholderTextColor={'gray'}
                            />
                        </View>

                        {/* Campo de entrada de senha */}
                        <View className="gap-3">
                            <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
                                <Octicons name="lock" size={hp(2.7)} color="gray" />
                                <TextInput
                                    onChanceText={value => passwordRef.current = value}
                                    style={{ fontSize: hp(2) }}
                                    className="flex-1 font-semibold text-nautral-700"
                                    placeholder='Senha'
                                    placeholderTextColor={'gray'}
                                />
                            </View>
                            {/*Link para a funcionalidade de "esqueci minha senha" */}
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-right text-neutral-500">Esqueceu a senha?</Text>
                        </View>

                        {/*Botão de envio do formulário de login */}
                        <View>
                            {
                                loading ? (
                                    <View className="flex-row justify-center">
                                        <Loading size={hp(6.5)} />
                                    </View>
                                ) : (
                                    <TouchableOpacity onPress={handleLogin} style={{ height: hp(6.5) }} className="bg-indigo-500 rounded-xl justify-center items-center">
                                        <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">Sign In</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </View>

                        {/* Texto para redirecionar o usuário para a tela de registro/cadastro */}
                        <View className="flex-row justify-center">
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">Não tem uma conta?</Text>
                            <Pressable onPress={() => router.push('signup')}>
                                <Text style={{ fonstSize: hp(1.8) }} className="font-bold text-indigo-500">SIgn Up</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    )
}