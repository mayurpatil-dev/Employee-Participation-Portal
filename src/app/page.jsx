"use client";
import React from "react";
import SuggestionForm from '../components/SuggestionForm';

function MainComponent() {
  const [employeeName, setEmployeeName] = React.useState("");
  const [isAgreed, setIsAgreed] = React.useState(false);
  const [showCertificate, setShowCertificate] = React.useState(false);

  const generateCertificate = () => {
    if (employeeName && isAgreed) {
      setShowCertificate(true);
      // Scroll to certificate preview
      setTimeout(() => {
        document.getElementById("certificate-preview").scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const downloadCertificate = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Create an image element for the template
    const templateImg = new Image();
    templateImg.crossOrigin = "anonymous";

    templateImg.onload = function () {
      // Set canvas size to match the template
      canvas.width = templateImg.width;
      canvas.height = templateImg.height;

      // Draw the template image
      ctx.drawImage(templateImg, 0, 0);

      // Add the employee name on the certificate
      // Use multiple fallback fonts for maximum compatibility
      ctx.fillStyle = "#000000"; // Black text
      ctx.font = 'bold 56px Arial, "Helvetica Neue", Helvetica, sans-serif'; // Increased size and multiple fallbacks
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Position the name higher up, right before the name line
      const nameX = canvas.width / 2;
      const nameY = canvas.height * 0.55; // Position before the name line

      // Add text shadow for better visibility
      ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      ctx.fillText(employeeName, nameX, nameY);

      // Reset shadow
      ctx.shadowColor = "transparent";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;

      // Download the certificate with high quality
      const link = document.createElement("a");
      link.download = `${employeeName.replace(
        /[^a-zA-Z0-9]/g,
        "_"
      )}_Certificate.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    templateImg.onerror = function () {
      console.error("Failed to load certificate template");
      alert("Failed to load certificate template. Please try again.");
    };

    // Set the source to your template image
    templateImg.src =
      "https://ucarecdn.com/3558ee61-c949-4cca-9bb7-636ae6e3dcea/-/format/auto/";
  };

  return (
    <div className="min-h-screen">
      {/* Background with low opacity */}
      <div 
        className="fixed inset-0 opacity-45"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwyfHxzb2xhciUyMHBhbmVsc3xlbnwwfHx8fDE3NTQwNTg0MDl8MA&ixlib=rb-4.1.0&q=85')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      ></div>
      
      {/* Overlay to restore content visibility */}
      <div className="absolute inset-0 bg-white/20"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-white bg-opacity-60 backdrop-blur-sm py-3 sm:py-4 md:py-6 px-2 sm:px-3 md:px-4 w-full">
          <div className="max-w-6xl mx-auto">
            {/* Logo Section */}
            <div className="flex justify-center items-center mb-2 sm:mb-3 md:mb-4 px-1 sm:px-2 md:px-4">
              {/* IAC Lumax Logo */}
              <div className="flex items-center">
                <img 
                  src="/IAC _ Lumax logo.jpeg" 
                  alt="IAC Lumax Logo" 
                  className="h-10 sm:h-14 md:h-16 lg:h-20 w-auto max-w-full"
                />
              </div>
            </div>
            
            {/* Title Section */}
            <div className="text-center px-1 sm:px-2 md:px-4">
              <h1 className="text-base sm:text-lg md:text-xl lg:text-3xl font-bold text-gray-800 mb-1 leading-tight">
                908 KWp Solar Power Plant Inauguration
              </h1>
              <p className="text-teal-600 text-xs sm:text-sm md:text-base font-medium mb-1 leading-tight">
                Renewable Energy Development Program
              </p>
              <p className="text-gray-600 text-xs leading-tight">
                IAC Nashik - Employee Participation Portal
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-2 sm:px-3 md:px-4 space-y-4 sm:space-y-5 mt-4 sm:mt-6">
          {/* Certificate Preview Card */}
          <div
            id="certificate-preview"
            className="bg-white/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 text-center shadow-lg"
          >
            {showCertificate ? (
              <div>
                <h2 className="text-base sm:text-lg text-gray-900 font-semibold mb-3 sm:mb-4">
                  Your Certificate is Ready!
                </h2>

                <div className="bg-green-50/80 border border-green-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-5">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-green-900 mb-2">
                    Certificate Generated Successfully!
                  </h3>
                  <p className="text-green-800 text-sm mb-2 sm:mb-3">
                    Congratulations <strong>{employeeName}</strong>! Your
                    participation certificate has been generated.
                  </p>
                  <p className="text-green-700 text-xs">
                    Click the download button below to save your certificate.
                  </p>
                </div>

                {/* Download Button */}
                <button
                  onClick={downloadCertificate}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 sm:px-5 rounded-lg shadow-md transition-colors duration-200 flex items-center gap-2 mx-auto text-sm"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download Certificate
                </button>
              </div>
            ) : (
              <div>
                <h2 className="text-base sm:text-lg text-gray-800 mb-3 sm:mb-4">
                  Certificate preview will appear here
                </h2>
                <p className="text-gray-700 text-sm">
                  Complete the form and agreement to generate your certificate
                </p>
              </div>
            )}
          </div>

          {/* Participation Form Card */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-md">
            <div className="text-center mb-4 sm:mb-5">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                Confirm Your Participation
              </h2>
              <p className="text-gray-800 text-xs">
                Be part of our renewable energy initiative and receive your
                participation certificate
              </p>
            </div>

            <div className="space-y-4 sm:space-y-5">
              {/* Employee Name and Suggestion Box */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Employee Name Input */}
                <div>
                  <label className="block text-gray-900 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                    Employee Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-2 sm:pl-3 pointer-events-none">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={employeeName}
                      onChange={(e) => setEmployeeName(e.target.value)}
                      placeholder="Enter employee full name"
                      className="w-full pl-8 sm:pl-10 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-xs sm:text-sm"
                      maxLength={50}
                    />
                  </div>
                </div>

                {/* Suggestion Box - moved here */}
                <div>
                  <label className="block text-gray-900 font-semibold text-xs sm:text-sm mb-1 sm:mb-2">
                    Suggest Innovative Idea In Renewable Energy
                  </label>
                  <div className="space-y-3">
                    <textarea
                      id="suggestion-text"
                      rows={4}
                      placeholder="Share your ideas about environment, renewable energy, or workplace improvements..."
                      className="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-xs sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Agreement Checkbox */}
              <div className="bg-green-50/80 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={isAgreed}
                      onChange={(e) => setIsAgreed(e.target.checked)}
                      className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-2 flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Participation Agreement
                    </h3>
                    <p className="text-gray-800 text-xs">
                      I am agreed to actively participated in the Renewable
                      Energy Program, demonstrating commitment and awareness
                      toward sustainable energy solutions and contributing to a
                      cleaner, greener future.
                    </p>
                  </div>
                </div>
              </div>

              {/* Confirm Button */}
              <button
                onClick={generateCertificate}
                disabled={!employeeName.trim() || !isAgreed}
                className={`w-full py-2 sm:py-3 rounded-lg font-semibold text-white transition-all duration-200 text-sm ${
                  employeeName.trim() && isAgreed
                    ? "bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 shadow-md"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <span className="flex items-center justify-center gap-1 sm:gap-2">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Confirm Participation
                </span>
              </button>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-5 shadow-md">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-600 font-bold text-xs sm:text-sm">i</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                  About the Solar Plant Inauguration
                </h3>
                <p className="text-gray-800 text-xs sm:text-sm">
                  Join IAC Nashik in celebrating the inauguration of our new
                  solar plant. By participating in this renewable energy
                  development program, you contribute to environmental
                  sustainability and demonstrate your commitment to a greener
                  future.
                </p>
              </div>
            </div>
          </div>

          {/* HR View Section */}
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-5 shadow-md">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-blue-600 font-bold text-xs sm:text-sm">HR</span>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">
                  HR View
                </h3>
                <p className="text-gray-800 text-xs sm:text-sm mb-3 sm:mb-4">
                  HR access to download saved suggestions and participation data.
                </p>
                <button 
                  onClick={() => {
                    const passcode = prompt("Enter passcode to download suggestions:");
                    if (passcode === "1001") {
                      window.open(`/api/download-suggestions?passcode=${passcode}`, '_blank');
                    } else {
                      alert("Invalid passcode!");
                    }
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 sm:px-5 rounded-lg shadow-md transition-colors duration-200 text-sm"
                >
                  Download Suggestions (HR Access)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestion Box Section - REMOVED as requested */}
        {/* This section was removed to eliminate the Suggestion Box below About the Solar Plant Inauguration */}

        {/* Footer */}
        <footer className="text-center py-3 sm:py-4 px-2 sm:px-4 mt-6 sm:mt-8 bg-white/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto">
            <div className="border-t border-gray-300/50 pt-2 sm:pt-3">
              <p className="text-gray-900 font-semibold text-sm">
                IAC - Nashik Plant 2025
              </p>
              <p className="text-gray-800 text-xs sm:text-sm mt-1">
                Renewable Energy Development Program
              </p>
              <p className="text-gray-600 text-xs mt-1 sm:mt-2">
                © {new Date().getFullYear()} IAC Lumax. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default MainComponent;