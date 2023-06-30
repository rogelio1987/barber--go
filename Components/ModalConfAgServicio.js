import React, { useState, useContext } from 'react'
import {
	StyleSheet,
	View,
	SafeAreaView,
	Platform,
	Modal,
	Dimensions,
	Alert,
	ScrollView,
	TouchableHighlight,
} from 'react-native'
import { Button, Text, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function ModalConfAgServicio(props) {
	const navigation = useNavigation()

	return (
		<Modal
			animationType='slide'
			transparent={false}
			visible={props.modalVisible}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<Text style={styles.modalText}>{props.modalText}</Text>
					<TouchableHighlight
						style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
						onPress={() => {
							props.setModalVisible(false)
							navigation.navigate('Pedido', { screen: 'Mapa' })
						}}
					>
						<Text style={styles.textStyle}>Confirmar</Text>
					</TouchableHighlight>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ffffff',
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold',
		margin: 20,
	},
	tipoServicio: {
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
		margin: 20,
	},
	text1: {
		color: '#6c757d',
		fontSize: 20,
		fontWeight: 'bold',
		alignSelf: 'center',
	},
	//modal
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	openButton: {
		backgroundColor: '#F194FF',
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
})
