import * as Location from 'expo-location'
import { Alert, Platform } from 'react-native'
import * as Permissions from 'expo-permissions'
import * as IntentLauncher from 'expo-intent-launcher'
import { rootstore } from '../state/RootStore'

export const _getLocationAsync = async () => {
	//
	const { st } = await Permissions.getAsync(Permissions.LOCATION)
	if (st !== 'granted') {
		const { status, permissions, canAskAgain } = await Permissions.askAsync(
			Permissions.LOCATION
		)
		// console.log(permissions)
		if (status === 'granted') {
			// Location.getCurrentPositionAsync({ enableHighAccuracy: true })
			let location = await Location.getCurrentPositionAsync({})
			rootstore.location.setLocation(
				location.coords.latitude,
				location.coords.longitude
			)
		} else {
			// Platform.OS === 'ios'
			// 	? Linking.openURL('app-settings:'):
			Alert.alert(
				'Aviso',
				'Seleccione Barber Go > Permisos > Ubicación > "Permitir todo el tiempo" para continuar',
				[
					{
						text: 'Ok',
						onPress: () => {
							IntentLauncher.startActivityAsync(
								IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
							)
						},
					},
				],
				{ cancelable: false }
			)
		}
	} else {
		let location = await Location.getCurrentPositionAsync({})
		rootstore.location.setLocation(
			location.coords.latitude,
			location.coords.longitude
		)
	}
}
