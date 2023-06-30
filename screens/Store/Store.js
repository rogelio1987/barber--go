import React, { useState, useContext, useEffect, useRef } from 'react'
import {
	StyleSheet,
	SafeAreaView,
	useWindowDimensions,
	FlatList,
	Text,
	View,
	Dimensions,
} from 'react-native'
import { Button, Card, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import CarouselComponent from '../../components/Carousel'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import { Context } from '../../context/Context'
import RBSheet from 'react-native-raw-bottom-sheet'
import { observer } from 'mobx-react-lite'
import { useMst } from '../../state/RootStore'

const height = Dimensions.get('window').height
const Store = observer(() => {
	//navegacion
	const navigation = useNavigation()
	const [storeData, setStoreData] = useState([])
	const [productsChanged, setProductsChanged] = useState(false)
	const windowWidth = useWindowDimensions().width / 3
	const carItemWidth = useWindowDimensions().width
	const context = useContext(Context)
	const refRBSheet = useRef()
	const { products } = useMst()

	const StoreCarItem = observer(({ item }) => {
		return item.products.map((e) => (
			<Card containerStyle={styles.cardContainer}>
				<Card.Title>{e.name}</Card.Title>
				<Card.Image
					source={{ uri: e.picture }}
					containerStyle={styles.eImgContainer}
					resizeMode='contain'
				/>
				<Text style={{ marginBottom: 10 }}>
					<Text style={styles.eDescTitle}>{e.description} </Text>$
					{e.price.$numberDecimal}MXN
				</Text>
				<Button
					icon={
						<Icon type='material-community' name='cart-plus' color='#0000FE' />
					}
					type='outline'
					buttonStyle={styles.btn}
					onPress={() => {
						// products.selectProduct(e._id)
						products.addProduct(e)
					}}
				/>
			</Card>
		))
	})

	const StoreCarItemComponent = observer(({ item }) => (
		<Card containerStyle={styles.cardContainer}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Card.Title>{item.name}</Card.Title>
				<Button
					icon={
						<Icon type='material-community' name='delete' color='#C00000' />
					}
					type='clear'
					buttonStyle={styles.btn}
					onPress={() => {
						products.removeProduct(item)
						// setProductsChanged(!productsChanged)
					}}
				/>
			</View>

			<Card.Image
				source={{ uri: item.picture }}
				containerStyle={styles.itemImgContainer}
				resizeMode='contain'
			/>
			<Text style={{ marginBottom: 10 }}>
				<Text style={styles.itemDescTitle}>{item.description} </Text>$
				{item.price.$numberDecimal}MXN
			</Text>
			<Text style={{ marginBottom: 10 }}>
				<Text style={styles.itemDescTitle}>Cantidad: </Text>
				{item.qty}
			</Text>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Button
					icon={
						<Icon type='material-community' name='cart-plus' color='#0000FE' />
					}
					buttonStyle={styles.btn}
					type='clear'
					onPress={() => {
						products.addProduct(item)
					}}
				/>
				<Button
					icon={
						<Icon
							type='material-community'
							name='cart-remove'
							color='#C00000'
						/>
					}
					type='clear'
					buttonStyle={styles.btn}
					onPress={() => {
						products.removeQty(item)
						// products.removeProduct(item)
					}}
				/>
			</View>
		</Card>
	))
	const StoreItem = observer(({ item }) => (
		<View>
			<Text style={styles.header}>{item.title}</Text>
			<StoreCarItem item={item} />
		</View>
	))

	useEffect(() => {
		fetchStoreData()
	}, [])

	const fetchStoreData = async () => {
		let get_token = await SecureStore.getItemAsync('auth_token')
		try {
			// setLoading(true)
			let response = await axios.get(
				Constants.manifest.extra.BASEURL + '/store',
				{
					headers: {
						Authorization: 'Bearer ' + get_token,
					},
				}
			)
			let data = response.data.data
			setStoreData(data)
		} catch (error) {
			// setLoading(false)
			// setMessage('Error de red')
			console.log(error)
		}
	}
	return (
		<SafeAreaView style={styles.container}>
			{storeData ? (
				<FlatList
					data={storeData}
					extraData={products.products}
					renderItem={({ item }) => <StoreItem item={item} />}
					keyExtractor={(item) => item.title}
				/>
			) : null}
			<Button
				title={products.productCount}
				icon={<Icon type='material-community' name='cart' color='#fff' />}
				buttonStyle={{
					borderRadius: 10,
					marginHorizontal: 10,
					backgroundColor: '#0000FE',
					padding: 15,
				}}
				type='solid'
				titleStyle={{ fontSize: 20 }}
				onPress={() => refRBSheet.current.open()}
			/>
			<RBSheet
				ref={refRBSheet}
				height={height - Constants.statusBarHeight}
				closeOnDragDown={true}
				closeOnPressMask={true}
				dragFromTopOnly={true}
				customStyles={{
					wrapper: {
						backgroundColor: 'transparent',
					},
					draggableIcon: {
						backgroundColor: '#000',
					},
				}}
			>
				{products.products.length == 0 ? (
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Text style={{ color: 'grey', fontSize: 15 }}>
							No has agregado nada todavía
						</Text>
					</View>
				) : (
					<View>
						<FlatList
							data={products.products}
							renderItem={({ item }) => <StoreCarItemComponent item={item} />}
							keyExtractor={(item) => item._id}
							ListHeaderComponent={() => (
								<Button
									title='Confirmar'
									buttonStyle={{
										borderRadius: 10,
										marginHorizontal: 10,
										backgroundColor: '#0000FE',
										padding: 15,
									}}
									onPress={() => {
										refRBSheet.current.close()
										navigation.navigate('Pedido', {
											screen: 'ConfirmarPedido',
										})
									}}
								/>
							)}
							stickyHeaderIndices={[0]}
						/>
					</View>
				)}
				{/* <Components /> */}
			</RBSheet>
		</SafeAreaView>
	)
})
export default Store
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ffffff',
		// marginTop: Constants.statusBarHeight,
	},
	header: {
		color: '#0100A4',
		fontWeight: 'bold',
		fontSize: 20,
		alignSelf: 'center',
		margin: 10,
	},
	btn: {
		padding: 10,
		borderRadius: 20,
	},
	itemDescTitle: {
		fontWeight: 'bold',
	},
	itemImgContainer: {
		borderRadius: 20,
	},
	cardContainer: {
		borderRadius: 20,
		borderColor: '#7D7DFF',
		marginBottom: 40,
	},
})
