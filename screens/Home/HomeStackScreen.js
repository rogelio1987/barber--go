import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from './HomeScreen'
import PerfilBarber from '../Social/PerfilBarber'
import PostsScreen from '../Account/PostsScreen'

const HomeStack = createStackNavigator()

export default function HomeStackScreen() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name='BarberGo'
				options={{ headerTitleAlign: 'center' ,headerTintColor:'#FF0101'}}
			>
				{() => <HomeScreen />}
			</HomeStack.Screen>
			<HomeStack.Screen
				name='Perfil'
				options={{
					headerTitle: 'Barbero',
					headerTitleAlign: 'center',
				}}
			>
				{() => <PerfilBarber />}
			</HomeStack.Screen>
			<HomeStack.Screen
				name='PostsScreen'
				options={{ headerTitle: '', headerTitleAlign: 'center' }}
			>
				{() => <PostsScreen />}
			</HomeStack.Screen>
		</HomeStack.Navigator>
	)
}
