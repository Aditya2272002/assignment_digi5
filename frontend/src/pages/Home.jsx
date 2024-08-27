import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Home = () => {
   const navigate = useNavigate()
   const [searchTerm, setSearchTerm] = useState("");
   const [cards, setCards] = useState([]);
   const [filteredCards, setFilteredCards] = useState([]);
   const [loading, setLoading] = useState(false);
   const [selectedCard, setSelectedCard] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [modalLoading, setModalLoading] = useState(false);

   useEffect(() => {
      const getLatestArtsArticles = async () => {
         try {
            const api = import.meta.env.VITE_GET_ARTS_ARTICLES;
            const apiKey = import.meta.env.VITE_API_KEY;
            const url = `${api}?api-key=${apiKey}`;
            const result = await axios.get(url);
            setCards(result.data?.results || []);
            setFilteredCards(result.data?.results || []);
         } catch (error) {
            console.log("Error in Home.jsx, Fetching latest articles: ", error);
         }
      };
      getLatestArtsArticles();
   }, []);

   useEffect(() => {
      const timeout = setTimeout(() => {
         setFilteredCards(
            cards.filter(
               (card) =>
                  card.subsection.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  card.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
         );
         setLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
   }, [searchTerm, cards]);

   const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setLoading(true);
   };

   const openModal = (card) => {
      setSelectedCard(card);
      setShowModal(true);
      setModalLoading(true);
      setTimeout(() => {
         setModalLoading(false);
      }, 500);
   };

   const getSummary = (url) => {
      localStorage.setItem("url", url)
      navigate('/summary')
   }

   return (
      <div className="p-6 bg-gray-100 min-h-screen">
         {/* Search Bar */}
         <div className="mb-6 flex justify-between ">
            <div className="hidden md:block font-bold text-2xl">Assignment</div>
            <div className="w-full max-w-md">
               <input
                  type="text"
                  placeholder="Search by section like design, music..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full max-w-md p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
               />
            </div>
            <div className="hidden md:block font-bold">Aditya Maurya (adi22maurya@gmail.com)</div>
         </div>

         {/* Cards */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
               <div className="col-span-full text-center text-gray-500">
                  Loading...
               </div>
            ) : (
               filteredCards.map((card) => (
                  <div
                     key={card.id}
                     className="border p-6 rounded-md shadow-lg bg-white hover:shadow-xl transition-shadow duration-300"
                  >
                     <div className="text-xl font-semibold mb-4 text-gray-800">
                        {card.title}
                     </div>
                     <div className="flex">
                        <div className="text-md mb-4 text-gray-800 w-max px-2 py-1 rounded-lg">
                           Published Date:
                        </div>
                        <div className="text-md mb-4 text-gray-800 bg-gray-300 w-max px-2 py-1 rounded-lg">
                           {card.published_date.split('T')[0]}
                        </div>
                     </div>
                     <div className="text-xl mb-4 text-gray-800 bg-green-300 w-max px-2 py-1 rounded-lg">
                        {card.subsection == "" ? "default" : card.subsection}
                     </div>

                     <button
                        onClick={() => openModal(card)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
                     >
                        Show More
                     </button>
                  </div>
               ))
            )}
         </div>

         {/* Modal */}
         {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
               <div className="bg-white p-8 rounded-md shadow-xl max-w-lg w-full">
                  {modalLoading ? (
                     <div className="text-center text-gray-500">Loading...</div>
                  ) : (
                     <>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                           {selectedCard.title}
                        </h2>
                        <div>
                           <div className="flex gap-1">
                              <div className="font-bold">Abstract</div>
                              <div className="text-right">{selectedCard.abstract}</div>
                           </div>
                           <div className="flex gap-1">
                              <div className="font-bold">Source </div>
                              <div
                                 className="text-right text-blue-300"
                                 onClick={() => {
                                    window.open(selectedCard.url);
                                 }}
                              >
                                 LINK
                              </div>
                           </div>
                           <div className="flex gap-1">
                              <div className="font-bold">Published date</div>
                              <div className="text-right">
                                 ⌚{selectedCard.published_date}
                              </div>
                           </div>
                           <div className="flex gap-1">
                              <div className="font-bold">Article</div>
                              <div className="text-right">{selectedCard.byline}</div>
                           </div>
                           <div className="flex gap-1">
                              <div className="font-bold ">Subsection</div>
                              <div className="text-right">{selectedCard.subsection}</div>
                           </div>
                        </div>
                        <p className="text-gray-600 mb-6">{selectedCard.details}</p>
                        <div className="flex gap-2">
                           <button
                              onClick={() => setShowModal(false)}
                              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-300"
                           >
                              Close
                           </button>
                           <button
                              onClick={() => getSummary(selectedCard.url)}
                              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-300 hover:text-black transition-colors duration-300"
                           >
                              Get Summary
                           </button>
                        </div>
                     </>
                  )}
               </div>
            </div>
         )
         }
      </div>
   );
};

export default Home;
