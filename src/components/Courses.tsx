import { Star, Eye } from 'lucide-react';

const courses = [
  {
    title: "Learn Figma Advance Level",
    rating: "4.2",
    instructor: "Wade Warren",
    price: "$15",
    views: "142 views",
    color: "bg-blue-100",
  },
  {
    title: "Build Digital Asset",
    rating: "4.9",
    instructor: "Albert Flores",
    price: "$23",
    views: "523 views",
    color: "bg-neutral-200",
  },
  {
    title: "The Power of Digital",
    rating: "4.8",
    instructor: "Bessie Cooper",
    price: "$11",
    views: "111 views",
    color: "bg-emerald-100",
  },
  {
    title: "Mastering Productivity Tips",
    rating: "4.2",
    instructor: "Devon Lane",
    price: "$15",
    views: "142 views",
    color: "bg-orange-100",
  },
  {
    title: "Mastering Money Savings",
    rating: "4.9",
    instructor: "Cody Fisher",
    price: "$23",
    views: "523 views",
    color: "bg-indigo-100",
  },
  {
    title: "Learn Web UI/UX Design Basic",
    rating: "4.8",
    instructor: "Esther Howard",
    price: "$11",
    views: "111 views",
    color: "bg-rose-100",
  }
];

const categories = [
  "View All", "Art", "Design & Thinking", "3D Modeling", "Data Entry", "Digital History",
  "UI/UX Design", "Content Marketing", "Physical & Anatomy", "Web Architect", "Sports",
  "Personal & Business Development", "Programming", "Photography", "Music & Art",
  "Game Development", "Web Features", "Marketing", "e-Book"
];

export default function Courses() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-950 mb-4">
        Discover Your Passion,<br/>Build Your Skills
      </h2>
      <p className="text-neutral-500 mb-10 max-w-2xl mx-auto">
        Empower yourself with quality education and unlock your true potential. Explore a wide variety of courses from basic to advanced levels.
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((cat, i) => (
          <button 
            key={i}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              i === 0 
                ? 'bg-secondary-300 text-neutral-950' 
                : 'bg-white border border-neutral-200 text-neutral-600 hover:border-primary-500 hover:text-primary-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-left hover:-translate-y-1 transition-transform border border-neutral-100">
            <div className={`w-full h-48 rounded-xl ${course.color} mb-4 relative overflow-hidden group`}>
               <div className="absolute inset-0 bg-neutral-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <button className="bg-white text-neutral-950 px-4 py-2 rounded-full font-medium text-sm transform scale-95 group-hover:scale-100 transition-transform">Preview Course</button>
               </div>
               <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-sm">
                 <Star size={12} className="text-amber-500 fill-amber-500" />
                 {course.rating}
               </div>
            </div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-poppins font-bold text-neutral-950 text-lg leading-tight line-clamp-2 pr-4">{course.title}</h3>
              <span className="font-bold text-lg text-neutral-950">{course.price}</span>
            </div>
            <p className="text-primary-600 text-sm font-medium mb-4">{course.instructor}</p>
            <div className="flex items-center justify-between border-t border-neutral-100 pt-4">
              <div className="flex items-center gap-1 text-neutral-400 text-sm">
                <Eye size={16} />
                <span>{course.views}</span>
              </div>
              <div className="flex -space-x-2">
                {[1,2,3].map(n => (
                  <div key={n} className="w-6 h-6 rounded-full bg-neutral-200 border-2 border-white relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center text-[8px] text-neutral-500">U{n}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
