import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export const createService = async (
	employeeId,
	paymentMethod,
	location,
	products
) => {
	let get_token = await SecureStore.getItemAsync('auth_token')
	try {
		let response = await axios.post(
			Constants.manifest.extra.BASEURL + '/service/',
			{
				employeeId,
				paymentMethod,
				location,
				products,
			},
			{
				headers: {
					Authorization: 'Bearer ' + get_token,
				},
			}
		)
		let data = response.data.data
		return data
	} catch (error) {
		return error
	}
}

export const scheduleService = async (
	employeeId,
	paymentMethod,
	location,
	dateOfService,
	products
) => {
	let get_token = await SecureStore.getItemAsync('auth_token')
	try {
		let response = await axios.post(
			Constants.manifest.extra.BASEURL + '/service/',
			{
				employeeId,
				paymentMethod,
				location,
				dateOfService,
				products,
			},
			{
				headers: {
					Authorization: 'Bearer ' + get_token,
				},
			}
		)
		let data = response.data.success
		return data
	} catch (error) {
		return error
	}
}
