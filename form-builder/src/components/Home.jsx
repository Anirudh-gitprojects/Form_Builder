import React from "react"
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import { Select ,MenuItem, InputLabel,Button} from '@mui/material';
import ComprehensionFormBuilder from "./Comprehension";
import ClozeForm from "./Close";
import CategorizeForm from "./Categorize";
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from "react-router-dom";
import axios from 'axios'
function Home(){
    const [form, setForm] = React.useState([]);
    console.log(form)
    function addCat(){
      setForm(prev=>{
       return [...prev,<CategorizeForm/>]
        console.log(prev)})
    }
    
    function addCloze(){
      setForm(prev=>{
        return [...prev,<ClozeForm/>]
         console.log(prev)})
    } 
    
    function addComp(){
      setForm(prev=>{
        return [...prev,<ComprehensionFormBuilder/>]
         console.log(prev)})
    }
    const handleChange = (event) => {
      setForm(event.target.value);
      if(event.target.value==="Categorization"){
        return <CategorizeForm/>
      }
    };

    const deleteForm=(id)=>{
      setForm(prev=>{
        return prev.filter((item,index)=>{
          return index!==id
        }
      )})}

     function addToForm(forms){
      for (var i=0;i<forms.length;i++){
        if(forms[i].type===CategorizeForm){
          console.log('hello')
        }
    }
     }
     const handleFormSubmit = async () => {
      try {
          console.log(form)
          const formDataArray = form.map((item) => {
          const formData = new FormData();
          formData.append('name', item.name);
          formData.append('category', item.category);
          formData.append('image', item.imageFile);
          return formData;
        });
        console.log('Form data to be submitted:', formDataArray);
  
        // Call the API to submit each form data in formDataArray
        const responses = await Promise.all(
          formDataArray.map((formData) =>
            axios.post('http://localhost:5000/api/items', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            })
          )
        );
  
        console.log('Form submitted successfully:', responses);
  
        // Clear the form after successful submission
        setForm([]);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    };
  return (
    <>
    <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      <img
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Form-Builder</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Build Customized Forms with Form-Builder.   
          </p>
        </div>
      
      </div>
    </div>
    <div className="mt-3 ">
     <Button variant="contained" onClick={addCat} style={{position:'relative',left:'600px',borderRadius: 35,
        backgroundColor: "#21b6ae",
        padding: "18px 36px",
        fontSize: "18px"}} className="bg-black-900">Categorization</Button>
    <Button variant="contained" onClick={addCloze} style={{position:'relative',left:'650px',borderRadius: 35,
        backgroundColor: "#21b6ae",
        padding: "18px 36px",
        fontSize: "18px"}}>Cloze</Button>
    <Button variant="contained" onClick={addComp} style={{position:'relative',left:'700px',borderRadius: 35,
        backgroundColor: "#21b6ae",
        padding: "18px 36px",
        fontSize: "18px"}}>Comprehension</Button></div>  <br/> <hr/>

          {form.map((item,index)=>(
            <div id={index}>
               <ClearIcon style={{position:'relative',left:'1370px',top:'20px'}}onClick={()=>{
              deleteForm(index)
            }}/>{item}
            </div>))}

          {form.length!==0 ?  <Link variant="contained" onClick={addCat} style={{borderRadius: 35,
        backgroundColor: "#21b6ae",
        padding: "18px 36px",
        position:'relative',
        left:'870px',
        color:'white',
        fontSize: "18px",top:'30px'}}
                      to="/form">
                      View Form
                    </Link>  : null}
  </>

    )
}

export default Home;