import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
	StyleSheet,
	View,
	Image,
	Alert,
	SafeAreaView,
} from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import Constants from 'expo-constants'

export default function CreateAnAccount() {
	//navegacion
	const navigation = useNavigation()
	//state del formulario
	const [nombre, setNombre] = useState('')
	const [correo, setCorreo] = useState('')
	const [contraseña, setContraseña] = useState('')
	const [contraseña2, setContraseña2] = useState('')
	const [showPassword, hiddenPassword] = useState(false)

	//aler
	const AlertGuardar = (userId) =>
		Alert.alert(
			'Guardado',
			'Usuario creado con exito',
			[
				{
					text: 'OK',
					onPress: () =>
						navigation.navigate('CreateProfile', { userId: userId }),
				},
			],
			{ cancelable: true }
		)

	const AlertError = () =>
		Alert.alert(
			'Error',
			'Todos los campos son obligarios',
			[{ text: 'OK', onPress: () => console.log('error') }],
			{ cancelable: true }
		)

	const AlertErrorPassword = () =>
		Alert.alert(
			'Error',
			'las contraseñas deben ser iguales',
			[{ text: 'OK', onPress: () => console.log('error') }],
			{ cancelable: true }
		)

	const handleSubmit = async () => {
		// //validamos
		// if (
		// 	nombre === '' ||
		// 	correo === '' ||
		// 	contraseña === '' ||
		// 	contraseña2 === ''
		// ) {
		// 	AlertError()
		// 	return
		// }
		// if (contraseña !== contraseña2) {
		// 	AlertErrorPassword()
		// 	return
		// }
		// const datos = { correo, nombre, contraseña }
		// console.log(datos)

		try {
			let response = await axios.post(
				Constants.manifest.extra.BASEURL + '/users/register',
				{
					email: correo,
					username: nombre,
					password: contraseña,
				}
			)
			let user = response.data.data
			console.log(user)
			if (response.data.success) {
				console.log('cuenta guardada')
				AlertGuardar(user._id)
			}
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<SafeAreaView style={styles.mainContainer}>
			<KeyboardAwareScrollView>
				<View style={styles.contenedorimg}>
					<Image
						style={{ width: 200, height: 220 }}
						source={require('../../assets/logo2.png')}
						resizeMode='contain'
					/>
				</View>
				<View>
					<Input
						placeholder='Nombre de usuario'
						onChangeText={(text) => setNombre(text)}
						rightIcon={
							<Icon
								type='material-community'
								name='account-circle'
								iconStyle={{ color: '#c1c1c1' }}
							/>
						}
					/>
					<Input
						placeholder='Correo'
						onChangeText={(text) => setCorreo(text)}
						rightIcon={
							<Icon
								type='material-community'
								name='at'
								iconStyle={{ color: '#c1c1c1' }}
							/>
						}
					/>
					<Input
						placeholder='Contraseña'
						password={true}
						secureTextEntry={showPassword ? false : true}
						onChangeText={(text) => setContraseña(text)}
						rightIcon={
							<Icon
								type='material-community'
								name={showPassword ? 'eye-outline' : 'eye-off-outline'}
								iconStyle={{ color: '#c1c1c1' }}
								onPress={() => hiddenPassword(!showPassword)}
							/>
						}
					/>
					<Input
						placeholder='Confirmar Contraseña'
						password={true}
						secureTextEntry={showPassword ? false : true}
						onChangeText={(text) => setContraseña2(text)}
						rightIcon={
							<Icon
								type='material-community'
								name={showPassword ? 'eye-outline' : 'eye-off-outline'}
								iconStyle={{ color: '#c1c1c1' }}
								onPress={() => hiddenPassword(!showPassword)}
							/>
						}
					/>
				</View>
				<Button
					title='Registrarse'
					buttonStyle={styles.btn}
					onPress={() => {
						handleSubmit()
					}}
				/>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	contenedorimg: {
		justifyContent: 'center',
		alignContent: 'center',
		flexDirection: 'row',
	},
	btn: {
		margin: 10,
		borderRadius: 30,
	},
})
