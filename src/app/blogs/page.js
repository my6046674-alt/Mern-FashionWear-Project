import Link from "next/link";
import { blogs } from "@/data/blogs";

const BlogsPage = () => {
	return (
		<main className="mx-auto max-w-4xl px-6 pb-12 pt-28">
			<h1 className="text-3xl font-bold text-gray-900">Fashion journal</h1>
			<p className="mt-2 text-gray-600">Practical ideas for building a better wardrobe.</p>
			<div className="mt-8 space-y-4">
				{blogs.map((blog) => (
					<Link
						key={blog.slug.join("-")}
						href={`/blogs/${blog.slug.join("/")}`}
						className="block rounded-lg border border-gray-200 p-5 hover:border-gray-500"
					>
						<h2 className="text-xl font-semibold text-gray-900">{blog.title}</h2>
						<p className="mt-2 text-sm text-gray-500">Read article</p>
					</Link>
				))}
			</div>
		</main>
	);
};

export default BlogsPage;
