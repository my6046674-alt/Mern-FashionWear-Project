const benefits = [
  {
    icon: "🚚",
    label: "Free Shipping",
    info: "On all orders over Rs.1000, faster delivery.",
  },
  {
    icon: "🔁",
    label: "30-Days Returns",
    info: "Hassle free exchange & returns.",
  },
  {
    icon: "🎧",
    label: "24/7 Support",
    info: "Always available for your assistance.",
  },
  {
    icon: "💳",
    label: "Secure Payment",
    info: "Safe payment gateways, online and card.",
  },
];

const Benefits = () => {
  return (
    <section id="benefits" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center mb-8 font-bold text-2xl dark:text-white">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefits-card">
              <span className="text-4xl">{benefit.icon}</span>
              <h4 className="text-lg dark:text-gray-200 font-medium">
                {benefit.label}
              </h4>
              <p className="text-light dark:text-gray-400 text-center text-sm">
                {benefit.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;