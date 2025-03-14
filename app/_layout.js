//Importa componentes essenciais do React Nativepara estruturaçãoda interface do usuário
import { View, Text } from 'react-native'

//Importa React e o hook useEffect para gerenciar efeitos colaterais no ciclo de vida do componente
import React, { useEffect } from 'react'

//Importa Slot para renderizar o conteúdo da rota atual, useRouter para navegação e useSegments para monitorar segmentos de rota
import { Slot, useRouter, useSegments } from 'expo-router'

//Importa o arquivo de s=estilo global (CSS) para estilizar o aplicativo
import "../global.css"

//Importa o contexto de autenticação e o provider para gerenciar o estado de autenticação no aplicativo
import { AuthContextProvider, useAuth } from '../context/authContext'

//Importa MenuProvider para fornecer suporte a menus pop-up em todo o aplicativo
import { MenuProvider } from 'react-native-popup-menu'

//Componente principal qu gerencia a navegação e a autenticação do usuário 
const MainLayout = () => {
    //Obtém o estado de autenticação do usuário a partir do contexto de autenticação
    const { isAuthenticated } = useAuth()

    //Obtém os segmentos de rota atuais
    const segments = useSegments()

    //Hook para navegação entre rotas
    const router = useRouter()

    //useEffect que é executado sempre que o estado de autenticação muda
    useEffect(() => {
        //Verifica se o estado de autenticação está indefinido
        if (typeof isAuthenticated == 'undefined') return

        //Verifica se o usuário está em um rota dentro da aplicação
        const inApp = segments[0] == '(app)'

        //Se o usuário está autenticado e não está em uma rota dentro da aplicação, redireciona para a rota 'home'
        if (isAuthenticated && !inApp) {
            router.replace('home')
        }
        //Se o usuário não está autenticado, redireciona para a rota de login (signin)
        else if (isAuthenticated == false) {
            router.replace('signin')
        }
    }, [isAuthenticated]) //Hook é executado noamente se 'isAuthenticated' mudar

    //Retorna o Slot, que renderiza a rota ativa com base no roteamento do Expo Router
    return <Slot />
}

//Componente raiz que envolve o aplicativo com provedores de contexto
export default function RootLayout() {
    return
    //MenuProvider oferece suiporte a menus pop-up em todo o aplicativo
    <MenuProvider>
        {/*AuthContextProvider oferece o contexto de autenticação para todo o aplicativo */}
        <AuthContextProvider>
            {/*MainLayout gerencia a navegação baseada na autenticação*/}
            <MainLayout />
        </AuthContextProvider>
    </MenuProvider>
}