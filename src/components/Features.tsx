import { CheckCircle2 } from 'lucide-react';

export default function Features() {
  return (
    <>
      <section className="py-20 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-16 mb-24">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-950 mb-6 leading-tight">
              Your Path to Professional Growth Starts Here!
            </h2>
            <p className="text-neutral-500 mb-8 text-lg">
              Unlock your potential with our diverse range of courses designed to elevate your skills and career.
            </p>
            <ul className="space-y-4 mb-10">
              {['Enhance your skills with our wide selection of courses', 'Connect with instructors and students in our interactive community', 'Find your dream job with our career assistance'].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="text-secondary-600 mt-1 flex-shrink-0" size={20} />
                  <span className="text-neutral-600">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-8 border-t border-neutral-100 pt-8">
              <div>
                <p className="font-poppins font-bold text-3xl text-primary-600">12k</p>
                <p className="text-neutral-500 text-sm">Students</p>
              </div>
              <div className="w-px h-10 bg-neutral-200"></div>
              <div>
                <p className="font-poppins font-bold text-3xl text-primary-600">70+</p>
                <p className="text-neutral-500 text-sm">Tutors</p>
              </div>
              <div className="w-px h-10 bg-neutral-200"></div>
              <div>
                <p className="font-poppins font-bold text-3xl text-primary-600">18</p>
                <p className="text-neutral-500 text-sm">Subjects</p>
              </div>
            </div>
          </div>
          <div className="flex-1 relative">
             <div className="w-full max-w-md mx-auto aspect-square rounded-full bg-neutral-100 relative shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">Student Image</div>
                
                {/* Floating elements */}
                <div className="absolute top-10 -left-10 bg-white p-3 rounded-xl shadow-xl flex items-center gap-3">
                   <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">W</div>
                   <div>
                     <p className="text-xs text-neutral-500">Learn Figma Advance</p>
                     <p className="text-xs font-bold text-neutral-900 line-through opacity-50">$25.00</p>
                   </div>
                </div>

                <div className="absolute bottom-20 -right-10 bg-white p-4 rounded-xl shadow-xl text-center">
                   <p className="text-xs text-neutral-500 font-medium mb-1">Photography</p>
                   <p className="text-2xl font-bold text-neutral-900">55%</p>
                   <p className="text-xs text-secondary-600 font-medium">Discount</p>
                </div>
             </div>
             
             {/* Decorative squiggles */}
             <div className="absolute top-0 right-0 w-16 h-16 opacity-50 text-secondary-300">
               <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8"><path d="M10,50 Q30,10 50,50 T90,50"/></svg>
             </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-16">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold text-neutral-950 mb-6 leading-tight">
              Create & Manage Courses Easily.
            </h2>
            <p className="text-neutral-500 mb-8 text-lg">
              ByteSpace offers an intuitive interface where you can organize, update, and monitor all your courses with ease.
            </p>
            <ul className="space-y-4">
              {['Intuitive Interface', 'Seamless Collaboration', 'Flexibility and Autonomy', 'Active Community'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 bg-white shadow-sm border border-neutral-100 rounded-xl p-4 hover:border-primary-200 hover:shadow-md transition-all">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-neutral-700 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 relative">
             <div className="w-full max-w-md mx-auto aspect-square rounded-[3rem] bg-neutral-100 relative overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">Instructor Image</div>
             </div>
             
             {/* Floating elements */}
             <div className="absolute top-20 -left-6 bg-primary-600 text-white p-4 rounded-xl shadow-xl flex items-center gap-4 rotate-[-5deg]">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">🎨</div>
                <div>
                  <p className="text-sm opacity-80">Graphic Design</p>
                  <p className="text-lg font-bold">$19.00/mo</p>
                </div>
             </div>
             
             <div className="absolute bottom-10 right-0 bg-white p-3 rounded-xl shadow-xl flex items-center gap-3">
               <div className="flex -space-x-2">
                  {[1,2,3,4].map(n => (
                    <div key={n} className="w-8 h-8 rounded-full bg-neutral-200 border-2 border-white"></div>
                  ))}
                </div>
                <p className="text-xs font-bold text-neutral-600">120+ Students</p>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-20 px-6 relative overflow-hidden text-center mt-10">
        <div className="absolute top-0 left-0 w-64 h-64 border-[16px] border-secondary-300 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white rounded-full translate-x-1/3 translate-y-1/3 opacity-10 blur-3xl"></div>
        <div className="absolute right-20 top-20 text-secondary-300 opacity-60">
           <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="8"><path d="M10,50 Q30,10 50,50 T90,50"/></svg>
        </div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-6 leading-tight">
            Unlock Your Potential as a<br/>Creator with ByteSpace
          </h2>
          <p className="text-primary-100 text-lg mb-10">
            Empower yourself with quality education and unlock your true potential. Join us today and start your journey towards excellence.
          </p>
          <button className="bg-secondary-300 hover:bg-secondary-400 text-neutral-950 px-8 py-4 rounded-full font-bold text-lg transition-colors shadow-lg shadow-secondary-300/30">
            Join as Creator
          </button>
        </div>
      </section>
    </>
  );
}
