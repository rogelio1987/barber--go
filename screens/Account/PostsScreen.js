import React from 'react'
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import ComponentePost from '../components/ComponentePost'
import { useRoute } from '@react-navigation/native'

export default function PostsScreen() {
	const route = useRoute()

	return (
		<SafeAreaView style={styles.container}>
			<ComponentePost
				img={route.params.img}
				description={route.params.description}
				userId={route.params.userId}
			/>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
	},
})
