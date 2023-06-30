import React, { useState, useRef } from 'react'
import {
	View,
	SafeAreaView,
	StyleSheet,
	Text,
	FlatList,
	Dimensions,
} from 'react-native'
import { Button, Card, Icon, CheckBox } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import RBSheet from 'react-native-raw-bottom-sheet'
import { useMst } from '../../state/RootStore'
import { observer } from 'mobx-react-lite'
const height = Dimensions.get('window').height

const SeleccionarServicio = observer(() => {
	const navigation = useNavigation()
	const [checkedRegular, setcheckedRegular] = useState(false)
	const [checkedPersonalizado, setcheckedPersonalizado] = useState(false)

	const [checkedTarjeta, setCheckedTarjeta] = useState(false)
	const [checkedEfectivo, setCheckedEfectivo] = useState(true)
	const refRBSheet = useRef()

	const { products } = useMst()
	const StoreCarItemComponent = observer(({ item }) => (
		<Card containerStyle={styles.cardContainer}>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
				<Card.Title>{item.name}</Card.Title>
				<Button
					icon={
						<Icon type='material-community' name='delete' color='#e63946' />
					}
					type='clear'
					buttonStyle={styles.btn}
					onPress={() => {
						products.removeProduct(item)
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
						<Icon type='material-community' name='cart-plus' color='#00BBF9' />
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
							color='#00BBF9'
						/>
					}
					type='clear'
					buttonStyle={styles.btn}
					onPress={() => {
						products.removeQty(item)
					}}
				/>
			</View>
		</Card>
	))
	return (
		<SafeAreaView style={styles.container}>
			<View style={{ flex: 2 }}>
				<View
					style={{
						alignItems: 'center',
						margin: 20,
					}}
				>
					<Text style={{ fontSize: 20, fontWeight: 'bold' }}>
						Tipo de servicio
					</Text>
				</View>

				<View>
					<CheckBox
						title='Regular'
						checked={checkedRegular}
						onPress={() => {
							setcheckedRegular(!checkedRegular)
							setcheckedPersonalizado(false)
						}}
					/>
					<CheckBox
						title='Personalizado'
						checked={checkedPersonalizado}
						onPress={() => {
							setcheckedPersonalizado(!checkedPersonalizado)
							setcheckedRegular(false)
						}}
					/>
				</View>
				<View>
					<Text style={styles.tipoServicio}>Forma de pago</Text>
					<CheckBox
						title='Efectivo'
						checked={checkedEfectivo}
						onPress={() => {
							setCheckedEfectivo(!checkedEfectivo)
							setCheckedTarjeta(false)
						}}
					/>
					<CheckBox
						title='Tarjeta de Débito/Crédito'
						checked={checkedTarjeta}
						onPress={() => {
							setCheckedTarjeta(!checkedTarjeta)
							setCheckedEfectivo(false)
						}}
					/>
				</View>
			</View>
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
				{products.length == 0 ? (
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
										backgroundColor: '#0100A4',
										padding: 15,
									}}
									onPress={() => {
										refRBSheet.current.close()
									}}
								/>
							)}
							stickyHeaderIndices={[0]}
						/>
					</View>
				)}
				{/* <Components /> */}
			</RBSheet>
			<Button
				title={products.productCount}
				icon={<Icon type='material-community' name='cart' color='black' />}
				buttonStyle={{
					borderRadius: 10,
					marginHorizontal: 10,
					backgroundColor: '#FDFDFF',
					padding: 15,
				}}
				type='solid'
				titleStyle={{ fontSize: 20, color: 'black' }}
				onPress={() => refRBSheet.current.open()}
			/>
			<Button
				title='Confirmar'
				titleStyle={{ fontWeight: 'bold' }}
				// disabled={!checkedPersonalizado && !checkedRegular ? true : false}
				disabled={
					(!checkedPersonalizado && !checkedRegular) ||
					(!checkedEfectivo && !checkedTarjeta)
						? true
						: false
				}
				buttonStyle={{
					borderRadius: 10,
					marginHorizontal: 10,
					backgroundColor: '#0000FE',
					padding: 15,
				}}
				onPress={() => {
					let paymentMethod = ''
					if (checkedEfectivo) {
						paymentMethod = 'efectivo'
					} else {
						paymentMethod = 'tarjeta'
					}
					navigation.navigate('ConfirmarPedido', {
						paymentMethod,
					})
				}}
			/>
		</SafeAreaView>
	)
})
export default SeleccionarServicio
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	image: {
		flex: 1,
		resizeMode: 'cover',
		justifyContent: 'center',
	},
	titulo: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#33415c',
	},
	tipoServicio: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
		margin: 20,
	},
	cardContainer: {
		borderRadius: 20,
		borderColor: '#3a86ff',
		marginBottom: 40,
	},
	btn: {
		padding: 10,
		borderRadius: 20,
	},
	itemImgContainer: {
		borderRadius: 20,
	},
	itemDescTitle: {
		fontWeight: 'bold',
	},
})
