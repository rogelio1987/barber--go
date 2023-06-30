import React, { useState, useEffect } from 'react'
import {
	StyleSheet,
	View,
	SafeAreaView,
	FlatList,
	ActivityIndicator,
    useWindowDimensions,
    ScrollView
} from 'react-native'
import { Button, Text, Image, PricingCard } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

export default function Profile() {
	//navegacion
	const navigation = useNavigation()

	const windowWidth = useWindowDimensions().width / 3

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<PricingCard
					color='#00BBF9'
					title='Gratis'
					price='$0'
					info={['Función 0', 'Función 1', 'Funciones gratis']}
                    button={{ title: 'YA LO TIENES',disabled:true }}
				/>
				<PricingCard
					color='#cb8c47'
					title='Bronze'
					price='$0'
					info={['Función 0', 'Función 1', 'Función x']}
                    // button={{ title: 'Obtener',disabled:true }}
				/>
				<PricingCard
					color='#8d99ae'
					title='Platinum'
					price='$0'
					info={['Función 1', 'Función 2', 'Función z']}
					button={{ title: 'SOLICITAR' }}
				/>
				<PricingCard
					color='#F4AC32'
					title='Gold'
					price='$0'
					info={['Función 2', 'Función 3', 'Función x']}
					button={{ title: 'SOLICITAR'}}
				/>
			</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#ffffff',
		// marginTop: Constants.statusBarHeight,
	},
	pillText: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'black',
		backgroundColor: '#e91e63',
		borderTopRightRadius: 10,
		borderBottomRightRadius: 10,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},
	wallet: {
		alignItems: 'flex-start',
		marginTop: 10,
		marginBottom: 10,
	},
	membership: {
		alignItems: 'flex-end',
		marginTop: 10,
		marginBottom: 10,
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
	containerBtn: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	btn: {
		// flex:1,
		padding: 10,
		borderRadius: 10,
	},
	photoGrid: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-evenly',
	},
})
