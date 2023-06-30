import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Store from './Store'

const StoreStack = createStackNavigator()

export default function StoreStackScreen() {
	return (
		<StoreStack.Navigator headerStatusBarHeight>
			<StoreStack.Screen
				name='Store'
				options={{
					headerShown: true,
					headerTitle: 'BarberGo Shop',
					headerTitleAlign:'center',
					headerTintColor:'#FF0101'
				}}
			>
				{() => <Store />}
			</StoreStack.Screen>
		</StoreStack.Navigator>
	)
}
