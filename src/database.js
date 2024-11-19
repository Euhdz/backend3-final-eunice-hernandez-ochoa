import 'dotenv/config';
import mongoose from 'mongoose';

const connection = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to database"))
.catch((error) => console.log(error));

