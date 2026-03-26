import { Link } from 'react-router-dom';
import { iOSApps } from '../data/iOSApps';

const WorkSection = () => (
  <section id="work" className="py-20 px-6 scroll-mt-16 transition-colors duration-700 bg-zinc-950">
    <div className="max-w-4xl mx-auto">
      <h2 className="text-sm text-zinc-500 mb-8"><span className="text-x">&gt;</span> work</h2>

      <div className="space-y-6">
        {iOSApps.map((app) => (
          <Link
            key={app.id}
            to={`/ios-apps/${app.id}`}
            className="block group border border-zinc-800 hover:border-zinc-600 p-6 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-white font-bold group-hover:text-zinc-100 transition-colors">
                  {app.title}
                </h3>
                <p className="text-zinc-500 text-sm mt-1 max-w-lg">
                  {app.description}
                </p>
              </div>
              <span className="text-zinc-600 text-sm shrink-0">&rarr;</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {app.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-zinc-500 border border-zinc-800 px-2 py-0.5"
                >
                  [{tech}]
                </span>
              ))}
            </div>
          </Link>
        ))}

        <div className="border border-zinc-800/50 border-dashed p-6 text-zinc-700 text-sm">
          <span className="text-zinc-600">mobile game in development</span>
        </div>
      </div>
    </div>
  </section>
);

export default WorkSection;
