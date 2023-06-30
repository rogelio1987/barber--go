import React, { useState, useContext, useEffect } from 'react'
import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	Modal,
	Dimensions,
	Alert,
	ScrollView,
} from 'react-native'
import { Button, CheckBox, Text, Icon } from 'react-native-elements'
import { Context } from '../../context/Context'
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'
import { useNavigation } from '@react-navigation/native'
import MapView from '../../components/MapViewComponent'
import { _getLocationAsync } from '../../Utils/getLocation'
import { scheduleService } from '../../Utils/createService'
import BarberoSeleccionado from '../../components/BarberoSeleccionado'
import ModalConfAgServicio from '../../components/ModalConfAgServicio'
import moment from 'moment'
import 'moment/locale/es-mx'
import { useMst } from '../../state/RootStore'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function AgendarServicio() {
	const navigation = useNavigation()
	const [date, setDate] = useState(new Date())
	const [time, setTime] = useState(new Date())
	const [show, setShow] = useState(false)
	const [showTime, setShowTime] = useState(false)
	const { barber, location } = useMst()

	const onChange = async (event, selectedDate) => {
		const useDate = selectedDate ? selectedDate : undefined
		setShow(Platform.OS === 'ios')
		console.log(useDate)
		setDate(useDate)
		barber.setBarber('')
	}
	const onChangeTime = (event, selectedDate) => {
		const useTime = selectedDate ? selectedDate : undefined
		setShowTime(Platform.OS === 'ios')
		console.log(useTime)
		setTime(useTime)
		barber.setBarber('')
	}
	const [checkedRegular, setcheckedRegular] = useState(false)
	const [checkedPersonalizado, setcheckedPersonalizado] = useState(false)
	const [checkedTarjeta, setCheckedTarjeta] = useState(false)
	const [checkedEfectivo, setCheckedEfectivo] = useState(true)

	const [modalVisible, setModalVisible] = useState(false)

	const [confAServ, setConfAServ] = useState(false)
	const [modalText, setModalText] = useState('')
	const [datetimeChange, setDatetimeChange] = useState(false)

	useEffect(() => {
		moment.locale('es')
	})
	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={{ flex: 2 }}>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.text}>Ubicación</Text>
						<Modal
							animationType='slide'
							transparent={false}
							visible={modalVisible}
						>
							<MapView style={styles.map} />
							<Button
								type='outline'
								title='Usar ubicación actual'
								buttonStyle={{
									// width: 50,
									// height: 50,
									borderRadius: 10,
									marginHorizontal: 10,
									padding: 15,
								}}
								icon={
									<Icon
										type='material'
										name='my-location'
										color='#00BBF9'
										size={20}
									/>
								}
								onPress={() => {
									_getLocationAsync()
								}}
							/>
							<Button
								title='Confirmar ubicación'
								type='solid'
								buttonStyle={{
									borderRadius: 10,
									marginHorizontal: 10,
									backgroundColor: '#00BBF9',
									padding: 15,
									marginTop: 15,
								}}
								onPress={() => setModalVisible(false)}
							/>
						</Modal>
					</View>
					<MapView style={styles.minimap} />
					<Button
						type='outline'
						title='Usar ubicación actual'
						buttonStyle={{
							// width: 50,
							// height: 50,
							borderRadius: 10,
							marginHorizontal: 10,
							padding: 15,
						}}
						icon={
							<Icon
								type='material'
								name='my-location'
								color='#00BBF9'
								size={20}
							/>
						}
						onPress={() => {
							_getLocationAsync()
						}}
					/>
					<Button
						title='Abrir mapa'
						type='outline'
						buttonStyle={{
							borderRadius: 10,
							marginHorizontal: 10,
							padding: 15,
							marginTop: 20,
						}}
						onPress={() => setModalVisible(true)}
					/>

					<Text style={styles.text}>Fecha</Text>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-around' }}
					>
						{show ? (
							<DateTimePicker
								testID='dateTimePicker'
								value={date ? date : new Date()}
								mode='date'
								onChange={onChange}
								minimumDate={new Date()}
								is24Hour={false}
								display='default'
								style={{ width: 320, backgroundColor: 'white' }}
							/>
						) : null}
						<Text style={styles.text1} onPress={() => setShow(true)}>
							{date
								? moment(date).format('dddd, D [de] MMMM YYYY')
								: 'Seleccionar fecha'}
						</Text>
					</View>
					<Text style={styles.text}>Hora</Text>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-around' }}
					>
						{showTime ? (
							<DateTimePicker
								value={time ? time : new Date()}
								mode='time'
								onChange={onChangeTime}
								display='default'
								style={{ width: 320, backgroundColor: 'white' }}
							/>
						) : null}
						<Text style={styles.text1} onPress={() => setShowTime(true)}>
							{time ? moment(time).format('h:mm a') : 'Seleccionar hora'}
						</Text>
					</View>
					<Text style={styles.tipoServicio}>Tipo de servicio</Text>
					<View>
						<CheckBox
							title='Regular'
							checked={checkedRegular}
							onPress={() => {
								setcheckedRegular(!checkedRegular)
								setcheckedPersonalizado(false)
							}}
						/>
						<CheckBox
							title='Personalizado'
							checked={checkedPersonalizado}
							onPress={() => {
								setcheckedPersonalizado(!checkedPersonalizado)
								setcheckedRegular(false)
							}}
						/>
					</View>
					<View>
						<Text style={styles.tipoServicio}>Forma de pago</Text>
						<CheckBox
							title='Efectivo'
							checked={checkedEfectivo}
							onPress={() => {
								setCheckedEfectivo(!checkedEfectivo)
								setCheckedTarjeta(false)
							}}
						/>
						<CheckBox
							title='Tarjeta de Débito/Crédito'
							checked={checkedTarjeta}
							onPress={() => {
								setCheckedTarjeta(!checkedTarjeta)
								setCheckedEfectivo(false)
							}}
						/>
					</View>
					{barber.barberId ? (
						<BarberoSeleccionado barberId={barber.barberId} />
					) : null}
					<Button
						title={barber.barberId ? 'Cambiar barbero' : 'Seleccionar barbero'}
						type='solid'
						titleStyle={{ color: '#0100A4' }}
						buttonStyle={{
							borderRadius: 10,
							marginHorizontal: 10,
							backgroundColor: '#FDFDFF',

							padding: 15,
						}}
						onPress={() => {
							let m = moment(date)
							let t = moment(time)
							let f = m.set({
								day: m.get('day'),
								year: m.get('year'),
								month: m.get('month'),
								hour: t.get('hour'),
								minute: t.get('minute'),
								second: 0,
								millisecond: 0,
							})
							navigation.navigate('SeleccionarBarbero', {
								datetime: f.toJSON(),
							})
						}}
					/>
				</View>
				<Button
					title='Guardar Cita'
					titleStyle={{ color: '#FDFDFF' }}
					type='solid'
					disabled={
						(!checkedPersonalizado && !checkedRegular) ||
						(!checkedEfectivo && !checkedTarjeta) ||
						barber.barberId == ''
							? true
							: false
					}
					buttonStyle={{
						borderRadius: 10,
						marginHorizontal: 10,
						backgroundColor: '#0100A4',
						padding: 15,
					}}
					onPress={async () => {
						let paymentMethod = ''
						if (checkedEfectivo) {
							paymentMethod = 'efectivo'
						} else {
							paymentMethod = 'tarjeta'
						}
						let m = moment(date)
						let t = moment(time)
						let f = m.set({
							day: m.get('day'),
							year: m.get('year'),
							month: m.get('month'),
							hour: t.get('hour'),
							minute: t.get('minute'),
							second: 0,
							millisecond: 0,
						})
						// console.log(f.format('dddd, MMMM Do YYYY, h:mm:ss a'))
						let resp = await scheduleService(
							barber.barberId,
							paymentMethod,
							{
								longitude: location.longitude,
								latitude: location.latitude,
							},
							f,
							products.products
						)
						if (resp) {
							setConfAServ(true)
							setModalText('Guardado exitosamente')
						} else {
							setConfAServ(true)
							setModalText('Ocurrió un error al intentar guardar')
						}
					}}
				/>
				<ModalConfAgServicio
					modalVisible={confAServ}
					setModalVisible={setConfAServ}
					modalText={modalText}
				/>
			</ScrollView>
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
	map: {
		width,
		height: (height / 2) * 1.5,
	},
	minimap: {
		width,
		height: 200,
	},
})
