import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, View, Image, Alert, SafeAreaView } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Context } from '../../context/Context'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import { useMst } from '../../state/RootStore'
import Constants from 'expo-constants'

export default function Login() {
	const [correo, setCorreo] = useState('')
	const [contraseña, setContraseña] = useState('')
	const [showPassword, hiddenPassword] = useState(false)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const context = useContext(Context)

	//navegacion
	const navigation = useNavigation()

	const { auth } = useMst()

	//alertas
	const AlertError = () =>
		Alert.alert(
			'Error',
			'Todos los campos son obligatorios',
			[{ text: 'OK', onPress: () => console.log('hola') }],
			{ cancelable: true }
		)

	const validateInput = () => {
		if (correo !== '' && contraseña !== '') {
			// handleSubmit()
			auth.login(correo, contraseña)
		} else {
			AlertError()
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
						onChangeText={(text) => setCorreo(text)}
						rightIcon={
							<Icon
								type='material-community'
								name='account-circle'
								iconStyle={{ color: '#8d99ae' }}
							/>
						}
					/>
					<Input
						placeholder='Contraseña'
						password={true}
						secureTextEntry={showPassword ? false : true}
						onChangeText={(text) => setContraseña(text)}
						errorStyle={{ color: 'red' }}
						errorMessage={message !== '' ? message : null}
						rightIcon={
							<Icon
								type='material-community'
								name={showPassword ? 'eye-outline' : 'eye-off-outline'}
								iconStyle={{ color: '#8d99ae' }}
								onPress={() => hiddenPassword(!showPassword)}
							/>
						}
					/>
				</View>
				<Button
					title='Entrar'
					onPress={validateInput}
					type='outline'
					loading={loading ? true : false}
					buttonStyle={styles.btn2}
				/>
				<Button
					title='Registrarse'
					onPress={() => {
						navigation.navigate('CrearCuenta')
					}}
					buttonStyle={styles.btn}
				/>
				<Button title='¿Olvidó su contraseña?' type='clear' />
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
		flexDirection: 'row',
	},
	btn: {
		margin: 10,
		borderRadius: 30,
	},
	btn2: {
		margin: 10,
		borderRadius: 30,
		backgroundColor: '#ffffff',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.27,
		shadowRadius: 4.65,
		elevation: 6,
	},
})
