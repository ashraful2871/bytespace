import Link from 'next/link';
import { Send, Globe, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-secondary-300 p-1.5 rounded-lg">
              <div className="w-5 h-5 bg-primary-950 rounded-sm"></div>
            </div>
            <span className="font-poppins font-bold text-xl text-neutral-950">ByteSpace</span>
          </div>
          <p className="text-neutral-500 mb-6 text-sm">
            Empower yourself with quality education and unlock your true potential.
          </p>
          <div className="flex bg-neutral-50 rounded-full p-1 border border-neutral-200 focus-within:border-primary-500 transition-colors">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-transparent border-none outline-none px-4 py-2 text-sm w-full"
            />
            <button className="bg-secondary-300 hover:bg-secondary-400 text-neutral-950 px-4 py-2 rounded-full transition-colors flex items-center justify-center">
              <Send size={16} />
            </button>
          </div>
          <p className="text-xs text-neutral-400 mt-2">Subscribe to our newsletter for updates.</p>
        </div>

        <div>
          <h4 className="font-poppins font-bold text-neutral-950 mb-4">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-neutral-500 text-sm">
            <li><Link href="#" className="hover:text-primary-500">About Us</Link></li>
            <li><Link href="#" className="hover:text-primary-500">Popular Courses</Link></li>
            <li><Link href="#" className="hover:text-primary-500">Our Events</Link></li>
            <li><Link href="#" className="hover:text-primary-500">Tutors</Link></li>
            <li><Link href="#" className="hover:text-primary-500">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-poppins font-bold text-neutral-950 mb-4">Useful Links</h4>
          <ul className="flex flex-col gap-3 text-neutral-500 text-sm">
            <li><Link href="#" className="hover:text-primary-500">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-primary-500">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-primary-500">Refund Policy</Link></li>
            <li><Link href="#" className="hover:text-primary-500">Help Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-poppins font-bold text-neutral-950 mb-4">Contact Us</h4>
          <ul className="flex flex-col gap-3 text-neutral-500 text-sm mb-6">
            <li className="flex items-center gap-2"><Phone size={14} /> +880 123 456 7890</li>
            <li className="flex items-center gap-2"><Mail size={14} /> support@bytespace.com</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> Dhaka, Bangladesh</li>
          </ul>
          <div className="flex gap-4">
            <Link href="#" className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-600 hover:bg-primary-500 hover:text-white transition-colors"><Globe size={16} /></Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto border-t border-neutral-200 pt-6 flex flex-col md:flex-row items-center justify-between text-neutral-400 text-sm">
        <p>&copy; {new Date().getFullYear()} ByteSpace. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-primary-500">Privacy Policy</Link>
          <Link href="#" className="hover:text-primary-500">Terms of Service</Link>
          <Link href="#" className="hover:text-primary-500">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
}
