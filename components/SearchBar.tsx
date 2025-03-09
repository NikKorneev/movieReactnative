import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
	placeholder: string;
	onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress }: Props) => {
	return (
		<View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
			<Image
				source={icons.search}
				className="size-5"
				resizeMode="contain"
				tintColor={"#ab8bff"}
			/>
			<TextInput
				onPress={onPress}
				onChangeText={() => {}}
				value=""
				placeholder={placeholder}
				placeholderTextColor={"#ab8bff"}
				className="text-base ml-3 flex-1"
			/>
		</View>
	);
};

export default SearchBar;
