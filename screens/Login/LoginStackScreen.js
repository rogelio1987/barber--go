import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from './Login'
import Register from './Register'
import CreateProfile from './CreateProfile'

const LoginStack = createStackNavigator()

export default function LoginStackScreen() {
	return (
		<LoginStack.Navigator>
			<LoginStack.Screen
				name='Login'
				options={{ headerShown: false }}
			>
				{() => <Login />}
			</LoginStack.Screen>
			<LoginStack.Screen
				name='CrearCuenta'
				options={{ headerTitle: 'Crear Cuenta', headerTitleAlign: 'center' }}
			>
				{() => <Register />}
			</LoginStack.Screen>
			<LoginStack.Screen
				name='CreateProfile'
				options={{ headerTitle: 'Crear perfil', headerTitleAlign: 'center' }}
			>
				{() => <CreateProfile />}
			</LoginStack.Screen>
		</LoginStack.Navigator>
	)
}

