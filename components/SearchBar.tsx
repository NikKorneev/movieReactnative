import { icons } from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

interface Props {
	placeholder: string;
	onPress?: () => void;
	value: string;
	onChangeText: (text: string) => void;
	autoFocus?: boolean;
}

const SearchBar = ({
	placeholder,
	onPress,
	value,
	onChangeText,
	autoFocus,
}: Props) => {
	return (
		<View className="flex-row items-center bg-dark-200 rounded-full px-5 py-3">
			<Image
				source={icons.search}
				className="size-5"
				resizeMode="contain"
				tintColor={"#ab8bff"}
			/>
			<TextInput
				submitBehavior="blurAndSubmit"
				autoFocus={autoFocus}
				onPress={onPress}
				inputMode="search"
				enterKeyHint="search"
				onChangeText={onChangeText}
				value={value}
				placeholder={placeholder}
				placeholderTextColor={"#ab8bff"}
				className="text-base ml-3 flex-1 text-white"
			/>
		</View>
	);
};

export default SearchBar;
