import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ScreenPedido from './ScreenPedido'
import AgendarServicio from './AgendarServicio'
import SeleccionarServicio from './SeleccionarServicio'
import ConfirmarPedido from './ConfirmarPedido'
import SeleccionarBarbero from './SeleccionarBarbero'

const HomeStack = createStackNavigator()

export default function PedidoStack() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen
				name='Mapa'
				options={{
					headerTitle: 'BarberGo',
					headerTitleAlign: 'center',
					headerTintColor: '#FF0101',
				}}
			>
				{() => <ScreenPedido />}
			</HomeStack.Screen>
			<HomeStack.Screen
				name='AgendarServicio'
				options={{
					headerTitle: 'Agendar Servicio',
					headerTitleAlign: 'center',
				}}
			>
				{() => <AgendarServicio />}
			</HomeStack.Screen>

			<HomeStack.Screen
				name='SeleccionarServicio'
				options={{ headerTitle: 'Seleccionar', headerTitleAlign: 'center' }}
			>
				{() => <SeleccionarServicio />}
			</HomeStack.Screen>

			<HomeStack.Screen
				name='SeleccionarBarbero'
				options={{
					headerTitle: 'Seleccionar barbero',
					headerTitleAlign: 'center',
				}}
			>
				{() => <SeleccionarBarbero />}
			</HomeStack.Screen>

			<HomeStack.Screen
				name='ConfirmarPedido'
				options={{ headerTitle: 'Confirmar', headerTitleAlign: 'center' }}
			>
				{() => <ConfirmarPedido />}
			</HomeStack.Screen>
		</HomeStack.Navigator>
	)
}
