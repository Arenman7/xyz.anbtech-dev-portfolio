import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { iOSApps } from '../data/iOSApps';
import { iOSPrivacyPolicies } from '../data/iOSPrivacyPolicies';
import ReactMarkdown from 'react-markdown';

export default function PrivacyPolicy() {
  const { id } = useParams<{ id: string }>();
  const app = iOSApps.find((app) => app.id === id);
  const privacyPolicy = iOSPrivacyPolicies.find((policy) => policy.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <p className="text-2xl text-white">App not found</p>
      </div>
    );
  }

  if (!privacyPolicy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <p className="text-2xl text-white">Privacy Policy not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-sm w-full">
        <div className="container mx-auto px-4 py-6">
          <Link
            to={`/ios-apps/${id}`}
            className="inline-flex items-center text-zinc-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to {app.title}
          </Link>
        </div>
      </header>

      <motion.main
        className="container mx-auto px-4 py-12 text-zinc-200 max-w-3xl prose prose-invert prose-zinc"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ReactMarkdown>{privacyPolicy.content}</ReactMarkdown>
      </motion.main>
    </div>
  );
}
