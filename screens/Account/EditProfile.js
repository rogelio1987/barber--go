import React, { useState } from 'react'
import { StyleSheet, View, SafeAreaView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import ComponenteAvatar from '../../components/ComponenteAvatar'
import { useRoute, useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export default function EditProfile() {
	const navigation = useNavigation()
	const route = useRoute()
	const [name, setName] = useState(route.params.name)
	const [lastName, setLastName] = useState(route.params.lastName)
	const [usuario, setUsuario] = useState('')
	const [correo, setCorreo] = useState('')

	// /users/profile
	const updateProfile = async () => {
		let get_token = await SecureStore.getItemAsync('auth_token')

		try {
			// setLoading(true)
			let response = await axios.put(
				Constants.manifest.extra.BASEURL + '/users/profile',
				{ name: name, lastName: lastName },
				{
					headers: {
						Authorization: 'Bearer ' + get_token,
					},
				}
			)
			let success = await response.data.success
			if (success) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Perfil' }],
				})
			}
		} catch (error) {
			// setLoading(false)
			// setMessage('Error de red')
			console.log(error)
		}
	}

	return (
		<SafeAreaView style={styles.mainContainer}>
			<KeyboardAwareScrollView>
				<View style={{ alignSelf: 'center', marginTop: 20 }}>
					<ComponenteAvatar accesory={true} />
				</View>
				<Input
					label='Nombre'
					placeholder={route.params.name}
					onChangeText={(t) => setName(t)}
				/>
				<Input
					label='Apellido'
					placeholder={route.params.lastName}
					onChangeText={(t) => setLastName(t)}
				/>
				{/* <Input
					label='Nombre De Usuario'
					placeholder={route.params.username}
					onChangeText={(t) => setUsuario(t)}
				/> */}
				{/* <Input
					label='Dirección de correo electronico'
					placeholder={route.params.email}
					onChangeText={(t) => setCorreo(t)}
					keyboardType='email-address'
				/> */}
				<Button
					title='Guardar Cambios'
					buttonStyle={{
						// marginHorizontal: 90,
						margin: 20,
						borderRadius: 10,
					}}
					onPress={() => updateProfile()}
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
})
