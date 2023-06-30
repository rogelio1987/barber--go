import React, { useState, useContext, useEffect } from 'react'
import {
	StyleSheet,
	View,
	SafeAreaView,
	Dimensions,
	FlatList,
	TouchableHighlight,
	Modal,
	Alert,
} from 'react-native'
import { Button, CheckBox, ListItem, Avatar, Text } from 'react-native-elements'
import { Context } from '../../context/Context'
import axios from 'axios'
import { _getLocationAsync } from '../../Utils/getLocation'
import * as SecureStore from 'expo-secure-store'
import { useNavigation, useRoute } from '@react-navigation/native'
import { filterByDate, allByLocation } from '../../Utils/fetchArrival'
import { useMst } from '../../state/RootStore'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function SeleccionarBarbero() {
	const context = useContext(Context)
	const [modalVisible, setModalVisible] = useState(false)
	const [barbersData, setBarbersData] = useState([])
	const [barberAvailability, setBarberAvailability] = useState(false)
	const navigation = useNavigation()
	const route = useRoute()

	const dateToSend = route.params.datetime

	const [checked, setChecked] = useState({})
	const [checkedBarber, setCheckedBarber] = useState()

	const { barber, location } = useMst()

	const _renderItem = ({ item }) => (
		<View>
			<ListItem
				bottomDivider
				key={item.userProfile.userId}
				onPress={() => {
					navigation.navigate('Inicio', {
						screen: 'Perfil',
						params: {
							profilePic: item.userProfile.profilePic,
							username: item.userProfile.name,
							barberId: item.userProfile.userId,
						},
					})
				}}
			>
				<Avatar source={{ uri: item.userProfile.profilePic }} />
				<ListItem.Content>
					<ListItem.Title>
						{item.userProfile.name} {item.userProfile.lastName}
					</ListItem.Title>
					<ListItem.Subtitle>
						{item.barber.tipoDeServicio.map((e) => {
							return e + ' '
						})}
					</ListItem.Subtitle>
				</ListItem.Content>
				<CheckBox
					center
					title='Seleccionar'
					checkedIcon='dot-circle-o'
					uncheckedIcon='circle-o'
					checked={checkedBarber == item.userProfile.userId ? true : false}
					onIconPress={() => {
						// console.log("alskdjf")
						setCheckedBarber(item.userProfile.userId)
						fetchBarberAvailability(item.userProfile.userId, dateToSend)
					}}
					onPress={() => {
						setCheckedBarber(item.userProfile.userId)
						fetchBarberAvailability(item.userProfile.userId, dateToSend)
					}}
				/>
				<ListItem.Chevron />
			</ListItem>
		</View>
	)
	const fetchBarbersData = async () => {
		try {
			let x = await allByLocation(location.longitude, location.latitude)
			setBarbersData(x)
		} catch (error) {
			console.log(error)
		}
	}

	const fetchBarberAvailability = async (barberId, date) => {
		// console.log('fetching')
		try {
			setBarberAvailability(await filterByDate(barberId, date))
			setModalVisible(true)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		console.log(dateToSend)
		fetchBarbersData()
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<Modal
				animationType='slide'
				transparent={true}
				visible={modalVisible}
				// onRequestClose={() => {
				// 	Alert.alert('Modal has been closed.')
				// }}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<Text style={styles.modalText}>
							{barberAvailability
								? 'Barbero disponible!'
								: 'No disponible, selecciona otra hora o ubicación'}
						</Text>
						<TouchableHighlight
							style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
							onPress={() => {
								setModalVisible(!modalVisible)
							}}
						>
							<Text style={styles.textStyle}>Confirmar</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
			{barbersData.length > 0 ? (
				<View>
					<FlatList
						data={barbersData}
						renderItem={_renderItem}
						keyExtractor={(item) => item.userProfile.userId}
					/>
					<Button
						title='Confirmar'
						type='solid'
						disabled={barberAvailability ? false : true}
						buttonStyle={{
							borderRadius: 10,
							marginHorizontal: 10,
							backgroundColor: '#0100A4',
							padding: 15,
						}}
						onPress={() => {
							if (barberAvailability) barber.setBarber(checkedBarber) //barberAvailability
							navigation.goBack()
						}}
					/>
				</View>
			) : (
				<Text>No hay barberos disponibles en tu zona</Text>
			)}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		margin: 20,
	},
	tipoServicio: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
		margin: 20,
	},
	text1: {
		color: '#6c757d',
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	//modal
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
})
