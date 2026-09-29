const Contact = () => {
  return (
    <section id="contact" className="py-12">
      <div className="container mx-auto px-4">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.662121468006!2d87.28372377643548!3d26.818885076703182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ef4175e4f26a95%3A0x9b8526c7c4c7bc1c!2sCode%20IT!5e0!3m2!1sen!2snp!4v1775141776638!5m2!1sen!2snp"
          height={200}
          style={{ border: 0, width: "100%", borderRadius: "2rem" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 mt-8">
          <form className="flex flex-col gap-3" action="#">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Your name"
              className="w-full bg-white border border-primary/20 rounded-2xl px-4 py-2 focus:outline-2 focus:outline-primary"
            />
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Email address"
              className="w-full bg-white border border-primary/20 rounded-2xl px-4 py-2 focus:outline-2 focus:outline-primary"
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Phone number"
              className="w-full bg-white border border-primary/20 rounded-2xl px-4 py-2 focus:outline-2 focus:outline-primary"
            />
            <textarea
              name="message"
              id="message"
              placeholder="Your message..."
              rows={5}
              className="w-full bg-white border border-primary/20 rounded-2xl px-4 py-2 focus:outline-2 focus:outline-primary"
              defaultValue={""}
            />
            <button className="bg-primary rounded-3xl text-white px-10 py-3 transition duration-300 ease max-w-fit mt-2">
              Send Message
            </button>
          </form>
          <div className="info">
            <h2 className="text-3xl dark:text-white font-bold">
              Let&apos;s Connect
            </h2>
            <p className="text-light dark:text-gray-300 text-sm my-4">
              Have any questions? Please reach out to us.
            </p>
            <a
              href="https://maps.app.goo.gl/PUFbCf7w5cHEX2AF6"
              target="_blank"
              className="m-1 text-sm block text-dark dark:text-white hover:text-primary"
            >
              📍 Prithvi Path, Dharan, Sunsari
            </a>
            <a
              href="mailto:info@codeit.com.np"
              className="m-1 text-sm block text-dark dark:text-white hover:text-primary"
            >
              📨 info@codeit.com.np
            </a>
            <a
              href="tel:+977-25-575163"
              className="m-1 text-sm block text-dark dark:text-white hover:text-primary"
            >
              📞 +977-25-575163
            </a>
            <a
              href="https://wa.me/9862130505"
              className="m-1 text-sm block text-dark dark:text-white hover:text-primary"
            >
              💬 9862130505
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;