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
    dates,
    time,
    registrationLink,
    eventType,
  } = data;

  return (
    <div
      style={{
        width: '210mm',
        height: '297mm',
        margin: '0 auto',
        position: 'relative',
        fontFamily: "'Roboto', sans-serif",
        background: '#fff',
        border: '1px solid #ddd',
        padding: '10mm',
      }}
      id="poster"
    >
     {/* Header */}
<div
  style={{
    backgroundColor: '#800020',
    height: '100px', // Adjust height to accommodate the additional line
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
  }}
>
  <div style={{ textAlign: 'center', flex: 1 }}>
    <h1
      style={{
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: "'Coveas', sans-serif",
        margin: 0,
      }}
    >
      SHRI MADHWA VADIRAJA INSTITUTE
    </h1>
    <p
      style={{
        fontSize: '16px',
        fontFamily: "'Open Sans', sans-serif",
        margin: 0,
      }}
    >
      OF TECHNOLOGY AND MANAGEMENT
    </p>
    <p
      style={{
        fontSize: '12px', // Smaller size for the additional line
        fontFamily: "'Open Sans', sans-serif",
        margin: 0,
        marginTop: '4px', // Add slight spacing
      }}
    >
      A Unit of Shri Sode Vadiraja Mutt Education Trust®, Udupi.
    </p>
  </div>
  <img
    src="smvitm-college-logo.png"
    alt="SMVITM Logo"
    style={{ width: '30mm', height: '30mm', objectFit: 'contain' }}
    loading="eager"
  />
</div>


      {/* Main Content */}
      <div className="mt-8 px-8">
        {departmentName && (
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center',
              fontFamily: "'Coveas', sans-serif",
            }}
          >
            {departmentName}
          </h2>
        )}
        {cellLogos?.length > 0 && (
          <>
            <h3
              style={{
                fontSize: '20px',
                textAlign: 'center',
                marginTop: '16px',
                fontFamily: "'Roboto', sans-serif",
              }}
            >
              In Association With
            </h3>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '16px',
                marginTop: '16px',
                flexWrap: 'wrap',
              }}
            >
              {cellLogos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Cell Logo ${index + 1}`}
                  style={{ height: '50px', objectFit: 'contain' }}
                  loading="eager"
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Event Details */}
      <div className="mt-12 text-center px-8">
        {eventType && (
          <>
            <h3 style={{ fontSize: '20px', fontFamily: "'Open Sans', sans-serif" }}>
              Organizing a {eventType}
            </h3>
            <h3 style={{ fontSize: '20px', marginTop: '8px', fontFamily: "'Open Sans', sans-serif" }}>
              on
            </h3>
          </>
        )}
        {eventTitle && (
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#800020',
              marginTop: '16px',
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {eventTitle}
          </h2>
        )}
      </div>

      {/* Speaker Details */}
      <div className="mt-12 text-center px-8">
        <h3 style={{ fontSize: '20px', marginBottom: '16px', fontFamily: "'Open Sans', sans-serif" }}>
          By
        </h3>
        {speakerPhoto && (
          <div className="flex justify-center mb-4">
            <img
              src={speakerPhoto}
              alt={speakerName || 'Speaker'}
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
                borderRadius: '50%',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              }}
              loading="eager"
            />
          </div>
        )}
        {speakerName && (
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              fontFamily: "'Roboto', sans-serif",
            }}
          >
            {speakerName}
          </h2>
        )}
        {speakerDesignation && (
          <p
            style={{
              fontSize: '20px',
              color: '#800020',
              marginTop: '8px',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            {speakerDesignation}
          </p>
        )}
      </div>

{/* Location and Dates */}
<div className="mt-12 text-center px-8">
  {location && (
    <>
      <p style={{ fontSize: '20px', fontFamily: "'Open Sans', sans-serif" }}>To be held in</p>
      <p
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginTop: '8px',
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        {location}
      </p>
    </>
  )}
  {dates?.length > 0 && (
    <>
      <p style={{ fontSize: '20px', marginTop: '16px', fontFamily: "'Open Sans', sans-serif" }}>
        on
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0' }}>
        {dates.map((date, index) => (
          <li
            key={index}
            style={{
              fontSize: '20px',
              fontFamily: "'Roboto', sans-serif",
              marginTop: '4px',
            }}
          >
            {new Date(date).toLocaleDateString()}
            {index === dates.length - 1 && time && ` at ${time}`}
          </li>
        ))}
      </ul>
    </>
  )}
</div>


      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0">
        <p
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#800020',
            textAlign: 'center',
            marginBottom: '16px',
            fontFamily: "'Roboto', sans-serif",
          }}
        >
          ALL ARE CORDIALLY INVITED
        </p>
        {registrationLink && (
          <div
            style={{
              position: 'absolute',
              bottom: '80px',
              right: '16px',
            }}
          >
            <QRCode
              value={registrationLink}
              size={120}
              level="H"
              style={{ backgroundColor: 'white', padding: '8px' }}
            />
            <p
              style={{
                fontSize: '12px',
                marginTop: '8px',
                textAlign: 'center',
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              Scan to Register
            </p>
          </div>
        )}
        <div
          style={{
            backgroundColor: '#800020',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p
            style={{
              color: 'white',
              fontSize: '18px',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            SMVITM - Engineering your Career and Character with Care
          </p>
        </div>
      </div>
    </div>
  );
}
