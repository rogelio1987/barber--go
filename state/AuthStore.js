import { flow, types } from 'mobx-state-tree'
import axios from 'axios'
import { save, getValueFor, deleteValueFor, verifyToken } from '../SecureStore'
import Constants from 'expo-constants'

export default Auth = types
	.model({
		token: types.string,
		state: types.enumeration('State', ['loading', 'done', 'error']),
	})
	.actions((self) => {
		return {
			verifyToken: flow(function* () {
				let verify = yield verifyToken()
				if (verify !== undefined) {
					self.token = verify
				}
			}),
			login: flow(function* (username, password) {
				self.state = 'loading'
				try {
					let response = yield axios.post(Constants.manifest.extra.BASEURL + '/users/login', {
						username,
						password,
					})
					self.state = 'done'
					self.token = response.data.token
					save('auth_token', response.data.token)
				} catch (error) {
					console.log(error)
					self.state = 'error'
				}
			}),
			logout() {
				self.token = ''
				deleteValueFor('auth_token')
			},
		}
	})
