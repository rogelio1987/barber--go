import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	View,
	SafeAreaView,
	FlatList,
	ActivityIndicator,
	useWindowDimensions,
} from 'react-native'
import { Button, Text, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import ComponenteAvatar from '../../components/ComponenteAvatar'
import Constants from 'expo-constants'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'

export default function Profile() {
	//navegacion
	const navigation = useNavigation()

	const windowWidth = useWindowDimensions().width / 3

	const [profileData, setProfileData] = useState({})
	const [userData, setUserData] = useState({})
	const [postsData, setPostsData] = useState([])
	const [walletData, setWalletData] = useState({ amount: {} })

	useEffect(() => {
		// fetchProfileData()
		concurrentRequests()
	}, [])

	const concurrentRequests = () => {
		Promise.all([
			fetchProfileData(Constants.manifest.extra.BASEURL + '/users/profile'),
			fetchProfileData(Constants.manifest.extra.BASEURL + '/users/wallet'),
			fetchProfileData(Constants.manifest.extra.BASEURL + '/post/all'),
		]).then(function (results) {
			const profile = results[0].profile
			const user = results[0].user
			const wallet = results[1]
			const posts = results[2]
			setProfileData(profile)
			setUserData(user)
			setWalletData(wallet)
			setPostsData(posts)
		})
	}
	const fetchProfileData = async (url) => {
		let get_token = await SecureStore.getItemAsync('auth_token')
		try {
			// setLoading(true)
			let response = await axios.get(url, {
				headers: {
					Authorization: 'Bearer ' + get_token,
				},
			})
			let data = response.data.data
			return data
			// console.log(data)
			// return setProfileData(data)
		} catch (error) {
			// setLoading(false)
			// setMessage('Error de red')
			console.log(error)
		}
	}

	const renderItem = ({ item }) => (
		<Image
			source={{ uri: item.picture }}
			style={{ width: windowWidth, height: 150 }}
			PlaceholderContent={<ActivityIndicator />}
			onPress={() => {
				navigation.navigate('PostsScreen', {
					img: item.picture,
					description: item.description,
					userId: item.userId,
				})
			}}
		/>
	)

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.containerInfo}>
				<View style={{ alignSelf: 'center', marginTop: 10 }}>
					<ComponenteAvatar accesory={true} img={profileData.profilePic} />
				</View>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						color: 'black',
					}}
				>
					{profileData.name} {profileData.lastName}
				</Text>
				<Button
					title='Editar Perfil'
					type='outline'
					titleStyle={{ color: '#3a86ff' }}
					buttonStyle={{
						marginTop: 20,
						borderRadius: 10,
						padding: 10,
					}}
					onPress={() => {
						navigation.navigate('EditarPerfil', {
							name: profileData.name,
							lastName: profileData.lastName,
							username: userData.username,
							email: userData.email,
						})
					}}
				/>
			</View>
			<View style={styles.walletMembership}>
				<View style={styles.wallet}>
					<Text style={{ ...styles.pillText }}>
						{walletData.amount !== undefined ? (
							<Text
								style={{ color: '#FDFDFF', fontSize: 20, fontWeight: 'bold' }}
							>
								Saldo: ${walletData.amount.$numberDecimal} MXN
							</Text>
						) : (
							<Text
								style={{ color: '#FDFDFF', fontSize: 20, fontWeight: 'bold' }}
							>
								Saldo: $0 MXN
							</Text>
						)}
					</Text>
				</View>
				<View style={styles.membership}>
					<Text
						style={styles.pillText2}
						onPress={() => navigation.navigate('Membership')}
					>
						Membresía
					</Text>
				</View>
			</View>

			<View style={styles.containerBtn}>
				<Button
					title='Mi cuenta'
					buttonStyle={styles.btn}
					titleStyle={{ color: '#e91e63' }}
					type='clear'
					onPress={() => {
						navigation.navigate('DatosCuenta', {
							name: profileData.name,
							lastName: profileData.lastName,
							username: userData.username,
							email: userData.email,
						})
					}}
				/>
				<Button
					title='Citas'
					buttonStyle={styles.btn}
					titleStyle={{ color: '#e91e63' }}
					type='clear'
					onPress={() => {
						navigation.navigate('CitasProgramadas')
					}}
				/>
			</View>
			{/* photo grid */}
			{postsData.length > 0 ? (
				<View style={styles.photoGrid}>
					<FlatList
						data={postsData}
						renderItem={renderItem}
						numColumns={3}
						keyExtractor={(item) => item.id}
					/>
				</View>
			) : (
				<Text style={{ color: 'grey', alignSelf: 'center', marginTop: 50 }}>
					No hay fotos todavía
				</Text>
			)}
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ffffff',
		// marginTop: Constants.statusBarHeight,
	},
	pillText: {
		fontSize: 20,
		fontWeight: 'bold',
		backgroundColor: '#0000FE',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},
	pillText2: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white',
		// backgroundColor: '#9B5DE5',
		// e63946
		backgroundColor: '#FF0101',
		borderRadius: 10,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},
	walletMembership: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		marginTop: 10,
		marginBottom: 10,
	},
	wallet: {
		marginTop: 10,
		marginBottom: 10,
	},
	membership: {
		// alignContent:'flex-end',
		marginTop: 10,
		marginBottom: 10,
	},
	containerInfo: {
		alignItems: 'center',
		backgroundColor: '#ffffff',
		// height: 230,
		borderBottomRightRadius: 40,
		borderBottomLeftRadius: 40,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
		paddingBottom: 10,
	},
	containerBtn: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	btn: {
		// flex:1,
		padding: 10,
		borderRadius: 10,
	},
	photoGrid: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
})
