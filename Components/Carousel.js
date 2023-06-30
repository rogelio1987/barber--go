import React from 'react'
import { useWindowDimensions } from 'react-native'
import Carousel from 'react-native-snap-carousel'

const entries = [{ title: 'item1' }, { title: 'item2' }]

export default function CarouselComponent(props) {
	const windowWidth = useWindowDimensions().width

	return (
		<Carousel
			data={props.data}
			renderItem={props.renderItem}
			sliderWidth={props.sliderWidth}
			itemWidth={props.itemWidth}
			enableMomentum={false}
			lockScrollWhileSnapping={true}
			autoplay={true}
			autoplayDelay={200}
			loop={props.loop}
			removeClippedSubviews={false}
		/>
	)
}

// const styles = StyleSheet.create({
// 	img: {
// 		height:imgHeight
// 	},
// })
