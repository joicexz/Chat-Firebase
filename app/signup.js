//Importa componentes do React Native para estruturar a interface e interatividade
import { View, Text, Image, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'

//Importa React, hooks de estado e referência para gerenciar os inputs e estado de carregamento
import React, { useState } from 'react'

//Importa funções para criar layouts responsivos com base no tamanho da tela
import { widhtPercentageToDP as wp, heightPercentage as hp } from 'react-native-responsive-screen';

//Importa o componente StatusBar para controlar a barra de status
import { StatusBar } from 'expo-status-bar';

//Importa ícones do pacote expo, como o ícone de email e cadeado para o input de senha
import { Feather, Octicons } from '@expo/vector-icons';

//Importa o hook de navegação do expo-router para navegação entre telas
import { useRouter } from 'expo-router';

//Importa componentes personalizados, como o carregamento (loading) e o gerenciamento de teclado customizado
import Loading from '../components/Loading';
import CustomKeyboardView from '../components/CustomKeyboardView';

//Importa o contexto de autenticação para gerenciar o login
import { useAuth } from '../context/authContext';

export default function Signup() {
    const router = useRouter(); //Hook do expo-router para navegação
    const { register } = useAuth(); //Hook de autenticação do contexto global
    const [loading, setLoading] = useState(false); //Estado para exibir carregamento durante a requisição

    //Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        profile: ''
    });
    //Função para atualizar o estado do formulário dinamicamente
    //Usa computação de nome de propriedade para atualizar apenas o campo específico
    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    //Validação completa do formulário antes de enviar os dados
    const validateForm = () => {
        //Verifica se todos os campos estão preenchidos
        if (!formData.email || !formData.password || !formData.username || !formData.profile) {
            Alert.alert('Sign Up', "Por favor, preencha todos os campos");
            return false;
        }

        //Validação de formato de email usadno regular
        const emailRegex = /^[\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            Alert.alert('Sign Up', "Por favor insira um email válido");
            return false;
        }

        //Verifica requisito mínimo de segurança para a senha
        if (formData.password.length < 6) {
            Alert.alert('Sign Up', "A senha deve ter pelo menos 6 caracteres");
            return false;
        }
        return true; //Retorna true apenas se todas as validações passarem
    };

    //Função assincrona para lidar com o processo de registro
    const handleRegister = async () => {
        //Sai da função se a validação falhar
        if (!validateForm()) return;

        try {
            //Ativa indicador de carregamento
            setLoading(true);

            //Chama a função de registro do contexto de autenticação (Firebase)
            const response = await register(
                formData.email,
                formData.password,
                formData.username,
                formData.profile
            );

            //Verifica se o registro não foi bem-sucedido e exibe a mensagem de erro
            if (!response.sucess) {
                Alert.alert('Sign Up', response.msg);
            }
        } catch (error) {
            //Capturar e tratar erros inesperados
            Alert.alert('Error', 'Ocorreu um erro ao tentar reggistrar. Tente novamente.');
            console.log('Registration error:', error);
        } finally {
            //Garante que o indicador de carregamento será desativado mesmo se houver erro
            setLoading(false);
        }
    };

    //Função auxiliar para renderizar campos de entrada com configuração consistente
    //Reduz duplicação de código e mantém a interface uniforme
    const renderInput = (icon, placeholder, field, isSecure = false) => (
        <View style={{ height: hp(7) }} className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl">
            {icon} {/*icone personalizado para cada campo */}
            <TextInput
                value={formData[field]} //Valor do campo a partir do estado
                onChangeText={(value) => handleChange(field, value)} //Atualiza o campo específico
                style={{ fontSize: hp(2) }} //Tamanho de fonte responsivo
                className="flex-1 font-semibold text-neutral-700" //Estilização com NativeWind
                placeholder={placeholder} // Texto de placeholder
                secureTextEntry={isSecure} //Determina se o campo é pra senha
                placeholderTextColor={'gray'} //Cor do texto de placeholder
                autoCapitalize="nome" //Evita capitalização automática
                autoCorrect={false} //Desativa correção automática
            />
        </View>
    );

    return (
        // Componente personalizado para lidar com o comportamento do teclado
        // Evita que o teclado sobreponha os campos de entrada
        <CustomKeyboardView>

            {/* Configuração da barra de status */}
            <StatusBar style="dark" />

            {/* Container principal com padding responsivo */}
            <View style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }} className="flex-1 gap-12">

                {/* Container da imagem de registro */}
                <View className="items-center">
                    <Image
                        style={{ height: hp(20) }} // Altura responsiva
                        resizeMode='contain' // Mantém a proporção da imagem
                        source={require('../assets/images/register.png')}
                    />
                </View>

                {/* Container para o título e campos do formulário */}
                <View className="gap-10">

                    {/* Título da tela */}
                    <Text style={{ fontSize: hp(4) }} className="font-bold tracking-wider text-center text-neutral-800">
                        Sign Up
                    </Text>

                    {/* Container dos campos do formulário */}
                    <View className="gap-4">

                        {/* Campo de nome de usuário */}
                        {renderInput(
                            <Feather name="user" size={hp(2.7)} color="gray" />, // Ícone de usuário
                            'Username', // Placeholder
                            'username' // Nome do campo no estado
                        )}

                        {/* Campo de email */}
                        {renderInput(
                            <Octicons name="mail" size={hp(2.7)} color="gray" />, // Ícone de email
                            'E-mail', // Placeholder
                            'email' // Nome do campo no estado
                        )}

                        {/* Campo de senha */}
                        {renderInput(
                            <Octicons name="lock" size={hp(2.7)} color="gray" />, // Ícone de cadeado
                            'Senha', // Placeholder
                            'password', // Nome do campo no estado
                            true // Indica que é um campo de senha (secureTextEntry=true)
                        )}

                        {/* Campo de imagem de perfil */}
                        {renderInput(
                            <Feather name="image" size={hp(2.7)} color="gray" />, // Ícone de imagem
                            'Imagem de perfil', // Placeholder
                            'profile' // Nome do campo no estado
                        )}

                        {/* Container para o botão de registro ou indicador de carregamento */}
                        <View>
                            {/* Renderização condicional baseada no estado de carregamento */}
                            {loading ? (
                                // Exibe indicador de carregamento quando loading é true
                                <View className="flex-row justify-center">
                                    <Loading size={hp(6.5)} />
                                </View>
                            ) : (
                                // Exibe botão de registro quando loading é false
                                <TouchableOpacity
                                    onPress={handleRegister} // Função chamada ao pressionar o botão
                                    style={{ height: hp(6.5) }} // Altura responsiva
                                    className="bg-indigo-500 rounded-xl justify-center items-center" // Estilização com NativeWind
                                >
                                    <Text style={{ fontSize: hp(2.7) }} className="text-white font-bold tracking-wider">
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        {/* Link para navegação para a tela de login */}
                        <View className="flex-row justify-center">
                            <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-500">
                                Já possui uma conta?{' '}
                            </Text>
                            {/* Componente pressionável para navegação */}
                            <Pressable onPress={() => router.push('signIn')}>
                                <Text style={{ fontSize: hp(1.8) }} className="font-bold text-indigo-500">
                                    Sign In
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        </CustomKeyboardView>
    );
}