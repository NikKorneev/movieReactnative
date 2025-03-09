import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	FlatList,
	Image,
	ScrollView,
	StatusBar,
	Text,
	View,
} from "react-native";

export default function Index() {
	const router = useRouter();
	const {
		data: movies,
		loading: moviesLoading,
		error: moviesError,
	} = useFetch(() => fetchMovies<Movie[]>(""));

	return (
		<View className="flex-1 bg-primary ">
			<StatusBar animated={true} backgroundColor="#160d66" />
			<Image source={images.bg} className="w-full h-full absolute z-0" />
			<ScrollView
				className="flex-1 px-5"
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					minHeight: "100%",
					paddingBottom: 10,
				}}
			>
				<Image
					source={icons.logo}
					className="w-12 h-10 mt-20 mb-5 mx-auto"
				/>
				{moviesLoading ? (
					<ActivityIndicator
						size={"large"}
						color="#0000ff"
						className="mt-10 self-center"
					/>
				) : moviesError ? (
					<Text>Error: {moviesError.message}</Text>
				) : (
					<View className="flex-1 mt-5">
						<SearchBar
							onPress={() => router.push("/search")}
							placeholder="Search for a movie"
						/>

						<>
							<Text className="text-lg text-white font-bold mt-5 mb-3">
								Popular Movies
							</Text>
							<FlatList
								data={movies}
								renderItem={({ item }) => (
									<MovieCard {...item} />
								)}
								keyExtractor={(item) => item.id + ""}
								numColumns={3}
								columnWrapperClassName="flex-start gap-2 mb-4 w-full"
								className="mt-2 pb-32 w-full"
								columnWrapperStyle={{
									justifyContent: "space-between",
								}}
								scrollEnabled={false}
							/>
						</>
					</View>
				)}
			</ScrollView>
		</View>
	);
}
