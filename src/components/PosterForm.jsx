import React, { useState, useCallback, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Upload, X } from 'lucide-react';

export default function PosterForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
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
    ...initialData
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      onSubmit(newData);
      return newData;
    });
  }, [onSubmit]);

  const handleLogoUpload = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    Promise.all(
      files.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }))
    ).then(logoUrls => {
      handleChange('cellLogos', [...formData.cellLogos, ...logoUrls]);
    }).catch(error => {
      console.error('Error uploading logos:', error);
      alert('Failed to upload logos. Please try again.');
    });
  }, [formData.cellLogos, handleChange]);

  const handlePhotoUpload = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('speakerPhoto', reader.result);
      };
      reader.onerror = () => {
        alert('Failed to upload photo. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  }, [handleChange]);

  const removeLogo = useCallback((index) => {
    handleChange('cellLogos', formData.cellLogos.filter((_, i) => i !== index));
  }, [formData.cellLogos, handleChange]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Department Name</label>
        <input
          type="text"
          value={formData.departmentName}
          onChange={(e) => handleChange('departmentName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cell Logos</label>
        <div className="mt-1 flex flex-wrap items-center gap-4">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="h-5 w-5 mr-2" />
            Add Logo
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleLogoUpload}
              multiple
            />
          </label>
          {formData.cellLogos.map((logo, index) => (
            <div key={index} className="relative group">
              <img 
                src={logo} 
                alt={`Logo ${index + 1}`} 
                className="h-12 w-12 object-contain rounded shadow-md" 
              />
              <button
                type="button"
                onClick={() => removeLogo(index)}
                className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 hidden group-hover:block transition-opacity duration-200"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Event Type</label>
        <select
          value={formData.eventType}
          onChange={(e) => handleChange('eventType', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="">Select Event Type</option>
          <option value="Session">Session</option>
          <option value="Talk">Talk</option>
          <option value="Workshop">Workshop</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Title</label>
        <input
          type="text"
          value={formData.eventTitle}
          onChange={(e) => handleChange('eventTitle', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Speaker Photo</label>
        <div className="mt-1 flex items-center space-x-4">
          <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Upload className="h-5 w-5 mr-2" />
            Upload Photo
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handlePhotoUpload}
            />
          </label>
          {formData.speakerPhoto ? (
            <img 
              src={formData.speakerPhoto} 
              alt="Speaker" 
              className="h-24 w-24 object-cover rounded shadow-md" 
            />
          ) : (
            <span className="text-sm text-gray-500">No photo uploaded</span>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Speaker Name</label>
        <input
          type="text"
          value={formData.speakerName}
          onChange={(e) => handleChange('speakerName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Speaker Designation</label>
        <input
          type="text"
          value={formData.speakerDesignation}
          onChange={(e) => handleChange('speakerDesignation', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => handleChange('date', date)}
            dateFormat="dd/MM/yyyy"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input
            onChange={(e) => handleChange('time', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Location</label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Registration Link (Optional)</label>
        <input
          type="url"
          value={formData.registrationLink}
          onChange={(e) => handleChange('registrationLink', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="https://example.com/register"
        />
      </div>
    </form>
  );
}