import React from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Constants from 'expo-constants'
import HomeStackScreen from './Home/HomeStackScreen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AccountStackScreen from './Account/AccountStackScreen'
import PedidoStack from './Service/PedidoStack'
import StoreStack from '../screens/Store/StoreStack'

const Tab = createBottomTabNavigator()

export default function MainTabNavigator() {
	return (
		<Tab.Navigator
			style={styles.container}
			tabBarOptions={{ showLabel: false, activeTintColor: '#01004E' }}
		>
			<Tab.Screen
				name='Inicio'
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='home' color={color} size={size} />
					),
				}}
				component={HomeStackScreen}
			/>
			<Tab.Screen
				name='Pedido'
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='car-estate'
							color={color}
							size={size}
						/>
					),
				}}
				component={PedidoStack}
			/>
			<Tab.Screen
				name='Tienda'
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name='shopping' color={color} size={size} />
					),
				}}
				component={StoreStack}
			/>
			<Tab.Screen
				name='profile'
				options={{
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='account-circle'
							color={color}
							size={size}
						/>
					),
				}}
				component={AccountStackScreen}
			/>
		</Tab.Navigator>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: Constants.statusBarHeight,
		alignContent: 'center',
		alignItems: 'center',
	},
})
