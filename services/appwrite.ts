import { Client, Databases, ID, Query } from "react-native-appwrite";

const APPWRITE_ID = process.env.EXPO_PUBLIC_APPWRITE_ID!;
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DB_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_COLLECTION_ID!;

const client = new Client()
	.setEndpoint("https://cloud.appwrite.io/v1")
	.setProject(APPWRITE_ID);
const db = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
	try {
		const result = await db.listDocuments(DATABASE_ID, COLLECTION_ID, [
			Query.equal("searchTerm", query),
		]);
		const documents = result.documents;
		const total = result.total;
		console.log(total);
		console.log(documents);

		if (result.documents.length > 0) {
			const existingMovie = result.documents[0];
			await db.updateDocument(
				DATABASE_ID,
				COLLECTION_ID,
				existingMovie.$id,
				{
					count: existingMovie.count + 1,
				}
			);
		} else {
			await db.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
				searchTerm: query,
				movie_id: movie.id,
				title: movie.title,
				count: 1,
				poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
			});
		}
	} catch (error) {
		console.log(JSON.stringify(error));
	}
};
