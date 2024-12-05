import Header from '../components/header';

const teamMembers = [
  {
    name: 'Taylor Crowe',
    bio: 'Taylor has worked in the technical communications field for 14 years as a foreman at a large electrical contractor in Calgary. During this period, he has been a part of several premier projects including The Bow, Brookfield Place, IOL South Campus, and Equinix Data Centers. With expertise in new construction, retrofits, re-stacks, and troubleshooting he is versatile in all aspects of network deployment. Fluent in traditional wired networks and emerging wireless technologies such as DAS and 5G. Recently Taylor lead the BMO Convention Center expansion, Western Canada’s largest facility. Previously Taylor worked in logistics giving him insight into supply chain management and back-end processes.',
    img: '/images/Taylor.jpg'
  },
  {
    name: 'Dallas Huppie',
    bio: 'Dallas is a Journeyman electrician who has worked in this field for 7 years. Recently he decided to change careers and enter the software development field due to his passion for technology. He spent most of his career doing service work, which gave him a solid foundation of skills like Troubleshooting, Critical thinking, and teamwork. Dallas is entering his second year at SAIT studying software development program where he has learned multiple programming languages and growing his understanding of complex systems. His prior experience combined with the added education learned at SAIT will make him a powerful and impactful asset to any team.',
    img: '/images/Dallas.jpg'
  },
  {
    name: 'Kris Senger',
    bio: 'Kris has background in IT services, ranging from help desk, network support, to server and data center administration positions held over the last 10+ years. Entering his 2nd year of studies, he is gaining a more fundamental knowledge of programming languages and enjoying the challenge of learning different languages and the overall syntax differences. He has previous experience working with teams and leading small groups in the IT field and working on large scale projects such as PCI compliance in the industry.',
    img: '/images/Kris.jpg'
  },
  {
    name: 'Abduallah Shaklaoon',
    bio: 'The education Abduallah has that is relevant to the field of software development is a few courses in computer science at the University of Calgary. Abduallah has had work experience involving software on the IT side, he had to establish programs and set up software for various users at his workplace. Abduallah is skilled in various programming languages due in part to his prior education and practice. He is good at organizing and planning different chunks of projects so that they may be completed in a timely manner.',
    img: '/images/Abduallah.jpg'
  }
];

export default function About() {
  return (
    <main className='bg-slate-200 min-h-screen w-screen p-4'>
      <Header />
      <h1 className="text-center mt-14 font-bold text-slate-700 text-2xl">About us!</h1>
      <div className='mt-8 mx-auto max-w-4xl'>
        <p className="text-left mt-4 leading-relaxed">
          At Gundam!, we are more than just a community of Gundam enthusiasts—we are a passionate collective that celebrates the art, craftsmanship, and the deep lore that makes Gundam a global phenomenon. Founded by a team of die-hard fans, our journey started with a simple love for model kits, but it quickly evolved into something much more. From the first snap-together Gundam kit to the intricate, highly detailed custom builds, we discovered a shared sense of creativity and camaraderie among hobbyists. Our platform was born out of this passion: to bring Gundam lovers together, provide the finest models, tools, and accessories, and create a space where fans can learn, share, and build together. Whether you're just starting your first kit or you're a seasoned veteran building masterful, unique creations, we're here to help you make every build a memorable experience.
        </p>
      </div>
      <h2 className="text-center mt-14 font-bold text-slate-700 text-2xl">Our Mission</h2>
      <div className='mt-8 mx-auto max-w-4xl'>
        <p className="text-left mt-4 leading-relaxed">
          Our mission is to provide the best Gundam models, tools, and resources to hobbyists around the world while nurturing a culture of creativity, craftsmanship, and collaboration. We strive to offer high-quality products, expert advice, and a community platform where every builder feels empowered to bring their Gundam dreams to life. Whether you're building for the first time or adding to your collection, we are dedicated to helping you make the most of your Gundam journey.
        </p>
      </div>
      <h2 className="text-center mt-14 font-bold text-slate-700 text-2xl">Meet the team</h2>
      <div className='mt-14 mx-auto max-w-4xl'>
        {teamMembers.map((member, index) => (
          <div key={index} className='grid grid-cols-3 gap-10 items-center mt-8'>
            <div className='aspect-w-1 aspect-h-1 mr-10'>
              <img src={member.img} alt={member.name} className='w-full h-full rounded-2xl' />
            </div>
            <div className='col-span-2'>
              <h3 className='font-bold text-slate-700'>{member.name}</h3>
              <p className='text-left mt-2'>{member.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}