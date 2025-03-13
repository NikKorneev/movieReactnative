import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { updateSearchCount } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search = () => {
	const [query, setQuery] = useState("");
	const {
		data: movies,
		loading,
		error,
		fetchData,
		reset,
	} = useFetch(() => fetchMovies<Movie[]>(query), false);

	useEffect(() => {
		const timeoutID = setTimeout(async () => {
			if (query.trim()) {
				await fetchData();
				if (movies?.length && movies?.length > 0 && movies?.[0]) {
					await updateSearchCount(
						encodeURIComponent(query),
						movies[0]
					);
				}
			} else {
				reset();
			}
		}, 500);

		return () => clearTimeout(timeoutID);
	}, [query]);

	return (
		<View className="flex-1 bg-primary">
			<Image
				source={images.bg}
				className="flex-1 absolute w-full z-0"
				resizeMode="cover"
			/>
			<FlatList
				data={movies}
				renderItem={({ item }) => <MovieCard {...item} />}
				keyExtractor={(item) => item.id.toString()}
				className="px-5"
				numColumns={3}
				columnWrapperStyle={{
					justifyContent: "space-between",
					marginVertical: 16,
				}}
				contentContainerStyle={{ paddingBottom: 100 }}
				ListHeaderComponent={
					<>
						<View className="w-full flex-row justify-center mt-20 items-center">
							<Image source={icons.logo} className="w-12 h-10" />
						</View>
						<View className="my-5">
							<SearchBar
								placeholder="Search movies..."
								value={query}
								onChangeText={(text: string) => setQuery(text)}
								autoFocus={true}
							/>
						</View>

						{loading && (
							<ActivityIndicator
								size={"large"}
								color="#0000ff"
								className="my-3"
							/>
						)}

						{error && (
							<Text className="text-red-500 px-5 my-3">
								Something went wrong
							</Text>
						)}

						{!loading &&
							!error &&
							query.trim() &&
							movies?.length! > 0 && (
								<Text className="text-white text-lg font-bold  my-3">
									Search results for{" "}
									<Text
										className="text-accent"
										numberOfLines={2}
									>
										"{query}"
									</Text>
								</Text>
							)}
					</>
				}
				ListEmptyComponent={
					<>
						{!loading && !error && (
							<View className="mt-10 px-5">
								<Text className="text-center text-gray-500">
									{query.trim()
										? "No results found"
										: "Search for movies"}
								</Text>
							</View>
						)}
					</>
				}
			/>
		</View>
	);
};

export default Search;
