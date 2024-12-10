"use client"
import React, { useState } from 'react';
import Modal from 'react-modal';
import Header from '../components/header';

Modal.setAppElement('body'); // Set the app element for accessibility

export default function News() {
  const images = [
    '/images/155_6242_o_1i7t5v93guia19hk5v31ieb1hlv23.jpg',
    '/images/156_6242_o_1i7t4bkiqjcr1du817ml1d3fkbm23.jpg',
    '/images/157_6242_o_1i7t64f7616erso137nchj1qo32d.jpg',
    '/images/158_6242_o_1i7t54losse01pa5agu12lqvrm23.jpg',
    '/images/159_6242_o_1i7t637um1egaa2mlkdck1u2c23.jpg',
    '/images/189_6242_o_1hv7dobj41i8mcuo1vgo1igpbok36.jpg',
    '/images/190_6242_o_1i7t67rqffkeffv6pm1tka4kq23.jpg',
    '/images/191_6242_o_1i7t4o5il1992mfq9ao17qs30923.jpg'
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage('');
  };

  return (
    <main className='bg-slate-200 min-h-screen w-screen p-4'>
      <Header />
      <h1 className="text-center mt-14 font-bold text-slate-700 text-2xl">A New Addition to the Gundam Series! Mobile Suit Gundam GQuuuuuuX</h1>
      <div className="flex justify-center mt-8">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/LnMIaFV4q6M"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="text-center mt-8">
        <h2 className="font-bold text-slate-700 text-xl">khara x SUNRISE, a crossing of dreams</h2>
        <p className="mt-4 text-slate-700 ">
          Prior to the airing of TV series, theatrical version using re-edited episodes…<br />
          <strong>“Mobile Suit Gundam GQuuuuuuX -Beginning-"</strong><br />
          Coming to theaters in Japan, January 17th!
        </p>
        <p className="mt-4 text-slate-700">
          Please look forward to overseas release information!<br />
          Official Website: <a href="https://en.gundam.info/about-gundam/series-pages/gquuuuuux/" className="text-blue-500 underline">https://en.gundam.info/about-gundam/series-pages/gquuuuuux/</a>
        </p>
      </div>
      <img src='/images/img_kv_en.jpg' alt='GQuuuuuuX' className='w-2/3 h-1/3 mx-auto mt-8 object-cover' />
      <hr className='border-t-2 border-slate-700 mt-16 mb-16 w-full mx-auto' />
      <img src='/images/gunpla_2.jpg' alt='Gunpla' className='w-1/2 h-1/3 mx-auto mt-8 object-cover' />
      <div className="w-1/2 mx-auto text-center mt-8">
        <h2 className="font-bold text-slate-700 text-xl">RG 1/144 Akatsuki Gundam Oowashi Unit</h2>
        <p className="mt-4 text-slate-700">
          Going on sale on Saturday, December 14, 2024 / 8,800 JPY (tax incl.)
        </p>
        <p className="mt-4 text-slate-700 text-left">
          The Akatsuki Gundam equipped with the Oowashi Unit from Mobile Suit Gundam SEED DESTINY is now available as an RG plastic model kit applied with three types of gold plating. The multi-faceted shapes of the Gundam’s design accentuate the gleaming surface of the body, and the angles of reflections have been adjusted to express its shimmering Yata no Kagami coating. The Oowashi's nose, hatch, and beam cannon can be deployed, and its wings can be moved flexibly to recreate the state where the unit is attached to the Mobile Suit’s body.
        </p>
        <p className="mt-4 text-slate-700 text-left">
          Certain sections of the RG Strike Gundam’s frame parts have been incorporated to achieve the same level of articulation. The range of articulation in the shoulders can be expanded thanks to pull-out mechanisms, and the hip joints can be opened widely to enable bold poses. The torso has swinging parts and the arm/leg armor parts have linked sliding gimmicks, allowing them to be moved to positions that suit various poses, and the verniers on the top of the shoulders and sides of the legs can also be moved.
        </p>
        <p className="mt-4 text-slate-700 text-left">
          Furthermore, the included Realistic Decals can be used to reproduce the markings throughout the MS. The kit is compatible with the HG Destiny Gundam Spec II & Zeus Silhouette (sold separately), and the Zeus Silhouette can be attached.
        </p>
        <p className="mt-4 text-slate-700 text-left">
          *To attach the Zeus Silhouette, the HG Zeus Silhouette Connector Parts included with the RG Akatsuki Gundam Shiranui Pack & HG Zeus Silhouette Connector Parts (sold separately/Premium Bandai Hobby Online Shop item) are required.
        </p>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-8 w-2/3 mx-auto">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery image ${index + 1}`}
            className="w-full h-32 object-cover rounded-lg cursor-pointer"
            onClick={() => openModal(src)}
          />
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        onClick={closeModal} 
      >
        <div className="relative w-1/2 h-auto">
          <button onClick={closeModal} className="absolute top-0 right-0 text-white text-2xl">&times;</button>
          {selectedImage && <img src={selectedImage} alt="Selected" className="w-full h-full object-cover" />}
        </div>
      </Modal>
    </main>
  );
}