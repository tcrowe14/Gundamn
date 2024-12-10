import Header from '../components/header';

export default function Guides() {
  return (
    <main className="bg-gray-900 min-h-screen text-white">
      <Header />
      <div className="container mx-auto p-4">
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6">Guides</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Beginners Guides</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="http://goodguydangunpla.blogspot.com/2013/08/building-for-beginners-tips-and-tricks.html" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Building for Beginners: Tips and Tricks
                </a>
              </li>
              <li>
                <a href="http://fichtenfoo.net/blog/how-to-build-master-grade-gundams" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  How to Build Master Grade Gundams
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Video Series</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="https://www.youtube.com/playlist?list=PLvnEQkHrG2KYwY_7PgdP0JP311s4YFx28" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                GhostofZeon Tutorials
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/playlist?list=PLCdup8DSCfy94zI6K-kO494-8Owf_MamL" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Zakuaurelius&#39; Tutorials
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/playlist?list=PL51B1F31506B36522" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Mokanaman&#39;s Gundam/Mech Model Workshop
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Panel Lining</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="http://otakurevolution.com/content/laymans-gunpla-guide-detail-line-tutorial" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Laymans Detail Line Tutorial
                </a>
              </li>
              <li>
                <a href="https://gunbies.com/how-tos-tips-and-tricks-tutorials/gunpla-panel-lining-tutorial/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Gunpla Panel Lining Tutorial
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Kitbashing</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="http://bandai-hobby.net/site/gunpla_buildfighters_customize.html" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Bandai BuildFighters Customization
                </a>
              </li>
              <li>
                <a href="http://bandai-hobby.net/tekketsu/custom.html" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Bandai Tekketsu Custom
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Repairs and Fixes</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="http://dqfg.blogspot.com/2014/11/how-to-recreate-missing-or-broken-part.html" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Recreate Missing or Broken Part
                </a>
              </li>
              <li>
                <a href="http://dqfg.blogspot.com/2013/07/how-to-tighten-loose-peg.html" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Tighten Loose Pegs
                </a>
              </li>
              <li>
                <a href="http://dqfg.blogspot.com/2014/12/how-to-fix-peg-on-action-base.html" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Fix Pegs on Action Base
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">LED Modding</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <a href="http://gunplaisfun.blogspot.com/2014/04/led-mods.html" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                LED Mods for Gunpla
                </a>
              </li>
              <li>
                <a href="https://imgur.com/a/sinanju-led-wip-tutorial-thingy-MioMy" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Sinaju LED Tutorial
                </a>
              </li>
              <li>
                <a href="http://mxgs.blogspot.com/2010/04/matxs-guide-to-led-mods.html" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Matxs Guide to LED Mods
                </a>
              </li>
            </ul>
          </section>
          
        </div>
      </div>
    </main>
  );
}