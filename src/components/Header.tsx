import Link from 'next/link';
import { Search, ChevronDown, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-primary-600 text-white py-4 px-6 md:px-12 lg:px-24 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-secondary-300 p-1.5 rounded-lg">
          <div className="w-5 h-5 bg-primary-950 rounded-sm"></div>
        </div>
        <span className="font-poppins font-bold text-xl">ByteSpace</span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="hover:text-secondary-300 font-medium">Home</Link>
        <div className="flex items-center gap-1 cursor-pointer hover:text-secondary-300">
          <span className="font-medium">Courses</span>
          <ChevronDown size={16} />
        </div>
        <Link href="/contact" className="hover:text-secondary-300 font-medium">Contact</Link>
      </nav>

      <div className="flex items-center gap-4">
        <button className="hidden md:block font-medium hover:text-secondary-300">Sign in</button>
        <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2">
           <User size={18} />
           Log In
        </button>
      </div>
    </header>
  );
}
