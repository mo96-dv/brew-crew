const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
// const UserInfo = require('./models/UserInfo');
// const UserIdentety = require('./models/Identefier');
// const GoogleLogin = require('./models/GoogleLogin');
// const { OAuth2Client } = require('google-auth-library');

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

mongoose.connect(process.env.DATABASE_ACCESS, () => {
  console.log('database Connected');
});

// Trying To Use Routes Insted Of That Complex Code:
// Starting With The First Schema We Have (( UserInfo // Schema )) & The First Route We Have (( Users // Route))
// Here We Have Two Methods For ( Login / SingUp )

const usersRouters = require('./routes/Users');
app.use('/user', usersRouters);

// Serve Static assets If In Production
if (process.env.NODE_ENV === 'production') {
  // Set static Folder
  app.use(express.static(path.join(__dirname, 'Client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('api running');
  });
}

const port = process.env.PORT;
app.listen(port, () => console.log('Server Is Runing'));

// const infoRouter = require('./routes/Info');
// app.use('/info', infoRouter);

// IN (( RegisterForm )) :-

// POST THE NEW USER E-MAIL & PASSWORD TO THE SCHEMA
// app.post('/signup', (request, response) => {
//   const newUser = new UserInfo({
//     email: request.body.email,
//     password: request.body.password,
//   });
//   newUser
//     .save()
//     .then((data) => {
//       response.json(data);
//     })
//     .catch((error) => {
//       response.json(error);
//     });
// });

// VERTIFYING USER E-MAIL & PASSWORD TO MAKE SURE THAT THE IS EXIST
// app.post('/login', async (request, response) => {
//   const userEmail = await UserInfo.findOne({
//     email: request.body.email,
//   });

//   const userPassword = await UserInfo.findOne({
//     password: request.body.password,
//   });

//   try {
//     if (!userEmail || !userPassword) {
//       response.json('wrong user Or Password');
//     } else {
//       const user = await UserInfo.findOne(userEmail);
//       response.json({ response: 'valid', user: user });
//     }
//   } catch {
//     response.status(400).json('error');
//   }
// });

// ************************************************************

// IN (( UserInfo COMPONENT )) :-

// POST REQUEST TO THE ANSWERS FOR INDINTEFIER THE USER --TELL US MORE ABOUT YOUR SELF--
// app.post('/userInfo', (req, res) => {
//   const newUserIdentety = new UserIdentety({
//     name: req.body.name,
//     age: req.body.age,
//     hobbies: req.body.hobbies,
//   });
//   newUserIdentety
//     .save()
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => {
//       res.json(error);
//     });
// });

// ************************************************************

//  IN (( USERS COMPONENT )) :-

//  useEffect() HOOK TO GET ALL USERS :
// app.get('/allUsers', (req, res) => {
//   UserIdentety.find({}, (err, result) => {
//     try {
//       if (err) {
//         res.send(err);
//       } else {
//         res.send(result);
//       }
//     } catch (err) {
//       res.status(400).json('error');
//       console.log(`Error From Use Effect ${err}`);
//     }
//   });
// });

// if (err) {
//   res.send(err);
// } else {
//   res.send(result);
// }

// DELETE THE USER INFO FROM DATA BASE :
// app.delete('/remove/info/:id', async (req, res) => {
//   const id = req.params.id;

//   await UserIdentety.findByIdAndRemove(id)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => res.json(error));
// });

// app.delete('/delete/email/:id', async (req, res) => {
//   const id = req.params.id;

//   await UserInfo.findByIdAndRemove(id)
//     .then((data) => {
//       res.json(data);
//     })
//     .catch((error) => res.json(error));
// });

// ************************************************************

//  IN (( UsersTable COMPONENT )):

// GET THE OLD USER DATA AND PASS IT TO UPDATE USER COMPONENT TO SHOW IT IN THE UPDATE FORM
// app.get('/userData/:id', async (req, res) => {
//   const id = req.params.id;
//   try {
//     const userData = await UserIdentety.findById(id);
//     if (userData) {
//       res.send(userData);
//     } else {
//       res.send(error);
//     }
//     // res.send(result);
//   } catch (error) {
//     console.log(`Thats Error From Passing Data ${error}`);
//   }
// });

// try {
//   await UserIdentety.findById(id, (err, result) => {
//     if (result) {
//       res.send(result);
//     } else {
//       console.log(`Thats Error From Passing Data 1 ${err}`);
//     }
//     // res.send(result);
//   });
// } catch (error) {
//   console.log(`Thats Error From Passing Data ${error}`);
// }
// await UserIdentety.findById(id, (err, result) => {
//   if (err) {
//     res.send(err);
//     console.log(`Thats Error from Passing Data To The Form ${err}`);
//   } else {
//     res.send(result);
//   }
// });

// ************************************************************

// IN (( UpdateUser COMPONENT )):

// PUT REQUEST THE NEW UPDATED-USER INFO
// app.put('/update', async (req, res) => {
//   const newName = req.body.newName;
//   const newAge = req.body.newAge;
//   const newHobby = req.body.newHobby;
//   const id = req.body.id;

//   try {
//     const updatedUser = await UserIdentety.findById(id);
//     if (updatedUser) {
//       updatedUser.name = newName;
//       updatedUser.age = newAge;
//       updatedUser.hobbies = newHobby;
//       updatedUser.save().then(res.send(updatedUser));
//     } else {
//       res.send(error);
//     }
//   } catch (error) {
//     console.log(`Thats Error From Update 2 ${error}`);
//   }
// });

// try {
//   await UserIdentety.findById(id, (error, updatedUser) => {
//     console.log(updatedUser);
//     updatedUser.name = newName;
//     updatedUser.age = newAge;
//     updatedUser.hobbies = newHobby;
//     updatedUser.save().then(res.json(updatedUser));
//   });
// } catch (error) {
//   console.log(`Thats Error From Update 2 ${error}`);
// }
// ***********************************************************

// const Authenclient = new OAuth2Client(
//   '773069387302-d5cih0oc4n17tn3lq9d412dm6tokh8sb.apps.googleusercontent.com'
// );

// app.post('/googlelogin', (req, res) => {
// BECAUSE YOU LOGIN HERE WITH GOOGLE YOU MUST BE GO DIRECTLY TO ALL USERS PAGE
// THE VERFIYING HERE IS THE COMPAIRING OF THE TOKES IF ITS EXISTS THEN DONT MAKE A NEW ONE ELSE MAKE A NEW ONE TO DATA BASE;
// WE MAKING THE VERTIFY WITH 3RD PARTY LIBRERY THAT GIVE ACCESS TO THE TOKENS

// IF I'M OLD USER AND THEN: THE TOKEN AFTER COMPAIRING IS EXISTING
// iF I'M NEW USER THEN: THE TOKEN AFTER COMPAIRING FOUND NOTHING:

// MAKING THE VALIDATION FROM GOOGLE-AUTH-LIBRARY 3RD PARTY LIBRARY

//   const tokenId = req.body.tokenId;

//   Authenclient.verifyIdToken({
//     idToken: tokenId,
//     audience:
//       '773069387302-d5cih0oc4n17tn3lq9d412dm6tokh8sb.apps.googleusercontent.com',
//   }).then((response) => {
//     const email_verified = response.payload.email_verified;
//     const email = response.payload.email;
//     const name = response.payload.name;

//     if (email_verified) {
//       GoogleLogin.findOne({ email }).exec((err, googleUser) => {
//         if (googleUser) {
//           res.json({ response: 'GoogleGood', googleUser: googleUser });
//         } else {
//           const newGoogleClient = new GoogleLogin({
//             tokenId: tokenId,
//             email: email,
//             name: name,
//           });
//           newGoogleClient
//             .save()
//             .then((data) => {
//               res.json(data);
//             })
//             .catch((err) => {
//               res.json(err);
//             });
//         }
//       });
//     }
//   });
// });
