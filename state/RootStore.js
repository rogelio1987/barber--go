import { types } from 'mobx-state-tree'
import { useContext, createContext } from 'react'
import AuthStore from './AuthStore'
import LocationStore from './LocationStore'
import ProductsStore from './ProductsStore'
import BarberStore from './BarberStore'

const RootStore = types.model({
	auth: AuthStore,
	products: ProductsStore,
	location: LocationStore,
	barber: BarberStore,
})

let initialState = RootStore.create({
	auth: {
		token: '',
		state: 'loading',
	},
	products: {
		products: [],
		selectedProduct: '',
	},
	location: {
		latitude: 0,
		longitude: 0,
	},
	barber: {
		barberId: '',
	},
})

export const rootstore = initialState
const RootStoreContext = createContext(null)
export const Provider = RootStoreContext.Provider
export function useMst() {
	const store = useContext(RootStoreContext)
	if (store === null) {
		throw new Error('Store cannot be null, please add a context provider')
	}
	return store
}
