import React, { useState, useCallback, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Upload, X } from 'lucide-react';

export default function PosterForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    departmentName: '',
    inAssociation: false,
    cellLogos: [],
    eventTitle: '',
    eventType: '',
    speakerPhoto: '',
    speakerName: '',
    speakerDesignation: '',
    isMultipleDates: false,
    dates: [new Date()],
    time: '',
    location: '',
    registrationLink: '',
    ...initialData
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = useCallback((field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      onSubmit(newData);
      return newData;
    });
  }, [onSubmit]);

  const handleLogoUpload = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    )
      .then((logoUrls) => {
        handleChange('cellLogos', [...formData.cellLogos, ...logoUrls]);
      })
      .catch((error) => {
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

  const removeLogo = useCallback(
    (index) => {
      handleChange('cellLogos', formData.cellLogos.filter((_, i) => i !== index));
    },
    [formData.cellLogos, handleChange]
  );

  const handleDateChange = useCallback(
    (index, date) => {
      const newDates = [...formData.dates];
      newDates[index] = date;
      handleChange('dates', newDates);
    },
    [formData.dates, handleChange]
  );

  const addDateField = useCallback(() => {
    handleChange('dates', [...formData.dates, new Date()]);
  }, [formData.dates, handleChange]);

  const removeDateField = useCallback(
    (index) => {
      handleChange('dates', formData.dates.filter((_, i) => i !== index));
    },
    [formData.dates, handleChange]
  );

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

      <div className="flex items-center space-x-4">
        <label className="block text-sm font-medium text-gray-700">In Association With</label>
        <input
          type="checkbox"
          checked={formData.inAssociation}
          onChange={(e) => handleChange('inAssociation', e.target.checked)}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
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
          <option value="Training">Training</option>
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
        <label className="block text-sm font-medium text-gray-700">Event Dates</label>
        <div className="mt-1">
          <label className="inline-flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              checked={formData.isMultipleDates}
              onChange={(e) => handleChange('isMultipleDates', e.target.checked)}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 mr-2"
            />
            Is this a multi-day event?
          </label>
          {formData.isMultipleDates ? (
            <div className="space-y-2 mt-2">
              {formData.dates.map((date, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <DatePicker
                    selected={date}
                    onChange={(newDate) => handleDateChange(index, newDate)}
                    dateFormat="dd/MM/yyyy"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                  {formData.dates.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDateField(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addDateField}
                className="text-indigo-500 hover:text-indigo-700 mt-2"
              >
                + Add another date
              </button>
            </div>
          ) : (
            <DatePicker
              selected={formData.dates[0]}
              onChange={(date) => handleChange('dates', [date])}
              dateFormat="dd/MM/yyyy"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Event Time</label>
        <input
          type="time"
          value={formData.time}
          onChange={(e) => handleChange('time', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
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
