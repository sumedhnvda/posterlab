import React from 'react';
import QRCode from 'react-qr-code';

export default function PosterPreview({ data }) {
  const {
    departmentName,
    cellLogos,
    eventTitle,
    speakerName,
    speakerPhoto,
    speakerDesignation,
    location,
    date,
    time,
    registrationLink,
  } = data;

  return (
    <div className="w-[794px] h-[1123px] relative mx-auto overflow-hidden" id="poster">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('https://media.licdn.com/dms/image/v2/C561BAQEPwPL0FtzJ9w/company-background_10000/company-background_10000/0/1595394497735/shri_madhwa_vadiraja_institute_of_technology_and_management_cover?e=2147483647&v=beta&t=iCbNHWzzqUYBBb34B6wEAK8RrywNWvrKIqz9-oxprVk')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.1, // Faded watermark effect
          zIndex: -1,
          borderRadius: '50%', // Make the image round
          height: '900px', // Set the desired height
          width: '700px', // Set the width to be equal to height
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)', // Center the image
        }}
      />
      
      <div className="bg-[#800020] h-[80px] flex items-center justify-between px-8">
        <div className="flex-grow text-center">
          <h1 className="text-md font-bold text-white">
            SHRI MADHWA VADIRAJA INSTITUTE OF TECHNOLOGY AND MANAGEMENT
          </h1>
          <p className="text-white text-sm">
            A Unit of Shri Sode Vadiraja Mutt Educational Trust, Udupi.
          </p>
        </div>
        <img
          src="smvitm-college-logo.png"
          alt="SMVITM Logo"
          className="w-29 h-16"
          loading="eager"
        />
      </div>
      <div className="mt-8 px-8">
        {departmentName && (
          <h2 className="text-2xl font-bold text-center">{departmentName}</h2>
        )}
        {cellLogos?.length > 0 && (
          <>
            <h3 className="text-xl text-center mt-4">In Association with</h3>
            <div className="flex justify-center gap-8 mt-4">
              {cellLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Cell Logo ${index + 1}`}
                  className="h-20 object-contain"
                  loading="eager"
                />
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-12 text-center px-8">
        <h3 className="text-xl">Organizing a Session</h3>
        <h3 className="text-xl mt-2">on</h3>
        {eventTitle && (
          <h2 className="text-4xl font-bold text-[#800020] mt-4 px-4">
            {eventTitle}
          </h2>
        )}
      </div>

      <div className="mt-12 text-center px-8">
        <h3 className="text-xl mb-4">By</h3>
        {speakerPhoto && (
          <div className="flex justify-center mb-4">
            <img
              src={speakerPhoto}
              alt={speakerName || 'Speaker'}
              className="w-40 h-40 object-cover rounded-full shadow-lg"
              loading="eager"
            />
          </div>
        )}
        {speakerName && (
          <h2 className="text-3xl font-bold">{speakerName}</h2>
        )}
        {speakerDesignation && (
          <p className="text-xl text-[#800020] mt-2">{speakerDesignation}</p>
        )}
      </div>

      <div className="mt-12 text-center px-8">
        {location && (
          <>
            <p className="text-xl">To be held in</p>
            <p className="text-2xl font-bold mt-2">{location}</p>
          </>
        )}
        {date && time && (
          <>
            <p className="text-xl mt-4">on</p>
            <p className="text-2xl mt-2">
              {new Date(date).toLocaleDateString()} at {time}
            </p>
          </>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <p className="text-2xl font-bold text-[#800020] text-center mb-6">
          ALL ARE CORDIALLY INVITED
        </p>
        {registrationLink && (
          <div className="absolute bottom-20 right-8">
            <QRCode
              value={registrationLink}
              size={120}
              level="H"
              className="bg-white p-2"
            />
            <p className="text-sm mt-2 text-center">Scan to Register</p>
          </div>
        )}
        <div className="bg-[#800020] h-[60px] flex items-center justify-center">
          <p className="text-white text-lg">
            SMVITM - Engineering your Career and Character with Care
          </p>
        </div>
      </div>
    </div>
  );
}
