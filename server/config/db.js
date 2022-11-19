// import mongoose from 'mongoose';
// const { connect } = mongoose;

// export default async function connectDB() {
//   try {
//     await connect(process?.env?.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true
//     }).then ((res) => {
//       console.log(`MongoDB connected: ${res?.connections[0]?.host}`)
//     })
//   } catch (err) {
//     console.log(err);
//     process.exit(1);
//   }
// }