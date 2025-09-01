import Link from 'next/link';
import { HiCode, HiArrowLeft } from 'react-icons/hi';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-emerald-600 rounded-lg flex items-center justify-center mx-auto mb-6">
          <HiCode className="text-white text-2xl" />
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-xl font-semibold text-slate-700 mb-4">Page Not Found</h2>
        <p className="text-slate-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to building amazing websites.
        </p>
        
        <Link 
          href="/" 
          className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          <HiArrowLeft className="text-lg" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
