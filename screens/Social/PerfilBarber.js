import React, { useState, useEffect } from 'react'
import {
	View,
	SafeAreaView,
	StyleSheet,
	FlatList,
	useWindowDimensions,
	ActivityIndicator,
} from 'react-native'
import { Text, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import ComponenteAvatar from '../../components/ComponenteAvatar'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export default function PerfilBarber() {
	const route = useRoute()
	const navigation = useNavigation()

	const [postsData, setPostsData] = useState([])
	const windowWidth = useWindowDimensions().width / 3

	//GET posts by barber
	useEffect(() => {
		// fetchProfileData()
		concurrentRequests()
	}, [])

	const concurrentRequests = () => {
		Promise.all([
			// fetchProfileData(Constants.manifest.extra.BASEURL + '/users/profile'),
			fetchProfileData(
				Constants.manifest.extra.BASEURL + '/post/barber/' + route.params.barberId
			),
		]).then(function (results) {
			// const profile = results[0].profile
			// const user = results[0].user
			// const wallet = results[1]
			const posts = results[0]
			// setProfileData(profile)
			// setUserData(user)
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
					<ComponenteAvatar accesory={false} img={route.params.profilePic} />
				</View>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						color: 'black',
					}}
				>
					{route.params.username}
				</Text>
			</View>
			<View style={styles.photoGrid}>
				<FlatList
					data={postsData}
					renderItem={renderItem}
					numColumns={3}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ffffff',
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
	photoGrid: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		marginTop: 20,
	},
})
