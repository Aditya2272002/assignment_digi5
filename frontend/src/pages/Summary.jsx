import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Summary = () => {
   const navigate = useNavigate();
   const [showScrapingDataMsg, setShowScrapingDataMsg] = useState(true);
   const [siteData, setSiteData] = useState("")
   const [summaryData, setSummaryData] = useState(null)
   const url = localStorage.getItem('url');

   useEffect(() => {
      const scrapeData = async () => {
         try {
            const response = await axios.post('http://127.0.0.1:8000/data', { url });
            setSiteData(response.data);
            setShowScrapingDataMsg(false);
         } catch (error) {
            console.error('Error scraping data:', error);
            throw error;
         }
      };
      scrapeData();
   }, []);

   useEffect(() => {
      const generateSummary = async () => {
         try {
            const response = await axios.post('http://127.0.0.1:8000/summary', { extracted_content: siteData });
            setSummaryData(response.data?.summary?.content);
         } catch (error) {
            console.error('Error generating summary:', error);
            throw error;
         }
      };
      generateSummary();
   }, [siteData]);

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
         <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
            {showScrapingDataMsg ? (
               <div className="text-center text-gray-600">
                  <svg
                     className="animate-spin h-5 w-5 text-blue-500 mx-auto"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 24 24"
                     fill="none"
                     stroke="currentColor"
                  >
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h-8z"></path>
                  </svg>
                  <p className="mt-4 text-lg">Scraping data...</p>
                  <button onClick={() => { navigate("/") }} className='className="w-full px-4 py-2 mt-4 bg-green-600 text-white rounded-md hover:bg-green-300 hover:text-black transition-colors duration-300"'>Go back</button>
               </div>
            ) : (
               <div className="prose prose-sm max-w-full">
                  {summaryData ? (
                     <div>
                        <h2 className="text-xl font-semibold text-gray-800">Summary</h2>
                        <p>{summaryData}</p>
                        <button onClick={()=> {navigate("/")}} className='className="w-full px-4 py-2 mt-4 bg-green-600 text-white rounded-md hover:bg-green-300 hover:text-black transition-colors duration-300"'>Go back</button>
                     </div>
                  ) : (
                     <p className="text-center text-gray-600">No summary available</p>
                  )}
               </div>
            )}
         </div>
      </div>
   )
}

export default Summary;
