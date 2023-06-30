import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Avatar, Text, Button, Icon, Image } from 'react-native-elements'

export default function Arrival(props) {
	return (
		<View style={styles.mainContainer}>
			<Avatar
				rounded
				size='medium'
				source={{ uri: props.profilePic }}
				containerStyle={{ ...styles.simplePadding }}
			/>
			<Text h3 style={{ ...styles.simplePadding }}>
				{props.username}
			</Text>
			<Text h4 style={{ ...styles.simplePadding, color: 'grey' }}>
				Llegando en 3 min{' '}
			</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		alignItems: 'center',
	},
	simplePadding: {
		padding: 20,
	},
})
