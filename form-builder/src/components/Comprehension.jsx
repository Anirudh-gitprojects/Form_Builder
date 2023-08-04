import React, { useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
const ComprehensionFormBuilder = () => {
  const [passage, setPassage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', ''], answer: '' },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { question: '', options: ['', '', ''], answer: '' }]);
  };

  const deleteQuestion=(id)=>{
    setQuestions(prev=>{
      return prev.filter((item,index)=>{
        return index!==id
      }
    )})
  } 
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const saveForm = async () => {
    for(var i=0;i<questions.length;i++){
    if(passage==="" || questions===[]|| questions[i].options.includes("") || questions[i].answer=="" || questions[i].question==""){
      alert('Fields cannot be empty!')
    }
    else{
    const formData = new FormData();
    formData.append('passage', passage);
    formData.append('questions', JSON.stringify(questions));
    formData.append('image', imageFile); // Append the image file
  
    try {
      const response = await axios.post('http://localhost:5000/api/comp-form', formData);
      console.log('Form saved:', response.data);
      // Add any further handling, like showing success messages, clearing the form, etc.
      alert('Form saved successfully!');  
      setImageFile(null); // Clear the image file after submission
    } catch (error) {
      console.error('Error saving form:', error);
      // Handle the error, display an error message, etc.
    }}
    break;
  };}

  return (
    <div className="grid justify-center container mx-auto ">
      <div className="bg-white w-96 rounded-lg shadow-md p-6" style={{width:800}} >    
        <h2 className="text-2xl font-semibold">Comprehension Form Builder</h2>
        <div className="mb-4">
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
            <label className="block text-gray-700">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>
        <h3 className="text-xl font-semibold">Questions</h3>
        {questions.map((question, index) => (
          <div key={index} id={index} className="mb-4">
            <label className="block mt-4"> </label>
              Question {index + 1}:
              <button style={{position:'relative' ,left:'640px'}} onClick={()=>{
            deleteQuestion(index)
          }}><DeleteIcon/></button> <input
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                value={question.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                placeholder={`Question ${index + 1}`}
              />
            
           
            <br />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-2">
                <label>
                  Option {optionIndex + 1}:
                  <input
                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                    placeholder={`Option ${optionIndex + 1}`}
                  />
                </label>
              </div>
            ))}
            <label className="block mt-2">
              Correct Answer:
              <input
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                type="text"
                value={question.answer}
                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                placeholder={`Correct Answer for Question ${index + 1}`}
              />
            </label>
            <hr className="my-4" />
          </div>
        ))}
        <div className="mb-4">
          <button
            className="px-4 py-2 mr-2 text-white bg-blue-500 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onClick={addQuestion}
          >
            Add Question
          </button>
          <button
            className="px-4 py-2 text-white bg-green-500 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            onClick={saveForm}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComprehensionFormBuilder;
