import React, { Component } from "react";

class ErrorBoundary extends Component {
   constructor(props) {
      super(props);
      this.state = { hasError: false };
   }

   static getDerivedStateFromError(error) {
      return { hasError: true };
   }

   componentDidCatch() {
      console.error("Error caught by ErrorBoundary");
   }

   render() {
      if (this.state.hasError) {
         return (
            <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100 text-center">
               <div className="bg-white shadow-md rounded-lg p-8 max-w-lg">
                  <h1 className="text-6xl font-extrabold text-gray-800 mb-4">
                     Something went wrong.
                  </h1>
                  <p className="text-gray-500 mb-6">
                     We're sorry, but something went wrong on our end. Please try again
                     later.
                  </p>
                  <div
                     onClick={() => {
                        window.location.href = 'mailto:adi22maurya@gmail.com?subject=Issue in Server&body=I am facing issue in server!%20Text';
                     }}
                     className="cursor-pointer inline-block px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-300"
                  >
                     Raise Ticket
                  </div>
               </div>
            </div>
         );
      }

      return this.props.children;
   }
}

export default ErrorBoundary;
