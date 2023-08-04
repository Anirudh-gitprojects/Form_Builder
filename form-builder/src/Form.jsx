// Form_Display.js (Updated component)
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import "./styles2.css"
import { drawerClasses } from "@mui/material";

function Form_Display() {
    
  function allowDrop(e) {
    e.preventDefault();
  }
  
  function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
  }
  
  function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    e.target.appendChild(document.getElementById(data));
    console.log(e.currentTarget , e)
  }
  const [categories, setCategories] = useState([]);

  const handleDragStart = (event, itemId) => {
    event.dataTransfer.setData("widgetType", itemId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

// Form_Display.js (Updated handleDrop function)
const handleDrop = (event, categoryId) => {
  event.preventDefault();
  const itemId = event.dataTransfer.getData("widgetType");
  const draggedItem = items.find((item) => item._id === itemId);

  const updatedCategories = categories.map((category) => {
    if (category.id === categoryId) {
      const existingItemIndex = category.items.findIndex((item) => item._id === itemId);

      // If the item is already in the category, remove it from the old position
      if (existingItemIndex !== -1) {
        category.items.splice(existingItemIndex, 1);
      }

      // Add the dragged item to the new position in the category
      category.items.push(draggedItem);
    } else {
      // If the item is in another category, remove it from there
      const existingItemIndex = category.items.findIndex((item) => item._id === itemId);
      if (existingItemIndex !== -1) {
        category.items.splice(existingItemIndex, 1);
      }
    }
    return category;
  });

  setCategories(updatedCategories);
};

  const [items, setItems] = useState([]);
  const[clozeItems,setClozeItems]=useState([]);
  const[compItems,setCompForm]=useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/cloze-forms")
      .then((res) => {
        setClozeItems(res.data);

        // Initialize categories based on fetched items
        const initialCategories = res.data.map((item) => ({
          id: item._id,
          passage: item.passage,
          missingWords:item.missingWords,
          image:item.imageFile
        }));

      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then((res) => {
        setItems(res.data);

        // Initialize categories based on fetched items
        const initialCategories = res.data.map((item) => ({
          id: item._id,
          name: item.category,
          items: [],
        }));
        setCategories(initialCategories)
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/comp-form")
      .then((res) => {
        setCompForm(res.data);

        // Initialize categories based on fetched items
        const initialCategories = res.data.map((item) => ({
          id: item._id,
          passage: item.passage,
          questions:item.questions,
          image:item.imageFile
        }));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
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
  
      <div className="grid justify-center container mx-auto mt-2">
      <h1 className="wt-full text-center text-3xl"  >Questions</h1>
      <div className="bg-white w-96 rounded-lg shadow-md p-6" style={{ width: 800 }}>
      <h1 className="text-xl font-semibold text-center">Categorize</h1>
      <br/>

      {items.map((item, index) => (
        <div
          key={item._id}
          className="widget"
          id={item._id}
          value={item}
          draggable
          onDragStart={(event) => drag(event)}
          style={{
            fontSize: "30px",
            backgroundColor: "ghostwhite",
            border: "2px solid black",
            width: "160px",
            textAlign: "center",
            margin: "20px",
              
          float:'left'}}
        >
          {item.name}
        </div>
      ))}
      
      <br/><br/><br/><br/><br/><br/><br/>

      <div>

        {items.map((item) => (
          <div className="mt-9"
            key={item._id}
            id={item._id}
            onDragOver={(e)=>allowDrop(e)}
            onDrop={(e,value) => drop(e,value)}
          >

         
            <ul className="ml-3"  style={{width:'230px',height:'250px',border:'2px solid black',borderRadius:'20%' ,float:'left',backgroundColor:'lightBlue',textAlign:'center',fontSize:'40px', }} >
            <h2 style={{textAlign:'center',}}>{item.category} </h2> 
              {categories
                .find((cat) => cat.id === item._id)
                ?.items.map((i) => (
                  <li key={i._id} style={{  fontSize: "30px",
                  backgroundColor: "beige",
                  border: "2px solid black",
                  width: "160px",
                  textAlign: "center",

                marginTop:'10px', }}>{i.name}</li>
                
                ))}
            </ul>
          </div>
   
        ))}
      </div>
      </div>
      </div>
      <div className="grid justify-center container mx-auto">
      <div className="bg-white w-96 rounded-lg shadow-md p-6" style={{ width: 800 }}>
      {clozeItems.map((item)=>(
      <div>

<hr className="my-6" />
<h3 className="text-xl font-semibold text-center">Cloze</h3>


<div>{item.missingWords.map((c=><div draggable="true" className="mt-1" id={c} style={{
            fontSize: "30px",
            backgroundColor: "pink",
            border: "2px solid black",
            width: "170px",
        
            textAlign: "center",
          
          }}  onDragStart={(e)=>{drag(e)}}>{c}</div>))}</div>
                  <p  style={{padding: '10px'}} className="mt-2 optionsbox">
          {item.passage.split(' ').map((word, index) => { 
            const isMissingWord = item.missingWords.includes(word);
            return (
              <p className="optionsbox" style={{ 
                display: 'inline', 
                height: '20px',
              }} key={index}>
                {isMissingWord ? <span style={{ width: "170px",
      height: '58px',
    border: '1px solid black' }}   onDrop={(e)=>{drop(e)}} onDragOver={(e)=>{allowDrop(e)}} ></span> : `${word} `}
              </p>
            );
          })}
        </p>
</div>
))}
  
  <div/>
  </div>
  <hr />
  <div className="grid justify-center container mx-auto">
      <div className="bg-white w-96 rounded-lg shadow-md p-6" style={{ width: 800 }}>

      <h3 className="text-xl font-semibold text-center">Comprehension</h3>
      <h3 className="text-xl font-semibold ">Passage</h3><br/>
  {compItems.map((item,index)=>(item.questions.map((q=>(
  <div class="quiz-container" id="quiz">
    <div class="quiz-header">
        <h2 id="question">{item.passage}</h2><br/>
        <h3>Question: {q.question}</h3>
        <ul>
            <li>

                <label id="a_text" for="a">{q.options.map((i=>(<div><input type="checkbox" id="a" name="answer" class="answer" />{i}</div>)))}</label>
            </li>
        </ul>
    </div>

</div>)))))}
<button class="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded" style={{position:'relative',left:'309px'}} onClick={()=>alert('Form Submitted')} >Submit</button>
    </div>
  </div> </div></div>
);
}

export default Form_Display;
