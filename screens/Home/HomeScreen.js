import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import {
	StyleSheet,
	SafeAreaView,
	View,
	Text,
	Image,
	useWindowDimensions,
	SectionList,
	FlatList,
} from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'
import ComponentePost from '../../components/ComponentePost'
import CarouselComponent from '../../components/Carousel'
import { ImgCarrousel } from '../../Data/ImgSlider'
import axios from 'axios'
import * as SecureStore from 'expo-secure-store'
import Constants from 'expo-constants'

export default function HomeScreen() {
	const navigation = useNavigation()
	// let src = PRODUCTOS[0].imagen
	const windowWidth = useWindowDimensions().width / 2
	const imgWidth = useWindowDimensions().width
	const [feed, setFeed] = useState([])
	const [skip, setSkip] = useState(0)
	const _renderItem = ({ item, index }) => {
		return (
			<Image
				source={item.imagen}
				style={{ height: 200, width: imgWidth }}
				resizeMode='cover'
			/>
		)
	}
	const renderItem = ({ item }) => (
		<ComponentePost
			img={item.picture}
			description={item.description}
			userId={item.userId}
		/>
	)

	const fetchFeed = async (skip) => {
		let get_token = await SecureStore.getItemAsync('auth_token')
		try {
			let response = await axios.get(
				Constants.manifest.extra.BASEURL + '/post/feed/' + skip,
				{
					headers: {
						Authorization: 'Bearer ' + get_token,
					},
				}
			)
			let data = response.data.data
			// console.log(response.data)
			setFeed(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchFeed(skip)
	}, [])

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				ListHeaderComponent={() => (
					<CarouselComponent
						data={ImgCarrousel}
						renderItem={_renderItem}
						sliderWidth={imgWidth}
						itemWidth={imgWidth}
						loop={true}
					/>
				)}
				data={feed}
				renderItem={renderItem}
				keyExtractor={(item) => item.createdAt}
				// onEndReachedThreshold={0.5}
				// onEndReached={() => {
				// 	let s = skip
				// 	s + 25
				// 	setSkip(s)
				// 	fetchFeed(skip)
				// }}
			/>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		// flexDirection:'column',
		backgroundColor: 'white',
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 20,
		marginVertical: 8,
	},
	header: {
		fontSize: 32,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 24,
	},
})
