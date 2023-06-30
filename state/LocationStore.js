import { flow, types } from 'mobx-state-tree'
import axios from 'axios'
import { save, getValueFor, deleteValueFor, verifyToken } from '../SecureStore'
import Constants from 'expo-constants'

export default Auth = types
	.model({
		latitude: types.number,
		longitude: types.number,
	})
	.actions((self) => {
		return {
			setLocation(latitude, longitude) {
				self.latitude = latitude
				self.longitude = longitude
			},
		}
	})
