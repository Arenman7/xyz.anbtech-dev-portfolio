import { Link, useParams, useNavigate } from 'react-router-dom';
import { iOSApps } from '../data/iOSApps';
import { ExternalLink, ArrowLeft, Mail } from 'lucide-react';
import { useEffect, useState, useRef, useCallback } from 'react';
import { iOSPrivacyPolicies } from '../data/iOSPrivacyPolicies';
import { getAppScreenshots } from '../data/appScreenshots';
import Logo from './Logo';

const AUTO_ADVANCE_MS = 6000;

const IOSAppDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const app = iOSApps.find((a) => a.id === id);
  const hasPrivacyPolicy = iOSPrivacyPolicies.some((p) => p.id === id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const screenshots = getAppScreenshots(id || '');
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    startTimeRef.current = Date.now();
    setProgress(0);

    const tick = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const pct = Math.min(elapsed / AUTO_ADVANCE_MS, 1);
      setProgress(pct);
      if (pct >= 1) {
        setCurrentImageIndex((i) =>
          i === screenshots.length - 1 ? 0 : i + 1
        );
      } else {
        timerRef.current = requestAnimationFrame(tick);
      }
    };
    timerRef.current = requestAnimationFrame(tick);
  }, [screenshots.length]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [currentImageIndex, resetTimer]);

  const goTo = (index: number) => setCurrentImageIndex(index);
  const goPrev = () =>
    setCurrentImageIndex((i) => (i === 0 ? screenshots.length - 1 : i - 1));
  const goNext = () =>
    setCurrentImageIndex((i) => (i === screenshots.length - 1 ? 0 : i + 1));

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black font-mono">
        <p className="text-zinc-500">app not found</p>
      </div>
    );
  }

  // SVG circular progress indicator
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="min-h-screen bg-black text-zinc-300 font-mono">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          >
            <Logo />
          </a>
          <div className="flex gap-6 text-sm">
            {hasPrivacyPolicy && (
              <Link
                to={`/ios-apps/${id}/privacy-policy`}
                className="text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                [privacy]
              </Link>
            )}
            <a
              href="mailto:support@anbtech.xyz"
              className="text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              [support]
            </a>
          </div>
        </div>
      </header>

      {/* Hero: banner image + app info side by side */}
      <section className="bg-zinc-950">
        <div className="max-w-4xl mx-auto px-6 pt-6 pb-2">
          <button
            onClick={() => navigate('/')}
            className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm flex items-center gap-2 mb-6"
          >
            <ArrowLeft size={14} />
            back
          </button>
        </div>
        <div className="max-w-4xl mx-auto px-6 pb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <img
              src={app.imageUrl}
              alt={app.title}
              className="w-full lg:w-1/2 h-auto object-cover  shrink-0"
            />
            <div className="space-y-5">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">
                {app.title}
              </h1>
              <p className="text-zinc-400 text-sm sm:text-base max-w-xl leading-relaxed">
                {app.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {app.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs text-zinc-500  px-2 py-0.5"
                  >
                    [{tech}]
                  </span>
                ))}
              </div>
              <div className="flex gap-3 pt-1">
                {app.appStoreLink && (
                  <a
                    href={app.appStoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-zinc-700 text-sm text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
                  >
                    App Store
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots */}
      <section className="bg-black py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Current screenshot */}
            <div className="flex-1 flex items-end justify-center">
              <img
                src={screenshots[currentImageIndex]?.image}
                alt={screenshots[currentImageIndex]?.title}
                className="max-h-[500px] w-auto object-contain "
              />
            </div>

            {/* Info + navigation — bottom aligned */}
            <div className="lg:w-72 flex flex-col justify-end">
              <div className="mb-6">
                <h3 className="text-white font-bold mb-2">
                  {screenshots[currentImageIndex]?.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                  {screenshots[currentImageIndex]?.description}
                </p>
              </div>

              <div>
                <div className="flex gap-1 mb-4">
                  {screenshots.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goTo(index)}
                      className={`h-1 flex-1 transition-colors ${
                        index === currentImageIndex
                          ? 'bg-zinc-400'
                          : 'bg-zinc-800 hover:bg-zinc-700'
                      }`}
                      aria-label={`Screenshot ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <button
                    onClick={goPrev}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    &larr; prev
                  </button>
                  <span className="text-zinc-700">
                    {currentImageIndex + 1}/{screenshots.length}
                  </span>
                  <button
                    onClick={goNext}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    next &rarr;
                  </button>
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    className="ml-1 -rotate-90"
                  >
                    <circle
                      cx="11"
                      cy="11"
                      r={radius}
                      fill="none"
                      stroke="#27272a"
                      strokeWidth="2"
                    />
                    <circle
                      cx="11"
                      cy="11"
                      r={radius}
                      fill="none"
                      stroke="#a1a1aa"
                      strokeWidth="2"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-zinc-950 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm text-zinc-500 mb-8">
&gt; features
          </h2>

          <div className="space-y-1">
            {app.features.map((feature, index) => (
              <div
                key={index}
                className="border-l-2 border-zinc-800 pl-4 py-3"
              >
                <h3 className="text-white text-sm font-bold">{feature.header}</h3>
                <p className="text-zinc-500 text-sm mt-1">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-black py-8 px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-600">
          <Logo className="text-sm" />
          <a
            href="mailto:support@anbtech.xyz"
            className="flex items-center gap-2 text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <Mail size={14} />
            support@anbtech.xyz
          </a>
        </div>
      </footer>
    </div>
  );
};

export default IOSAppDetails;
