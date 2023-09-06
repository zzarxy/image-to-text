import './App.css';
import { useState } from "react";

function App() {
   const [selectedFile, setSelectedFile] = useState(null);
   const [jsonData, setJsonData] = useState();
   const [isLoading, setIsLoading] = useState(false);

   const handleFileSelect = (event) => {
      setSelectedFile(event.target.files[0]);
   };

   const onSubmit = () => {
      setIsLoading(true);
      let formData = new FormData();
      formData.append('image', selectedFile)

      fetch("https://api.api-ninjas.com/v1/imagetotext", {
         headers: { "X-Api-Key": "6QpmckgvhLRCWLPGjynYfIi4eGawIrBeCROxcxyI" },
         method: 'POST',
         body: formData,
      })
         .then((response) => response.json())
         .then((data) => {
            const textArray = data.map((item) => item.text);
            const text = textArray.join(' ');
            setJsonData(text);
            console.log(text);
         })
         .catch((error) => {
            console.error("Error:", error);
            setJsonData(`${error}`);
         })
         .finally(() => { setIsLoading(false) });
   };

   return (
      <div className="App">
         <div className="leftside">
            <div className='container'>
               <h4>
                  The Image to Text API detects and extracts text from images
                  using state-of-the-art optical character recognition (OCR) algorithms.
               </h4>
               <div className="Input">
                  <input
                     type="file"
                     id="image_uploads"
                     accept="image/png,image/jpeg"
                     onChange={handleFileSelect}
                  />
                  <label for="image_uploads" type="button">
                     Browse
                  </label>
               </div>
               <button type="button" onClick={onSubmit} disabled={isLoading}>
                  Send
               </button>
            </div>
         </div>
         <div className="rightside">
            <pre>{isLoading ? "Loading..." : jsonData}</pre>
         </div>
      </div>
   );
}

export default App;