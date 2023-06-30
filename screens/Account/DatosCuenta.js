import React, { useContext } from 'react'
import { Context } from '../../context/Context'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import { Divider, Button, Icon } from 'react-native-elements'
import { useRoute } from '@react-navigation/native'
import * as SecureStore from 'expo-secure-store'
import { useMst } from '../../state/RootStore'

export default function DatosCuenta() {
	const route = useRoute()
	const context = useContext(Context)

	const { auth } = useMst()
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerDatos}>
				<View style={styles.rowContainer}>
					<Icon
						type='ionicon'
						name='md-person'
						color='#495057'
						size={30}
						margin={10}
					/>
					<Text style={styles.text}>
						{route.params.name} {route.params.lastName}
					</Text>
				</View>
				<Divider style={{ backgroundColor: '#8d99ae' }} />
				<View style={styles.rowContainer}>
					<Icon
						type='ionicon'
						name='md-contact'
						color='#495057'
						size={30}
						margin={10}
					/>
					<Text style={styles.text}>{route.params.username}</Text>
				</View>
				<Divider style={{ backgroundColor: '#8d99ae' }} />
				<View style={styles.rowContainer}>
					<Icon
						type='ionicon'
						name='md-mail'
						color='#495057'
						size={30}
						margin={10}
					/>
					<Text style={styles.text}>{route.params.email}</Text>
				</View>
				<Divider style={{ backgroundColor: '#8d99ae' }} />
			</View>
			<Button
				title='Cerrar Sesión'
				buttonStyle={{
					marginHorizontal: 90,
					marginTop: 30,
					borderRadius: 30,
				}}
				onPress={() => {
					SecureStore.deleteItemAsync('auth_token')
					auth.logout()
				}}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	containerDatos: {
		backgroundColor: '#ffffff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		margin: 10,
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})
