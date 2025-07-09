import React, { useState } from 'react';
import templates from './templates.json';
import './index.css';

function App() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [userData, setUserData] = useState({
    name: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    logo: ''
  });
  const [generatedHtml, setGeneratedHtml] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const generateSignature = () => {
    let html = selectedTemplate.html;
    Object.keys(userData).forEach(key => {
      html = html.replaceAll(`{${key}}`, userData[key] || '');
    });
    setGeneratedHtml(html);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-lg w-full space-y-4">
        <h1 className="text-xl font-bold text-center">Email Signature Generator</h1>
        <select
          value={selectedTemplate.id}
          onChange={e => setSelectedTemplate(templates.find(t => t.id === e.target.value))}
          className="w-full p-2 border border-gray-300 rounded"
        >
          {templates.map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        {['name', 'title', 'company', 'phone', 'email', 'logo'].map(field => (
          <input
            key={field}
            name={field}
            value={userData[field]}
            onChange={handleInputChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ))}
        <button
          onClick={generateSignature}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Generate Signature
        </button>
        {generatedHtml && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <div dangerouslySetInnerHTML={{ __html: generatedHtml }} />
            <button
              onClick={() => navigator.clipboard.writeText(generatedHtml)}
              className="mt-2 w-full bg-green-600 hover:bg-green-700 text-white py-1 rounded"
            >
              Copy HTML
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
