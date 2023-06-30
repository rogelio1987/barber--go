import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Text, Button, Icon, Image } from 'react-native-elements'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export default function BarberoSeleccionado(props) {
	const [barberProfile, setBarberProfile] = useState({
		barberProfile: {},
		userProfile: {},
	})

	useEffect(() => {
		getBarberProfile(props.barberId)
		console.log(props.barberId)
	}, [])

	const getBarberProfile = async (barberId) => {
		let get_token = await SecureStore.getItemAsync('auth_token')
		try {
			let response = await axios.get(
				Constants.manifest.extra.BASEURL + '/users/barber/profile/' + barberId,
				{
					headers: {
						Authorization: 'Bearer ' + get_token,
					},
				}
			)
			let data = response.data.data
			setBarberProfile(data)
		} catch (error) {
			return error
		}
	}

	return (
		<View style={styles.mainContainer}>
			<View>
				<Avatar
					rounded
					size='medium'
					source={{ uri: barberProfile.userProfile.profilePic }}
					containerStyle={{ ...styles.simplePadding }}
				/>
				<Text h3 style={{ ...styles.simplePadding }}>
					{barberProfile.userProfile.name}
				</Text>
				<Text h3 style={{ ...styles.simplePadding }}>
					{barberProfile.userProfile.lastName}
				</Text>
				<Text h4 style={{ ...styles.simplePadding }}>
					{barberProfile.barberProfile.nombreBarberia}
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		alignItems: 'center',
	},
	simplePadding: {
		padding: 10,
	},
})
