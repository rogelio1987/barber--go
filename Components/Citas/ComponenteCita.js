import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'

export default function ComponenteCita() {
	return (
		<View style={styles.contenedorProducto}>
			<View style={{ flexDirection: 'column', marginLeft: 10 }}>
				<Text style={styles.label}>Barbero:</Text>
				<Text style={styles.txt}>Edgar Eduardo</Text>
				<Text style={styles.label}>Lugar:</Text>
				<Text style={styles.txt}>Lugar</Text>
				<Text style={styles.label}>Hora:</Text>
				<Text style={styles.txt}>8:20 pm</Text>
				<Text style={styles.label}>Fecha:</Text>
				<Text style={styles.txt}>12/12/2020</Text>
			</View>
			<View>
				<Button
					type='solid'
					buttonStyle={styles.btn}
					icon={
						<Icon type='ionicon' name='md-create' size={20} color='white' />
					}
				/>
				<Button
					type='solid'
					buttonStyle={[styles.btn, { backgroundColor: '#e91e63' }]}
					icon={<Icon type='ionicon' name='md-trash' size={20} color='white' />}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	contenedorProducto: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: 'white',
		margin: 10,
		// height: 100,
		borderRadius: 15,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,
		elevation: 24,
	},
	btn: {
		marginLeft: 10,
		width: 80,
		height: 30,
		margin: 10,
	},
	label: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	txt: {
		fontSize: 20,
	},
})
