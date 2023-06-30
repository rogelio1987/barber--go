import React, { useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, Text } from 'react-native'
import { ListItem, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export default function CitasListComponent() {
	const [citas, setCitas] = useState([])
	const navigation = useNavigation()

	useEffect(() => {
		fetchCitasData()
	}, [])

	const renderItem = ({ item }) => (
		<ListItem
			bottomDivider
			onPress={() => {
				navigation.navigate('DetallesOrden', {
					serviceId: item.service._id,
					clientId: item.service.clientId,
					barber: item.userProfile.name + ' ' + item.userProfile.lastName,
					description: item.service.description,
					serviceStatus: item.service.serviceStatus,
					paymentStatus: item.service.paymentStatus,
					paymentMethod: item.service.paymentMethod,
					total: item.service.total.$numberDecimal,
				})
			}}
		>
			<ListItem.Content>
				<ListItem.Subtitle h3 style={styles.header}>
					Barbero
				</ListItem.Subtitle>
				<ListItem.Subtitle h4>
					{item.userProfile.name} {item.userProfile.lastName}
				</ListItem.Subtitle>
				{/* <ListItem.Subtitle h3 style={styles.header}>
					Descripción
				</ListItem.Subtitle> */}
				{/* <ListItem.Subtitle h4>{item.service.description}</ListItem.Subtitle> */}
				{/* <ListItem.Subtitle h3 style={styles.header}>
					Total
				</ListItem.Subtitle> */}
				{/* <ListItem.Subtitle h4>
					${item.service.total.$numberDecimal} MXN
				</ListItem.Subtitle> */}
				{item.service.products.length > 0 ? (
					<ListItem.Subtitle h4 style={styles.header}>
						Desglose
					</ListItem.Subtitle>
				) : null}
				{item.service.products.length > 0
					? item.service.products.map((e) => (
							<ListItem.Subtitle>
								Precio: ${e.price} MXN, Cantidad: {e.qty}
							</ListItem.Subtitle>
					  ))
					: null}
				{item.service.products.length > 0
					? item.service.products.map((e) => (
							<ListItem.Subtitle>
								Precio: ${e.price} MXN, Cantidad: {e.qty}
							</ListItem.Subtitle>
					  ))
					: null}
			</ListItem.Content>
			<ListItem.Chevron />
		</ListItem>
	)
	const fetchCitasData = async () => {
		let get_token = await SecureStore.getItemAsync('auth_token')
		try {
			let response = await axios.get(
				Constants.manifest.extra.BASEURL + '/service/all',
				{
					headers: {
						Authorization: 'Bearer ' + get_token,
					},
				}
			)
			setCitas(response.data.data)
		} catch (error) {
			console.log(error)
		}
	}

	return citas ? (
		<FlatList
			data={citas}
			renderItem={renderItem}
			keyExtractor={(item) => item._id}
		/>
	) : (
		<Text>No hay citas todavía</Text>
	)
}

const styles = StyleSheet.create({
	// btn: {
	// 	marginHorizontal: 50,
	// 	padding: 10,
	// 	marginTop: 15,
	// 	borderRadius: 15,
	// },
	subtitle: {
		fontSize: 20,
	},
	header: {
		color: '#e91e63',
	},
})
