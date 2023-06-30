import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from './Profile'
import EditProfile from './EditProfile'
import DatosCuenta from './DatosCuenta'
import Citas from './Citas'
import PostsScreen from './PostsScreen'
import Membership from './Membership'
import DetallesOrden from './DetallesOrden'
const AccountStack = createStackNavigator()

export default function AccountStackScreen() {
	return (
		<AccountStack.Navigator>
			<AccountStack.Screen
				name='Perfil'
				options={{
					headerShown: true,
					headerTitleAlign: 'center',
					headerTintColor: '#FF0101',
				}}
			>
				{() => <Profile />}
			</AccountStack.Screen>
			<AccountStack.Screen
				name='EditarPerfil'
				options={{ headerTitle: 'Editar Perfil', headerTitleAlign: 'center' }}
			>
				{() => <EditProfile />}
			</AccountStack.Screen>
			<AccountStack.Screen
				name='DatosCuenta'
				options={{ headerTitle: 'Mi cuenta', headerTitleAlign: 'center' }}
			>
				{() => <DatosCuenta />}
			</AccountStack.Screen>
			<AccountStack.Screen
				name='CitasProgramadas'
				options={{ headerTitle: 'Historial', headerTitleAlign: 'center' }}
			>
				{() => <Citas />}
			</AccountStack.Screen>
			<AccountStack.Screen
				name='DetallesOrden'
				options={{
					headerTitle: 'Detalles de orden',
					headerTitleAlign: 'center',
				}}
			>
				{() => <DetallesOrden />}
			</AccountStack.Screen>
			<AccountStack.Screen
				name='PostsScreen'
				options={{ headerTitle: '', headerTitleAlign: 'center' }}
			>
				{() => <PostsScreen />}
			</AccountStack.Screen>
			<AccountStack.Screen
				name='Membership'
				options={{ headerTitle: 'Membresía', headerTitleAlign: 'center' }}
			>
				{() => <Membership />}
			</AccountStack.Screen>
		</AccountStack.Navigator>
	)
}
