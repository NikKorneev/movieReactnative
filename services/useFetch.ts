import React, { useEffect } from "react";

const useFetch = <T>(fetchFunc: () => Promise<T>, autoFetch = true) => {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<Error | null>(null);
	const [data, setData] = React.useState<T | null>(null);

	const fetchData = async () => {
		try {
			setLoading(true);
			setError(null);
			const data = await fetchFunc();
			setData(data);
		} catch (error) {
			setError(
				error instanceof Error
					? error
					: new Error("Error fetching data")
			);
		} finally {
			setLoading(false);
		}
	};

	const reset = () => {
		setData(null);
		setError(null);
		setLoading(false);
	};

	useEffect(() => {
		if (autoFetch) {
			fetchData();
		}
	}, []);

	return { data, loading, error, fetchData, reset };
};

export default useFetch;
