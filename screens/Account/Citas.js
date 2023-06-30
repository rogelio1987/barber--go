import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import CitasListComponent from '../../components/Citas/CitasListComponent'

export default function Citas() {
	return (
		<SafeAreaView style={styles.container}>
			{/* <ComponenteCita /> */}
			<CitasListComponent />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
