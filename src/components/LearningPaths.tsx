import { Monitor, Code, Smartphone, Briefcase, TrendingUp, Camera } from 'lucide-react';

const paths = [
  { icon: Monitor, label: "Design", color: "text-secondary-600", bg: "bg-secondary-50" },
  { icon: Code, label: "Development", color: "text-emerald-600", bg: "bg-emerald-50" },
  { icon: Smartphone, label: "IT & Software", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: Briefcase, label: "Business", color: "text-purple-600", bg: "bg-purple-50" },
  { icon: TrendingUp, label: "Marketing", color: "text-orange-600", bg: "bg-orange-50" },
  { icon: Camera, label: "Photography", color: "text-rose-600", bg: "bg-rose-50" },
];

export default function LearningPaths() {
  return (
    <section className="bg-neutral-50 py-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-950 mb-4">
          Explore Diverse Learning Paths at ByteSpace
        </h2>
        <p className="text-neutral-500 mb-12 max-w-2xl mx-auto">
          Embark on a journey of discovery and growth with our diverse learning paths, tailored to guide you step-by-step toward achieving your potential.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {paths.map((path, i) => {
            const Icon = path.icon;
            return (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-neutral-100 flex flex-col items-center justify-center gap-4 cursor-pointer group">
                <div className={`w-16 h-16 rounded-2xl ${path.bg} ${path.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon size={32} />
                </div>
                <span className="font-poppins font-medium text-neutral-900">{path.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
