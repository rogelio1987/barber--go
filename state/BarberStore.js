import { types } from 'mobx-state-tree'

export default Auth = types
	.model({
		barberId: types.string,
	})
	.actions((self) => {
		return {
			setBarber(barberId) {
				self.barberId = barberId
			},
		}
	})
