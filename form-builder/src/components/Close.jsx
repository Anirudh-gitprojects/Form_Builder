import React, { useState } from 'react';
import axios from 'axios';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ClearIcon from '@mui/icons-material/Clear'
const ClozeForm = () => {
  const [passage, setPassage] = useState('');
  const [missingWords, setMissingWords] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const addMissingWord = () => {
    setMissingWords([...missingWords, '']);
  };

  const handleMissingWordChange = (index, value) => {
    const updatedMissingWords = [...missingWords];
    updatedMissingWords[index] = value; 
    setMissingWords(updatedMissingWords);
  };

  const deleteQuestion = (id) => {
    setMissingWords((prev) => {
      return prev.filter((item, index) => index !== id);
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const saveForm = async () => {
    const formData = new FormData();
    if( missingWords.includes("") || passage==""){
      alert("Fields cannot be empty.")
    }
    else{
    formData.append('passage', passage);
    missingWords.forEach((word, index) => {
      formData.append(`missingWords[${index}]`, word);
    });
    formData.append('image', imageFile);

    try {
      const response = await axios.post('http://localhost:5000/api/cloze-forms', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Form saved:', response.data);
      // Add any further handling, like showing success messages, clearing the form, etc.
      alert('Form saved successfully!');
      setImageFile(null); // Clear the image file after submission
    } catch (error) {
      console.error('Error saving form:', error);
      // Handle the error, display an error message, etc.
    }
    console.log(formData);
  };}

  return (
    <div className="grid justify-center container mx-auto">
      <div className="bg-white w-96 rounded-lg shadow-md p-6" style={{ width: 800 }}>
        <h2 className="text-2xl font-semibold">Cloze Form Builder</h2>

        <div className="mb-4" id="ptext">
          <label className="block mt-4">
            Passage:
            <textarea 
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={passage}
              onChange={(e) => setPassage(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold">Missing Words</h3>
          {missingWords.map((word, index) => (
            <div key={index} className="mt-2">
              <input
                className="w-11/12 px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                value={word}
                onChange={(e) => handleMissingWordChange(index, e.target.value)}
                placeholder={`Missing word ${index + 1}`}
              />
              <button onClick={() => deleteQuestion(index)}>
                <ClearIcon />
              </button>
            </div>
          ))}
          <button
            className="px-4 py-2 mt-4 text-white bg-blue-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onClick={addMissingWord}
          >
            <AddBoxIcon />
          </button>
        </div>
        <div className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={handleImageChange}
            />
          </div>
          <button
            className="w-full px-4 py-2 text-white bg-blue-400 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onClick={saveForm}
          >
            Add
          </button>
        </div>

        <hr className="my-6" />
        <h3 className="text-xl font-semibold">Form Preview</h3>
        <p className="mt-2">
          {passage.split(' ').map((word, index) => {
            const isMissingWord = missingWords.includes(word);
            return (
              <span key={index}>
                {isMissingWord ? <input type="text" className="px-2 py-1 border" /> : `${word} `}
              </span>
            );
          })}
        </p>
        <hr className="my-6" />
      </div>
    </div>
  );
};

export default ClozeForm;
