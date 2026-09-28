

export const metadata = {
  title: "About Us",
  description: "Learn more about E-Fashion and our fashion collection.",
};

const AboutPage = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-black mb-5">About page</h1>
      <p>
        About Us Welcome to our online shopping platform, a simple and
        convenient place to discover and purchase a wide range of products. Our
        platform is designed to provide customers with a smooth and enjoyable
        shopping experience, from exploring products to placing orders. We
        provide detailed product information, updated prices, and an easy-to-use
        interface so customers can find what they need quickly and conveniently.
        Our goal is to make online shopping simple, reliable, and accessible for
        everyone. We focus on providing quality products and convenient services
        while continuously improving our platform based on customer needs.
        Whether you are looking for the latest technology, everyday products, or
        something special, our platform helps you explore different options from
        the comfort of your home. We believe that a good shopping experience
        should be simple, transparent, and customer-friendly. That is why we
        work to provide reliable product information, convenient ordering, and a
        user-friendly platform. Thank you for visiting our website and choosing
        us for your online shopping needs.
      </p>
      <button className="bg-blue-500 text-white px-4 py-1 rounded mt-5">Learn more</button>
    </section>
  );
};

export default AboutPage;
