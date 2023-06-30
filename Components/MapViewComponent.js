import React, { useEffect, useState } from 'react'
import { Dimensions, Alert } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import { useNavigation } from '@react-navigation/native'
import { useMst } from '../state/RootStore'
import { observer } from 'mobx-react-lite'

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const MapViewComponent = observer(({ style }) => {
	const [mapRegion, setMapRegion] = useState({})
	const [hasLocationPermissions, setHasLocationPermissions] = useState(false)
	const navigation = useNavigation()

	const { location } = useMst()

	const _handleMapRegionChange = (mapRegion) => {
		console.log(mapRegion)
		setMapRegion({ mapRegion })
	}

	const _getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION)
		if (status !== 'granted') {
			// this.setState({
			// 	locationResult: 'Permission to access location was denied',
			// })
			Alert.alert(
				'Error',
				'Se necesitan los permisos de ubicación para continuar',
				[{ text: 'Ok', onPress: () => navigation.goBack() }],
				{ cancelable: false }
			)
			setHasLocationPermissions(false)
		} else {
			setHasLocationPermissions(true)
		}
		let location = await Location.getCurrentPositionAsync({})
		location.setLocation(location.coords.latitude, location.coords.longitude)
	}
	useEffect(() => {
		// _getLocationAsync()
	}, [])
	return (
		<MapView
			style={style}
			loadingEnabled={true}
			region={{
				latitude: location.latitude,
				longitude: location.longitude,
				latitudeDelta: 0.001,
				longitudeDelta: 0.001,
			}}
		>
			<Marker
				draggable
				coordinate={{
					latitude: location.latitude,
					longitude: location.longitude,
				}}
				onDragEnd={(e) => {
					location.setLocation(
						e.nativeEvent.coordinate.latitude,
						e.nativeEvent.coordinate.longitude
					)

					// setbarber undefined
					console.log(e.nativeEvent.coordinate)
				}}
			/>
		</MapView>
	)
})

export default MapViewComponent

// const styles = StyleSheet.create({
// 	map: {
// 		width,
// 		height: height - Constants.statusBarHeight,
// 	},
// })
