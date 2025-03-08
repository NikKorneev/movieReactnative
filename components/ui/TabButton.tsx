import { images } from "@/constants/images";
import React from "react";
import {
	Image,
	ImageBackground,
	ImageSourcePropType,
	Text,
	View,
} from "react-native";

const TabButton = ({
	focused,
	icon,
	title,
}: {
	focused: boolean;
	icon: ImageSourcePropType;
	title: string;
}) => {
	if (focused) {
		return (
			<>
				<ImageBackground
					source={images.highlight}
					className="flex-row flex w-full flex-1 min-w-[100px] min-h-16 mt-4 justify-center items-center overflow-hidden rounded-full"
				>
					<Image
						source={icon}
						tintColor={"#151312"}
						className="size-5"
					/>
					<Text className="text-secondary text-base font-semibold ml-2">
						{title}
					</Text>
				</ImageBackground>
			</>
		);
	} else {
		return (
			<View className="size-full justify-center items-center mt-4 rounded-full">
				<Image source={icon} tintColor={"#a8b5db"} className="size-5" />
			</View>
		);
	}
};

export default TabButton;
