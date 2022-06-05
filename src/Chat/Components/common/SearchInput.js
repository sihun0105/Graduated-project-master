import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

import { theme } from '../../ChatTheme';
const SearchInput = () => {
	return (
		<View style={styles.container}>
		<Text style={{textAlign : 'center', fontFamily: 'Jalnan', fontSize : 20}}>회원 목록</Text>
		<Text style={{textAlign : 'center', fontFamily: 'Jalnan', fontSize : 15}}>사람들과 대화를 주고받고 선물을 해보세요!</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingVertical: 20,
		paddingHorizontal: 30
	},
	row: {
		backgroundColor: theme.colors.searchBackground,
		flexDirection: 'row',
		borderRadius: 5,
		height: 45,
		alignItems: 'center',
		paddingHorizontal: 10
	},
	input: {
		paddingHorizontal: 30,
		fontSize: 15,
		height: 45,
		flex: 1,
		color: theme.colors.searchText
	}
});

export default SearchInput