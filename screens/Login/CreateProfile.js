import React, { useState, useContext } from 'react'
import { StyleSheet, View, SafeAreaView, Alert } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Context } from '../../context/Context'
import axios from 'axios'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import ComponenteAvatar from '../../components/ComponenteAvatar'
import Constants from 'expo-constants'

export default function CreateProfile() {
	const [name, setName] = useState('')
	const [lastName, setLastName] = useState('')
	const [profilePic, setProfilePic] = useState('')
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const context = useContext(Context)
	const route = useRoute()
	//navegacion
	const navigation = useNavigation()

	const generateAvatar = () => {
		let n = name.charAt(0)
		let l = lastName.charAt(0)
		console.log('no')
		return (
			'https://ui-avatars.com/api/?name=' +
			n +
			'+' +
			l +
			'&background=0D8ABC&color=fff'
		)
	}
	const handleSubmit = async () => {
		try {
			setLoading(true)
			let response = await axios.post(
				Constants.manifest.extra.BASEURL + '/users/profile',
				{
					userId: route.params.userId,
					name,
					lastName,
					profilePic: generateAvatar(),
				}
			)
			let message = response.data.message
			console.log(response.data)
			if (response.data.success) {
				Alert.alert(
					'Perfil Creado',
					'Esto será modificado por accesso automático ;)',
					[{ text: 'Ok', onPress: () => navigation.navigate('Login') }],
					{ cancelable: false }
				)
			} else {
				setLoading(false)
				setMessage(message)
				console.log(message)
			}
		} catch (error) {
			setLoading(false)
			setMessage('Error de red')
			console.log(error)
		}
	}
	return (
		<SafeAreaView style={styles.mainContainer}>
			<KeyboardAwareScrollView>
				<View>
					<ComponenteAvatar accesory={true} img={generateAvatar()} />
					<Input placeholder='Nombre' onChangeText={(t) => setName(t)} />
					<Input placeholder='LastName' onChangeText={(t) => setLastName(t)} />
				</View>
				<Button
					title='Terminar registro'
					onPress={() => {
						handleSubmit()
						// navigation.navigate('Login')
					}}
					buttonStyle={styles.btn}
				/>
			</KeyboardAwareScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		flexDirection: 'column',
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
