import { icons } from "@/constants/icons";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
	id,
	poster_path,
	title,
	vote_average,
	original_language,
	release_date,
}: Movie) => {
	console.log(`https://image.tmdb.org/t/p/w500/${poster_path}`);

	return (
		<Link href={`/movies/${id}`} asChild>
			<TouchableOpacity className="w-[31%]">
				<Image
					source={{
						uri: "https://loremflickr.com/320/240",
					}}
					className="w-full h-52 rounded-lg"
					resizeMode="cover"
				/>
				<Text
					className="text-sm font-bold text-white mt-2"
					numberOfLines={1}
				>
					{title}
				</Text>

				<View className="flex-row items-center justify-start gap-x-1">
					<Image source={icons.star} className="w-4 h-4" />
					<Text className="text-xs text-white font-bold uppercase">
						{Math.round(vote_average / 2)}
					</Text>
				</View>

				<View className="flex-row items-center justify-between">
					<Text className="text-xs text-light-300 font-medium mt-1">
						{release_date.split("-")[0]}
					</Text>
					<Text className="text-xs font-medium text-light-300 uppercase">
						{original_language}
					</Text>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default MovieCard;
