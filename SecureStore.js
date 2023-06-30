import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export async function save(key, value) {
	await SecureStore.setItemAsync(key, value)
}

export async function getValueFor(key) {
	let result = await SecureStore.getItemAsync(key)
	if (result) return result
	else {
		return null
	}
}
export async function deleteValueFor(key) {
	await SecureStore.deleteItemAsync(key)
}

export async function verifyToken() {
	// let token = await SecureStore.getItemAsync('auth_token')
	// try {
	// 	let response = await axios.post(
	// 		Constants.manifest.extra.BASEURL +/users/verify-token',
	// 		{}
	// 	)
	// 	return { token, response: response.data.success }
	// } catch (error) {
	// 	console.log(error)
	// }
	let get_token = await SecureStore.getItemAsync('auth_token')
	if (get_token !== null) {
		try {
			let response = await axios.post(
				Constants.manifest.extra.BASEURL + '/users/verify_token',
				{},
				{
					headers: {
						Authorization: 'Bearer ' + get_token,
					},
				}
			)
			if (response.status !== 401) {
				return get_token
			} else return undefined
		} catch (error) {
			console.log(error)
			return undefined
		}
	} else return undefined
}
