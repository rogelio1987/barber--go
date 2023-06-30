import React, { useState, useContext, useEffect } from 'react'
import { View, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import { Button, Icon, BottomSheet, ListItem } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { Context } from '../../context/Context'
import MapView from '../../components/MapViewComponent'
import Constants from 'expo-constants'
import { _getLocationAsync } from '../../Utils/getLocation'
import LinearGradient from 'react-native-linear-gradient'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

export default function ScreenPedido() {
	//navegacion
	const navigation = useNavigation()

	const [isVisible, setIsVisible] = useState(false)
	const context = useContext(Context)

	const list = [
		{
			title: 'Ordernar Ahora',
			onPress: () => [
				navigation.navigate('SeleccionarServicio'),
				setIsVisible(false),
			],
			titleStyle: { fontSize: 18 },
		},
		{
			title: 'Programar Orden',
			onPress: () => [
				navigation.navigate('AgendarServicio'),
				setIsVisible(false),
			],
			titleStyle: { fontSize: 18 },
		},
		{
			title: 'Cancelar',
			containerStyle: { backgroundColor: '#C00000' },
			titleStyle: { color: 'white', fontSize: 16 },
			onPress: () => setIsVisible(false),
		},
	]

	const mostrar = () => {
		setIsVisible(!isVisible)
	}
	useEffect(() => {
		_getLocationAsync(context)
	}, [])
	return (
		<SafeAreaView style={styles.containerMap}>
			<MapView style={styles.map} />
			<View
				style={{
					position: 'absolute',
					bottom: 10,
				}}
			>
				{/* e63946 rojo
				00BBF9 azul */}
				<Button
					type='outline'
					buttonStyle={{
						width: 50,
						height: 50,
						borderRadius: 10,
						marginHorizontal: 10,
						padding: 15,
					}}
					icon={
						<Icon
							type='material'
							name='my-location'
							color='#7D7DFF'
							size={20}
						/>
					}
					onPress={() => {
						_getLocationAsync(context)
					}}
				/>
				<Button
					title='BarberGo'
					titleStyle={{ fontWeight: 'bold', color: '#FDFDFF' }}
					type='outline'
					buttonStyle={{
						borderRadius: 40,
						marginVertical: 20,
						width: 300,
						backgroundColor: '#0000FE',
						borderColor: 'black',
					}}
					onPress={mostrar}
					icon={
						<Icon
							type='material-community'
							name='car-estate'
							color='#FDFDFF'
							size={40}
							style={{ paddingLeft: 10 }}
						/>
					}
					iconRight
				/>

				<BottomSheet
					isVisible={isVisible}
					containerStyle={{ backgroundColor: 'white' }}
				>
					{list.map((l, i) => (
						<ListItem
							key={i}
							containerStyle={l.containerStyle}
							onPress={l.onPress}
						>
							<ListItem.Content>
								<ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
							</ListItem.Content>
						</ListItem>
					))}
				</BottomSheet>
			</View>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	containerMap: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	map: {
		width,
		height: height - Constants.statusBarHeight,
	},
})
