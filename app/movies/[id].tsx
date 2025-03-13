import { icons } from "@/constants/icons";
import { fetchMovieDeatils } from "@/services/api";
import useFetch from "@/services/useFetch";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

interface MovieInfoProps {
	label: string;
	value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
	<View className=" items-start mt-5">
		<Text className="text-light-200 font-normal text-sm">{label}</Text>
		<Text className="text-light-100 mt-2 font-bold text-sm">
			{value || "N/A"}
		</Text>
	</View>
);

const MovieDetails = () => {
	const { id } = useLocalSearchParams();

	const { data: movie, loading } = useFetch(() =>
		fetchMovieDeatils(id as string)
	);

	return (
		<View className="bg-primary flex-1">
			<ScrollView
				contentContainerStyle={{
					paddingBottom: 80,
				}}
			>
				<View>
					<Image
						source={{
							uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
						}}
						className="w-full h-[550px]"
						resizeMode="stretch"
					/>
				</View>
				<View className="flex-col items-start justify-center mt-5 px-5">
					<Text className="text-white text-xl font-bold">
						{movie?.title}
					</Text>
					<View className="flex-row items-center gap-x-1 mt-2">
						<Text className="text-white text-sm">
							{movie?.release_date?.split("-")[0]}
						</Text>
						<Text className="text-white text-sm">
							{movie?.runtime}m
						</Text>
					</View>
					<View className="flex-row items-center gap-x-1 mt-2 bg-slate-600 px-3 py-1 rounded-md">
						<Image source={icons.star}></Image>
						<Text className="text-light-200 font-bold">
							{Math.round(movie?.vote_average ?? 0)}/10
						</Text>
						<Text className="text-light-200 text-sm">
							({movie?.vote_count} votes)
						</Text>
					</View>
					<MovieInfo label="Overview" value={movie?.overview} />
					<MovieInfo
						label="Genres"
						value={
							movie?.genres?.map((g) => g.name).join(" - ") ||
							"N/A"
						}
					/>
					<View className=" flex-row gap-x-5 flex-wrap">
						<MovieInfo
							label="Budget"
							value={`$${movie?.budget / 1_000_000} million`}
						/>
						<MovieInfo
							label="Revenue"
							value={`$${movie?.revenue / 1_000_000} million`}
						/>
					</View>

					<View>
						<MovieInfo
							label="Production Companies"
							value={
								movie?.production_companies
									.map((c) => c.name)
									.join(" - ") || "N/A"
							}
						/>
					</View>
				</View>
				<TouchableOpacity
					onPress={router.back}
					className="absolute bottom-5 left-5 right-5 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
				>
					<Image
						source={icons.arrow}
						className="size-5 mr-1 mt-0.5 rotate-180"
						tintColor={"#fff"}
					/>
					<Text className="text-white font-semibold text-base ">
						Go back
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
};

export default MovieDetails;
