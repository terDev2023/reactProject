import mongoose from 'mongoose';

const uri: string = `mongodb+srv://terntysemenov:Quality-2023@cluster0.lte7dgk.mongodb.net/REACT-PROJECT`;

const conectToMongoose = async () => {
  await mongoose.connect(uri)
  console.log('Прошло подключение')
};

mongoose.connection.on('error', err => {
  console.log('mongoose connection error: ', err);
});


export default conectToMongoose