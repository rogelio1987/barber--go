import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export const allByLocation = async (longitude, latitude) => {
	let get_token = await SecureStore.getItemAsync('auth_token')
	try {
		let response = await axios.post(
			Constants.manifest.extra.BASEURL + '/service/available-barbers/all/by-location',
			{
				coordinates: [longitude, latitude],
				maxDistance: 200,
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

export const filterByDate = async (barberId, date) => {
	let get_token = await SecureStore.getItemAsync('auth_token')
	try {
		let response = await axios.post(
			Constants.manifest.extra.BASEURL + '/service/available-barbers/barber/' + barberId,
			{
				date,
				barberId,
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
