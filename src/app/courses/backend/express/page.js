import Link from "next/link";

const ExpressCoursePage = () => {
	return (
		<main className="mx-auto max-w-3xl px-6 pb-12 pt-28">
			<p className="text-sm font-semibold uppercase tracking-wide text-gray-500">Backend course</p>
			<h1 className="mt-2 text-3xl font-bold text-gray-900">Build APIs with Express</h1>
			<p className="mt-4 text-gray-600">
				Learn the foundations of routing, middleware, and request handling with Node.js.
			</p>
			<Link href="/courses" className="mt-8 inline-block text-sm font-medium hover:underline">
				Back to courses
			</Link>
		</main>
	);
};

export default ExpressCoursePage;
