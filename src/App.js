import React, { useState, useEffect } from 'react';
import templates from './templates.json';
import './index.css';
import imageLogo from './image.jpg';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Prepopulate with comprehensive virtual data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'TechySaint',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@techysaint.com',
    logo: imageLogo,
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    website: 'https://techysaint.com',
    website_display: 'techysaint.com',
    facebook: 'https://facebook.com/johndoe',
    address: 'Amsterdam, Netherlands',
    company_website: 'https://techysaint.com'
  });

  const [generatedHtml, setGeneratedHtml] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: name === 'logo' && value.trim() === '' ? imageLogo : value
    }));
  };

  const generateSignature = () => {
    if (!selectedTemplate) return;
    let html = selectedTemplate.html;
    Object.keys(userData).forEach(key => {
      html = html.replaceAll(`{${key}}`, userData[key] || '');
    });
    setGeneratedHtml(html);
  };

  useEffect(() => {
    generateSignature();
  }, [selectedTemplate, userData]);

  const openModal = (template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Free Email Signature Generator</h1>
          <h2 className="text-lg font-semibold text-gray-700 mt-1">
            Select one of the templates below to start
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Powered by{' '}
            <a
              href="https://techysaint.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              TechySaint
            </a>
          </p>
        </div>



        {/* Grid displaying all templates with hover CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template) => {
            let previewHtml = template.html;
            Object.keys(userData).forEach(key => {
              previewHtml = previewHtml.replaceAll(`{${key}}`, userData[key] || '');
            });

            return (
              <div
                key={template.id}
                className="relative group cursor-pointer p-3 rounded-lg border border-gray-300 bg-white hover:border-blue-400 transition"
              >
                <div dangerouslySetInnerHTML={{ __html: previewHtml }} />
                <p className="text-center mt-3 text-base font-semibold text-blue-700">
                  {template.name}
                </p>


                {/* Overlay button */}
                <button
                  onClick={() => openModal(template)}
                  className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-semibold text-lg rounded-lg"
                >
                  Use this template
                </button>
              </div>
            );
          })}
        </div>

        {/* Modal for customization */}
        {isModalOpen && selectedTemplate && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative animate-fade-in">
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                aria-label="Close"
              >
                &times;
              </button>

              <h2 className="text-lg font-semibold text-center mb-4">Customize Your Signature</h2>

              {[
                'name', 'title', 'company', 'phone', 'email', 'logo',
                'linkedin', 'twitter', 'website', 'website_display',
                'facebook', 'address', 'company_website'
              ].map(field => (
                <input
                  key={field}
                  name={field}
                  value={field === 'logo' && userData[field] === imageLogo ? '' : userData[field]}
                  onChange={handleInputChange}
                  placeholder={
                    field === 'logo'
                      ? 'Logo URL (optional)'
                      : field === 'website_display'
                        ? 'Website Display Text'
                        : field.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())
                  }
                  className="w-full p-2 border border-gray-300 rounded mb-2"
                />
              ))}

              {generatedHtml && (
                <div className="mt-4 p-4 bg-gray-100 rounded max-h-64 overflow-y-auto">
                  <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedHtml)}
                    className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                  >
                    Copy HTML
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
