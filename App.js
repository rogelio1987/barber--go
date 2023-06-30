import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LoginStackScreen from './screens/Login/LoginStackScreen'
import MainTabNavigator from './screens/MainTabNavigator'
import { cacheImages } from './Utils/cacheImages'
import { Provider, rootstore, useMst } from './state/RootStore'
import { observer } from 'mobx-react-lite'
// import AppLoading from 'expo-app-loading'

const Wrapper = observer(() => {
	const { auth } = useMst()

	useEffect(() => {
		auth.verifyToken()
	})

	return auth.token ? (
		<NavigationContainer>
			<MainTabNavigator />
		</NavigationContainer>
	) : (
		<NavigationContainer>
			<LoginStackScreen />
		</NavigationContainer>
	)
})

export default function App() {
	const [isReady, setIsReady] = useState(false)

	const [token, setAuthToken] = useState(false)
	const changeAuthToken = (value) => setAuthToken(value)
	const [products, setProducts] = useState([])
	const [barber, setBarber] = useState()
	const [location, setLocation] = useState({
		latitude: 0,
		longitude: 0,
		latitudeDelta: 0.001,
		longitudeDelta: 0.001,
	})

	const changeProducts = (value, operation) => {
		if (products.includes(value)) {
			if (operation === 0) {
				value.qty -= 1
				if (value.qty == 0) {
					deleteProducts(value)
				}
			} else value.qty += 1
			// console.log(products)
		} else {
			value.qty = 1
			let x = products.concat(value)
			setProducts(x)
		}
	}
	const deleteProducts = (value) => {
		if (products.includes(value)) {
			let x = products.filter((item) => item !== value)
			setProducts(x)
		}
	}

	// async function getToken() {
	// 	let get_token = await SecureStore.getItemAsync('auth_token')
	// 	if (get_token !== null) {
	// 		try {
	// 			let response = await Axios.post(
	// 				BASEURL +/users/verify_token',
	// 				{},
	// 				{
	// 					headers: {
	// 						Authorization: 'Bearer ' + get_token,
	// 					},
	// 				}
	// 			)
	// 			if (response.status !== 401) {
	// 				changeAuthToken(true)
	// 			}
	// 		} catch (error) {
	// 			console.log(error)
	// 		}
	// 	}
	// }

	let _loadAssetsAsync = async () => {
		const imageAssets = cacheImages([
			// 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
			require('./assets/ImgCarrousel/1.jpg'),
			require('./assets/ImgCarrousel/2.jpg'),
			require('./assets/ImgCarrousel/3.jpg'),
			require('./assets/ImgCarrousel/4.jpg'),
			require('./assets/ImgCarrousel/5.jpg'),
		])
		// const imageAssets = cacheImages(arr)
		await Promise.all([...imageAssets])
	}

	useEffect(() => {
		// getToken()
		// SecureStore.deleteItemAsync('auth_token')
	}, [])

	let context = {
		token,
		changeAuthToken,
		products,
		changeProducts,
		deleteProducts,
		location,
		setLocation,
		barber,
		setBarber,
	}

	// if (!isReady) {
	// 	return (
	// 		<AppLoading
	// 			startAsync={_loadAssetsAsync}
	// 			onFinish={() => setIsReady(true)}
	// 			onError={console.warn}
	// 			autoHideSplash={true}
	// 		/>
	// 	)
	// }
	return (
		<Provider value={rootstore}>
			<Wrapper />
		</Provider>
	)
}
