const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');


const cors = require('cors');


const app = express();
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/assets', express.static(path.join(__dirname, '../assets')));
mongoose.connect('mongodb+srv://t15998627020:6150finalproject@6150project.kikhcmw.mongodb.net/ourDataBase?retryWrites=true&w=majority&appName=6150project', {
  });
  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image:{type: String}
  });
  
 
  const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    count: { type: String, required: true },
    description: { type: String, required: true },
    image:{type: String}
  });
  
  const User = mongoose.model('User', userSchema);
  const Products = mongoose.model('Product', productSchema);
  let emailRegex    = /^[a-zA-Z0-9]+@northeastern\.edu$/;
   let namePattern= /^[a-zA-Z]+ [a-zA-Z]+$/;

   let passPattern= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;


/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Register a user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John D"
 *               email:
 *                 type: string
 *                 example: "johnD@northeastern.edu"
 *               password:
 *                 type: string
 *                 example: "P@ssw0rd1"
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Validation failed
 */

  app.post('/user/create', async (req, res) => {
    
      const { name, email, password } = req.body;
      if (!emailRegex.test(email)|| !namePattern.test(name)||!passPattern.test(password)) {
        return res.status(400).json({ error: 'Validation failed.' });
      }
   
      const hashedPassword = await bcrypt.hash(password, 10);
    
 
      const newUser = new User({
        name,
        email,
        password: hashedPassword
      });
      
      await newUser.save();
      return res.status(201).json({ message: 'User created successfully.' });
    
    });
/**
 * @swagger
 * /user/edit:
 *   put:
 *     summary: edit a user
 *     description: Register a user with name, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *          
 *               email:
 *                 type: string
 *                 example: "johnD@northeastern.edu"
 *               password:
 *                  type: string
 *           
 *     responses:
 *       200:
 *          description: success
 *        
 *        
 *
 *       404:
 *         description: notfound
 *       
 */
    app.put('/user/edit', async (req, res) => {
       
          const { email,name, password } = req.body;
       
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404).json({ error: 'User not found.' });
          }
         
          
            if (!namePattern.test(name)) {
              return res.status(400).json({ error: 'Validation failed.' });
            }
            user.name = name;
          
        
         
            if (!passPattern.test(password)) {
              return res.status(400).json({ error: 'Validation failed.' });
            }
            user.password = await bcrypt.hash(password, 10);
          
          await user.save();
          return res.status(200).json({ message: 'User updated successfully.' });
        
      });
    /**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: delete a user
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             
 *          
 *               email:
 *                 type: string
 *                 example: "johnD@northeastern.edu"
 *           
 *           
 *     responses:
 *       200:
 *          description: success
 *        
 *        
 *
 *       404:
 *         description: notfound
 */
app.delete('/user/delete', async (req, res) => {
   
      const { email } = req.body;
      const user = await User.findOneAndDelete({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      return res.status(200).json({ message: 'User deleted successfully.' });
    
  });
  /**
 * @swagger
 * /user/getall:
 *   get:
 *     summary: get All users
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             
 *         
 *           
 *           
 *     responses:
 *       200:
 *          description: success
 *        
 *        
 *
 *      
 */
  app.get('/user/getAll', async (req, res) => {
   
      const users = await Product.find({}, { name: 1, email: 1, passoword: 1 });
      return res.status(200).json({ users });
    
  });
const storage = multer.diskStorage({
    destination: (req, file, call) => {
      call(null, 'image/'); 
    },
    filename: (req, file, call) => {

      call(null, req.body.email+path.extname(file.originalname));
    }
  });
  app.get('/search', async (req, res) => {
   
    const { name } = req.query;
    console.log(name + " dwiadjoawjdwiao");
  

    const products = await Products.find({ name: new RegExp(name, 'i') });
    
   
    return res.status(200).json({ products });
  });
  

  const fileFilter = (req, file, call) => {
    const correct = /jpeg|jpg|png|gif/;
    const extname = correct.test(path.extname(file.originalname).toLowerCase());
    
    if (extname) {
      call(null, true);
    } else {
      call(new Error('Invalid file format. Only JPEG, PNG, and GIF are allowed.'));
    }
  };
  
  const upload = multer({ storage, fileFilter });
 
  /**
 * @swagger
 * /user/de:
 *   post:
 *     summary: upload file
 *     
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                image:
 *                 type: string
 *                 example: "johnD@northeastern.edu"
 *                email:
 *                 type: string
 *                 example: "temp/file.jpg"
 *                  
 *           
 *           
 *     responses:
 *       201:
 *          description: success
 *        
 *        
 *
 *      
 */
  app.post('/user/uploadImage', upload.single('image'), async (req, res) => {
  
      const { email } = req.body;
      console.log('req.body:', req.body);
  console.log('req.file:', req.file);
      
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
     
      if (user.image) {
        return res.status(400).json({ error: 'Image already exists for this user.' });
      }
      
      user.image = req.file.path;
      await user.save();
      return res.status(201).json({ message: 'Image uploaded successfully.', filePath: req.file.path });
    
  });
            


  const swaggerJsdoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  

  const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Assignment 8 API",
        version: "1.0.0",
        description: "API documentation for Assignment 8"
      }
    },
    apis: ["./main.js"] 
  };
  
  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  app.use("/swag", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  
  
app.listen(8000, () => {
});