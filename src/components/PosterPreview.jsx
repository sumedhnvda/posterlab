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
        overflow: 'hidden', // Ensures no content overflows the poster
      }}
      id="poster"
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: '#800020',
          height: '100px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: 'white',
          padding: '0 16px',
        }}
      >
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h1
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              margin: 0,
              fontFamily: "'Coveas', sans-serif",
            }}
          >
            SHRI MADHWA VADIRAJA INSTITUTE
          </h1>
          <p
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              margin: 0,
              fontFamily: "'Coveas', sans-serif",
            }}
          >
            OF TECHNOLOGY AND MANAGEMENT
          </p>
          <p
            style={{
              fontSize: '12px',
              margin: 0,
              marginTop: '4px',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            A Unit of Shri Sode Vadiraja Mutt Education Trust ®, Udupi.
          </p>
        </div>
        <img
          src="smvitm-college-logo.png"
          alt="SMVITM Logo"
          style={{
            width: '20mm',
            height: '20mm',
            objectFit: 'contain',
          }}
          loading="eager"
        />
      </div>

      {/* Department Section */}
      <div style={{ marginTop: '120px', textAlign: 'center' }}>
        {departmentName && (
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
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
                marginTop: '8px',
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

      {/* Event Details Section */}
      <div style={{ marginTop: '40px', textAlign: 'center', padding: '0 16px' }}>
        {eventType && (
          <h3
            style={{
              fontSize: '20px',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            Organizing a {eventType}
          </h3>
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

      {/* Speaker Details Section */}
      <div style={{ marginTop: '40px', textAlign: 'center', padding: '0 16px' }}>
        {speakerName && (
          <h3 style={{ fontSize: '20px', fontFamily: "'Open Sans', sans-serif" }}>By</h3>
        )}
        {speakerPhoto && (
          <div style={{ marginTop: '16px' }}>
            <img
              src={speakerPhoto}
              alt={speakerName || 'Speaker'}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                objectFit: 'cover',
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
              marginTop: '16px',
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
      <div style={{ marginTop: '40px', textAlign: 'center', padding: '0 16px' }}>
        {location && (
          <p
            style={{
              fontSize: '20px',
              fontFamily: "'Open Sans', sans-serif",
            }}
          >
            To be held in
          </p>
        )}
        {location && (
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
        )}
        {dates?.length > 0 && (
          <>
            <p
              style={{
                fontSize: '20px',
                marginTop: '16px',
                fontFamily: "'Open Sans', sans-serif",
              }}
            >
              on
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginTop: '8px' }}>
              {dates.map((date, index) => (
                <li
                  key={index}
                  style={{
                    fontSize: '20px',
                    fontFamily: "'Roboto', sans-serif",
                    marginTop: '4px',
                  }}
                >{
  new Date(date).toLocaleDateString()
}
{
  index === dates.length - 1 &&
  time &&
  ` at ${new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}`
}

                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ marginTop: '40px', textAlign: 'center', position: 'relative' }}>
        <p
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#800020',
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
            marginTop: '40px',
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
