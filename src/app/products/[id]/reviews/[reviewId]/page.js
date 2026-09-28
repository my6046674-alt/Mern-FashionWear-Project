const ReviewPage = async ({ params }) => {
	const { id, reviewId } = await params;

	return (
		<main className="mx-auto max-w-2xl px-6 pb-12 pt-28">
			<p className="text-sm text-gray-500">Product {id}</p>
			<h1 className="mt-2 text-3xl font-bold text-gray-900">Review {reviewId}</h1>
			<p className="mt-4 text-gray-600">This product review is ready to be published.</p>
		</main>
	);
};

export default ReviewPage;
