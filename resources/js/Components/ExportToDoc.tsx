import React, { useRef } from "react";
import htmlDocx from "html-docx-js/dist/html-docx";
import { saveAs } from "file-saver";

const ExportToDoc: React.FC = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (contentRef.current) {
      // Wrap the JSX content in proper HTML structure
      const htmlContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Exported Document</title>
          </head>
          <body>
            ${contentRef.current.innerHTML}
          </body>
        </html>
      `;

      // Convert to DOCX
      const docxBlob = htmlDocx.asBlob(htmlContent);

      // Save the file
      saveAs(docxBlob, "exported-document.docx");
    }
  };

  return (
    <div>
      <div ref={contentRef}>
        <h1>My Exported Content</h1>
        <p>This content will be saved in a Word document.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
      <button onClick={handleDownload} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
        Download as DOCX
      </button>
    </div>
  );
};

export default ExportToDoc;
