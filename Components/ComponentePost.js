import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import { Avatar, Button, Icon, Image } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
const { width } = Dimensions.get('window')
const height = width * 0.9
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export default function ComponentePost(props) {
	const navigation = useNavigation()
	const [profileData, setProfileData] = useState({ profile: {}, user: {} })

	useEffect(() => {
		fetchProfileData(Constants.manifest.extra.BASEURL + '/users/profile/' + props.userId)
	}, [])

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
			setProfileData(data)
		} catch (error) {
			// setLoading(false)
			// setMessage('Error de red')
			console.log(error)
		}
	}
	return (
		<View>
			<View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
				<Avatar
					rounded
					size='medium'
					//source={props.imageUri}
					source={{ uri: profileData.profile.profilePic }}
				/>
				<Button
					title={profileData.user.username}
					type='clear'
					buttonStyle={{
						fontWeight: 'bold',
						fontSize: 15,
						marginLeft: 5,
					}}
					onPress={() =>
						navigation.navigate('Inicio', {
							screen: 'Perfil',
							params: {
								profilePic: profileData.profile.profilePic,
								username: profileData.user.username,
								barberId: props.userId,
							},
						})
					}
				/>
			</View>
			<Image source={{ uri: props.img }} style={styles.img} />
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<Button
					type='clear'
					icon={
						<Icon
							type='material-community'
							name='heart'
							color='#ef233c'
							size={30}
						/>
					}
				/>
				<Text style={{ fontWeight: 'bold', fontSize: 15 }}>800</Text>
				<Text style={{ fontSize: 15, marginLeft: 10 }}>
					{props.description}
				</Text>
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	img: {
		width,
		height,
		resizeMode: 'cover',
	},
})
