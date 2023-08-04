
import droppable from "jquery-ui-bundle"
import React, { useState, useEffect } from 'react';
import $ from 'jquery'
import axios from 'axios'
import "./styles2.css"
$(document).ready(function() {
    // This code used for set order attribute for items
  var numberOfItems = $("#options").find('li').length;
  $.each($("#options").find('li'), function(index, item) {
      $(item).attr("order", index);
      var removeBotton = $('<i class="fa fa-times" style="display:none"></i>');
      removeBotton.click(function(){
            addToOlderPlace($(this).parent());        
        });
      $(item).append(removeBotton);
      
  });
    
    $("span").droppable({
      accept: "li",
      classes: {
        "ui-droppable-hover": "ui-state-hover"
      },
      drop: function(event, ui) {
      // Check for existing another option
      if($(this).find('li').length > 0)
      addToOlderPlace($(this).find('li'));
      
        $(this).addClass("ui-state-highlight");
        $(this).addClass('matched');  
        
        $(ui.draggable).find('i').attr("style","");
        $(this).append($(ui.draggable));    
       
      }
    });
  
    $("li").draggable({
        helper:"clone",
      revert: "invalid"
    }); 
    

  
        
    
    // This function used for find old place of item
    function addToOlderPlace($item) {
          var indexItem = $item.attr('order');
          var itemList = $("#options").find('li');
          $item.find('i').hide();         
  
          if (indexItem === "0")
              $("#options").prepend($item);
          else if (Number(indexItem) === (Number(numberOfItems)-1))        
                 $("#options").append($item);                       
          else
              $(itemList[indexItem - 1]).after($item);
      }
      
  })
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

  
    const handleDragStart = (event, itemId) => {
      event.dataTransfer.setData("widgetType", itemId);
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  

  

function Test(){
     
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
    });    setCategories(updatedCategories);
};
    const [items, setItems] = useState([]);
    const[clozeItems,setClozeItems]=useState([]);
    const[compItems,setCompForm]=useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
      axios
        .get("http://localhost:5000/api/cloze-forms")
        .then((res) => {
          setClozeItems(res.data);
  
          // Initialize categories based on fetched items
          const initialCategories = res.data.map((item) => ({
            id: item._id,
            title: item.category,
            passage: item.passage,
            missingWords:item.missingWords,
            image:item.imageFile
          }));
  
        })
        .catch((err) => console.log(err));
    }, []);useEffect(() => {
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
  
    return(
    <div>
       <div className="grid justify-center container mx-auto">
      <div className="bg-white w-96 rounded-lg shadow-md p-6" style={{ width: 800 }}>
      {clozeItems.map((item)=>(
      <div>

<hr className="my-6" />
<h3 className="text-xl font-semibold text-center">Cloze</h3>


<div>{item.missingWords.map((c=><div style={{
            fontSize: "30px",
          }}  ><ul id="options"><li>{c}</li></ul></div>))}</div>
                  <p className="mt-2">
          {item.passage.split(' ').map((word, index) => { 
            const isMissingWord = item.missingWords.includes(word);
            return (
              <p style={{display:'inline'}}  key={index}>
                {isMissingWord ? <span style={{ width: "170px",
  height: '58px',
  border: '1px solid white'}} type="text" className="px-2 py-1 border"></span> : `${word} `}
              </p>
            );
          })}
        </p>
</div>
))}
  
  <div/>
  </div>
    </div>
    <div className="grid justify-center container mx-auto">
      <div className="bg-white w-96 rounded-lg shadow-md p-6" style={{ width: 800 }}>
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
          <div 
            key={item._id}
            id={item._id}
            onDragOver={(e)=>allowDrop(e)}
            onDrop={(e,value) => drop(e,value)}
          >

         
            <ul className="ml-3"  style={{width:'230px',height:'250px',border:'2px solid black',borderRadius:'20%' ,float:'left',backgroundColor:'lightBlue',textAlign:'center',fontSize:'40px', position:'relative',left:'26%'}} >
            <h2 style={{textAlign:'center',}}>{item.category} </h2> 
              {categories
                .find((cat) => cat.id === item._id)
                ?.items.map((i) => (
                  <li key={i._id} style={{  fontSize: "30px",
                  backgroundColor: "beige",
                  border: "2px solid black",
                  width: "160px",
                  textAlign: "center",

                  marginLeft: "30px",marginTop:'10px', }}>{i.name}</li>
                
                ))}
            </ul>
          </div>
   
        ))}
      </div>
      </div>
      </div>






      
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

                <label id="a_text" for="a">{q.options.map((i=>(<div><input type="radio" id="a" name="answer" class="answer" />{i}</div>)))}</label>
            </li>
        </ul>
    </div>

</div>)))))}
<button class="bg-purple-900 text-white hover:bg-blue-400 font-bold py-2 px-4 mt-3 rounded" style={{position:'relative',left:'309px'}} >Submit</button>
    </div>
  </div>      </div>
)}
export default Test