import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { Button, Icon, ListItem } from 'react-native-elements'
import Axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export default function DetallesOrden() {
	const route = useRoute()

	const updateServiceStatus = async () => {
		let get_token = await SecureStore.getItemAsync('auth_token')
		try {
			let response = await Axios.put(
				Constants.manifest.extra.BASEURL + '/service/update/' + route.params.serviceId,
				{},
				{
					headers: {
						Authorization: 'Bearer ' + get_token,
					},
				}
			)
			let data = response.data.data
			let success = response.data.success
			if (success) {
				Alert.alert('Servicio cancelado')
			} else {
				Alert.alert('Error', data)
			}
		} catch (error) {
			Alert.alert('Error de red', data)
		}
	}
	return (
		<SafeAreaView style={styles.container}>
			<ListItem bottomDivider onPress={() => {}}>
				<ListItem.Content>
					<ListItem.Subtitle h3 style={styles.header}>
						Barbero
					</ListItem.Subtitle>
					<ListItem.Subtitle h4>{route.params.barber}</ListItem.Subtitle>
					<ListItem.Subtitle h3 style={styles.header}>
						Descripción
					</ListItem.Subtitle>
					<ListItem.Subtitle h4>{route.params.description}</ListItem.Subtitle>
					<ListItem.Subtitle h3 style={styles.header}>
						Status
					</ListItem.Subtitle>
					<ListItem.Subtitle h4>{route.params.serviceStatus}</ListItem.Subtitle>
					<ListItem.Subtitle h3 style={styles.header}>
						Total
					</ListItem.Subtitle>
					<ListItem.Subtitle h4>${route.params.total} MXN</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
			<Button
				title='Cancelar'
				icon={<Icon type='material-community' name='delete' color='#e63946' />}
				type='clear'
				// buttonStyle={styles.btn}
				onPress={updateServiceStatus}
			/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
