import React, { useState } from 'react'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export default function ComponenteAvatar(props) {
	const [profileImg, setProfileImg] = useState('')
	const changeAvatar = async () => {
		const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
		const resultPermissionCamera =
			resultPermission.permissions.cameraRoll.status
		if (resultPermissionCamera === 'denied') {
			console.log('es necesario aceptar el permiso de la galeria ')
		} else {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 1,
			})
			if (!result.cancelled) {
				updateProfilePic()
				setProfileImg(result.uri)
			}
		}
	}

	const updateProfilePic = async () => {
		let get_token = await SecureStore.getItemAsync('auth_token')
		try {
			// setLoading(true)
			let response = await axios.put(
				Constants.manifest.extra.BASEURL +'/users/profile',
				{ profilePic: profileImg },
				{
					headers: {
						Authorization: 'Bearer ' + get_token,
					},
				}
			)
			let success = await response.data.success
			if (success) {
				navigation.reset({
					index: 0,
					routes: [{ name: 'Perfil' }],
				})
			}
		} catch (error) {
			// setLoading(false)
			// setMessage('Error de red')
			console.log(error)
		}
	}
	return (
		<Avatar
			rounded
			size='xlarge'
			source={profileImg == '' ? { uri: props.img } : { uri: profileImg }}
		>
			{props.accesory ? (
				<Avatar.Accessory size={30} onPress={changeAvatar} />
			) : null}
		</Avatar>
	)
}
