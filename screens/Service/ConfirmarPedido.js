import React, { useState, useContext, useEffect } from 'react'
import {
	Text,
	SafeAreaView,
	StyleSheet,
	ActivityIndicator,
	Dimensions,
	Alert,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios'
import { Context } from '../../context/Context'
import Arrival from '../../components/Arrival'
import * as SecureStore from 'expo-secure-store'
import { allByLocation, filterByDate } from '../../Utils/fetchArrival'
import { createService } from '../../Utils/createService'
import { useRoute, useNavigation } from '@react-navigation/native'
import { randomNumber } from '../../Utils/Misc'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import Constants from 'expo-constants'
import { useMst } from '../../state/RootStore'

export default function ConfirmaPedido() {
	const [barberLocation, setBarberLocation] = useState()
	const [userData, setUserData] = useState([])
	const [profileData, setProfileData] = useState([])
	const [barberData, setBarberData] = useState({ barber: {}, userProfile: {} })
	const navigation = useNavigation()

	const { location, products } = useMst()
	let date = new Date() //replace with Moment

	const context = useContext(Context)
	const route = useRoute()

	const getBarberLocation = async (employeeId) => {
		let get_token = await SecureStore.getItemAsync('auth_token')
		try {
			let response = await axios.get(
				Constants.manifest.extra.BASEURL +
					'/location/barber-tracker/' +
					employeeId,
				{
					headers: {
						Authorization: 'Bearer ' + get_token,
					},
				}
			)
			let data = response.data.data
			setBarberLocation(data)
			console.log(data.currentLocation.coordinates)
		} catch (error) {
			console.log(error)
		}
	}

	const concurrentRequests = () => {
		Promise.all([
			fetchData(
				Constants.manifest.extra.BASEURL +
					'/users/profile/' +
					'5f51e5856485784e6c921b9b'
			),
		]).then(function (results) {
			const profile = results[0].profile
			const user = results[0].user
			setProfileData(profile)
			setUserData(user)
		})
	}

	const assignBarber = async (longitude, latitude, date) => {
		let barbers = await allByLocation(longitude, latitude)
		let results = []
		for (let index = 0; index < barbers.length; index++) {
			let f = await filterByDate(barbers[index].barber.userId, date)
			if (f) {
				results.push({ barber: barbers[index] })
			}
		}
		if (results.length == 0) {
			Alert.alert(
				'Sin disponibilidad',
				'No hay barberos disponibles en este momento',
				[
					{
						text: 'Ok',
						onPress: () => navigation.navigate('Mapa'),
					},
				],
				{ cancelable: false }
			)
		} else {
			let r = randomNumber(0, results.length)
			createService(
				results[r].barber.barber.userId,
				route.params.paymentMethod,
				{
					longitude: parseFloat(location.longitude),
					latitude: parseFloat(location.latitude),
				},
				products.products
			)
			setBarberData(results[r].barber)
			setLocationInterval(results[r].barber.barber.userId)
		}
	}

	const setLocationInterval = (userId) => {
		setInterval(() => {
			getBarberLocation(userId)
		}, 3000)
	}

	const fetchData = async (url) => {
		let get_token = await SecureStore.getItemAsync('auth_token')
		try {
			let response = await axios.get(url, {
				headers: {
					Authorization: 'Bearer ' + get_token,
				},
			})
			let data = response.data.data
			return data
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		assignBarber(location.longitude, location.latitude, date)
		// concurrentRequests()
	}, [])

	return (
		<SafeAreaView style={style.container}>
			<MapView
				style={style.map}
				loadingEnabled={true}
				// scrollEnabled={false}
				zoomTapEnabled={false}
				region={{
					latitude: location.latitude,
					longitude: location.longitude,
					latitudeDelta: 0.01,
					longitudeDelta: 0.01,
				}}
			>
				<Marker
					coordinate={{
						latitude: location.latitude,
						longitude: location.longitude,
					}}
				/>
				{barberLocation ? (
					<Marker
						coordinate={{
							latitude: barberLocation.currentLocation.coordinates[1],
							longitude: barberLocation.currentLocation.coordinates[0],
						}}
					/>
				) : null}
			</MapView>
			{barberData.userProfile.name ? (
				<Arrival
					profilePic={barberData.userProfile.profilePic}
					username={
						barberData.userProfile.name + ' ' + barberData.userProfile.lastName
					}
				/>
			) : (
				<ActivityIndicator
					size='large'
					color='#457b9d'
					style={{ marginTop: 50 }}
				/>
			)}
		</SafeAreaView>
	)
}

const style = StyleSheet.create({
	container: {
		flex: 1,
		// alignItems: 'center',
		backgroundColor: 'white',
	},
	map: {
		width,
		height: 400,
	},
})
