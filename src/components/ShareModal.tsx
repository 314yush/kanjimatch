import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareText: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareText }) => {
  if (!isOpen) return null;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareText)
      .then(() => alert('Copied to clipboard!')) // Replace with a more polished notification later
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
        <h3 className="text-lg font-semibold mb-4 text-center">Share Your Results!</h3>
        <pre className="bg-gray-100 p-3 rounded whitespace-pre-wrap text-sm overflow-x-auto mb-4">
          {shareText}
        </pre>
        <div className="flex justify-between">
          <button 
            onClick={copyToClipboard}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Copy to Clipboard
          </button>
          <button 
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal; 