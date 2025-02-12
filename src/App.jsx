import React, { useState, useCallback } from 'react';
import { toCanvas } from 'html-to-image';
import PosterForm from './components/PosterForm';
import PosterPreview from './components/PosterPreview';
import { Download } from 'lucide-react';

function App() {
  const [posterData, setPosterData] = useState({
    departmentName: '',
    cellLogos: [],
    eventTitle: '',
    speakerPhoto: '',
    speakerName: '',
    speakerDesignation: '',
    date: new Date(),
    time: '',
    location: '',
    registrationLink: '',
  });

  const downloadPoster = useCallback(async () => {
    const poster = document.getElementById('poster-a4');
    if (poster) {
      try {
        const canvas = await toCanvas(poster, {
          width: 2480, // A4 width in pixels (300 DPI)
          height: 3508, // A4 height in pixels (300 DPI)
          backgroundColor: '#ffffff', // White background
        });

        const link = document.createElement('a');
        link.download = `event-poster-${new Date().toISOString().split('T')[0]}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error('Error generating poster:', error);
        alert('Failed to generate poster. Please try again.');
      }
    } else {
      alert('Poster element not found.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Event Poster Generator for SMVITM</h1>
        <a href="https://github.com/sumedhnvda/posterlab">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#800020] hover:bg-[#600018] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#800020] transition-colors duration-200">
            Github
          </button>
        </a>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <PosterForm onSubmit={setPosterData} initialData={posterData} />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-end mb-4">
              <button
                onClick={downloadPoster}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#800020] hover:bg-[#600018] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#800020] transition-colors duration-200"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Poster
              </button>
            </div>
            <div className="flex justify-center items-center overflow-hidden">
              <div
                id="poster-a4"
                className="relative bg-white"
                style={{
                  width: '210mm',
                  height: '297mm',
                  padding: '20px', // Adjust for margins if needed
                }}
              >
                <PosterPreview data={posterData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
