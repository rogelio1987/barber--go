import React, { useState } from 'react'
import { View, Button } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'

export default function DateTimePickerComponent(props) {
	return (
		<DateTimePicker
			testID='dateTimePicker'
			value={props.value}
			mode={props.mode}
			is24Hour={false}
			display='default'
			onChange={props.onChange}
		/>
	)
}
