import React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Video } from 'expo-av'
const { width, height } = Dimensions.get('window')

export default function ComponenteVideo() {
	return (
		<Video
			source={{
				uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
			}}
			rate={1.0}
			volume={1.0}
			isMuted={false}
			resizeMode='cover'
			useNativeControls={false}
			style={styles.video}
			autoPlay={false}
			loop={false}
		/>
	)
}
const styles = StyleSheet.create({
	video: {
		width: width,
		height: height / 3,
	},
})
