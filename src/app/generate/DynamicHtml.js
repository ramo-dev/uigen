import React from 'react';

const DynamicComponent = ({ generatedCode }) => {
  return (
    <div className="max-w-3xl mx-auto p-8 h-full bg-white">
      {/* Example of dynamically rendered content */}
      <div className="prose"  dangerouslySetInnerHTML={{ __html: generatedCode }} />
    </div>
  );
};

export default DynamicComponent;
