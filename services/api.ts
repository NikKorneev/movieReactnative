export const TMDB_CONFIG = {
	BASE_URL: "https://api.themoviedb.org/3",
	API_KEY: process.env.EXPO_PUBLIC_TMDB_TOKEN,
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMDB_TOKEN}`,
	},
};

export const fetchMovies = async <T>(searchQuery: string): Promise<T> => {
	const endpoint = searchQuery
		? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
				searchQuery
		  )}&page=1`
		: `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc&page=1`;

	const response = await fetch(endpoint, {
		method: "GET",
		headers: TMDB_CONFIG.headers,
	});

	if (!response.ok) {
		//@ts-ignore
		throw new Error("failed to fetch movies", response.statusText);
	}

	const data = await response.json();
	return data.results;
};
