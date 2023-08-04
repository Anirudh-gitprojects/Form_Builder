const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());


mongoose.connect("mongodb://127.0.0.1:27017/test_db1",{
    useNewUrlParser:true,useUnifiedTopology:true        
})  
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

  const multer = require('multer');

  // Define the storage settings for multer
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Save the uploaded files to the "uploads" folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Use unique filenames to avoid overwriting
    }
  });
  
  // Create a multer instance with the storage settings
  const upload = multer({ storage: storage });
  
// Define the Item schema
const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true }, // This will store the selected category
  image:{type:String,required:false}
});

const Item = mongoose.model('Item', itemSchema);


const clozeFormSchema = new mongoose.Schema({
  passage: String,
  missingWords: [String],
  image:{type:String,required:false}
});

const ClozeForm = mongoose.model('ClozeForm', clozeFormSchema);

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String,
});

const formSchema = new mongoose.Schema({
  passage: String,
  image:{type:String,required:false},
  questions: [questionSchema],
});

const CompForm = mongoose.model('CompForm', formSchema);

app.post('/api/comp-form', upload.single('image'), async (req, res) => {
  try {
    const { passage, questions } = req.body;
    const image = req.file ? req.file.path : null; // Save the image path, or null if no image was uploaded

    const compform = new CompForm({
      passage,
      questions: JSON.parse(questions), // Convert the JSON string back to an array
      image,
    });

    await compform.save();
    res.status(201).json(compform);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create comprehension form' });
  }
});
// API endpoint to save a new cloze form
app.post('/api/cloze-forms', upload.single('image'), async (req, res) => {
try {
  const {  passage, missingWords } = req.body;
  const image = req.file ? req.file.path : null; // Save the image path, or null if no image was uploaded

  const clozeForm = new ClozeForm({

    passage,
    missingWords,
    image,
  });

  await clozeForm.save();
  res.status(201).json(clozeForm);
} catch (err) {
  res.status(400).json({ error: 'Failed to create cloze form' });
}
});

app.post('/api/items', upload.single('image'), async (req, res) => {
  try {
    const { name, category } = req.body;
    const newItemData = {
      name,
      category,
      image: req.file ? req.file.path : null, // Save the image path, or null if no image was uploaded
    };

    const newItem = await Item.create(newItemData);
    res.json(newItem);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create the item.' });
  }
});



// API route to get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items.' });
  }
});

app.get('/api/comp-form', async (req, res) => {
  try {
    const items = await CompForm.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items.' });
  }
});

app.get('/api/cloze-forms', async (req, res) => {
  try {
    const items = await ClozeForm.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch items.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
