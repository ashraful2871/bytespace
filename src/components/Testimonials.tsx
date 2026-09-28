const testimonials = [
  {
    name: "Leslie Alexander",
    role: "UX/UI Designer",
    content: "ByteSpace has completely transformed the way I learn. The courses are insightful and the mentors are extremely supportive. Highly recommended!",
    avatar: "LA",
    bg: "bg-blue-100",
    textBg: "bg-white",
  },
  {
    name: "Ronald Richards",
    role: "Web Developer",
    content: "The platform is incredibly user-friendly and the content is top-notch. I've learned so much in just a few months. Thank you ByteSpace!",
    avatar: "RR",
    bg: "bg-emerald-100",
    textBg: "bg-neutral-50",
  },
  {
    name: "Albert Flores",
    role: "Product Manager",
    content: "I love the flexibility and autonomy ByteSpace offers. It allows me to learn at my own pace and fit it into my busy schedule seamlessly.",
    avatar: "AF",
    bg: "bg-purple-100",
    textBg: "bg-neutral-50",
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-end mb-16">
        <div className="flex-1">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-neutral-950 mb-4 leading-tight">
            Discover What Our<br/>Community Is Saying
          </h2>
        </div>
        <div className="flex-1">
          <p className="text-neutral-500 border-l-4 border-primary-500 pl-6 text-lg">
            Hear from our community of learners who have transformed their careers through our courses. Their success stories are a testament to the quality of our education.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <div key={i} className={`${t.textBg} rounded-3xl p-8 shadow-sm border border-neutral-100`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-full ${t.bg} flex items-center justify-center font-bold text-neutral-700`}>
                {t.avatar}
              </div>
              <div>
                <h4 className="font-poppins font-bold text-neutral-950 text-lg">{t.name}</h4>
                <p className="text-primary-600 text-sm font-medium">{t.role}</p>
              </div>
            </div>
            <p className="text-neutral-600 leading-relaxed">
              "{t.content}"
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
