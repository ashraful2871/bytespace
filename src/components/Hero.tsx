import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-primary-600 relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 px-6">
      {/* Abstract background shapes placeholders */}
      <div className="absolute top-10 left-10 w-20 h-20 border-[6px] border-secondary-300 rounded-full opacity-80 animate-pulse"></div>
      <div className="absolute top-1/4 right-20 w-16 h-16 bg-white rotate-45 opacity-20"></div>
      <div className="absolute bottom-10 left-20 w-32 h-8 bg-secondary-300 rounded-full rotate-[-15deg] opacity-80"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 border-[6px] border-white rounded-full opacity-30"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6 leading-tight">
          Get Access to Hundreds<br/>Courses Available
        </h1>
        <p className="text-primary-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Unlock your potential with ByteSpace and discover our wide range of courses with experienced mentors.
        </p>
        
        <div className="bg-white p-2 rounded-full flex items-center max-w-xl mx-auto shadow-lg mb-16">
          <div className="pl-4 text-neutral-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Search for course..." 
            className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-neutral-900"
          />
          <button className="bg-secondary-300 hover:bg-secondary-400 text-neutral-950 px-8 py-3 rounded-full font-medium transition-colors">
            Search
          </button>
        </div>
      </div>
      
      {/* Hero Image Area Placeholder */}
      <div className="relative max-w-5xl mx-auto mt-8 flex justify-center">
        <div className="relative z-10">
          <div className="w-64 h-64 md:w-96 md:h-96 bg-primary-400 rounded-full relative flex items-center justify-center overflow-hidden border-8 border-white/10 shadow-2xl">
             <div className="text-white/50 font-medium">Student Image Placeholder</div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 -left-4 md:left-20 bg-white p-4 rounded-xl shadow-xl z-20 flex items-center gap-3 animate-bounce" style={{animationDuration: '3s'}}>
           <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold">W</div>
           <div>
             <p className="text-xs text-neutral-500 font-medium">Web Design</p>
             <p className="text-sm font-bold text-neutral-900">Advance Level</p>
           </div>
        </div>

        <div className="absolute bottom-10 -right-4 md:right-20 bg-white p-4 rounded-xl shadow-xl z-20 text-center animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
           <p className="text-xs text-neutral-500 font-medium mb-1">Photography</p>
           <p className="text-2xl font-bold text-neutral-900">55%</p>
           <p className="text-xs text-secondary-600 font-medium">Discount</p>
        </div>
      </div>
    </section>
  );
}
