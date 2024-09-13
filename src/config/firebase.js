// import { initializeApp } from "firebase/app";
// import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { collection, doc, getDocs, getFirestore, setDoc, where } from "firebase/firestore";
// import { toast } from "react-toastify";

// const firebaseConfig = {
//   apiKey: "AIzaSyCzJlNFvB6YKP_iwZ_dTf-pt-no_-8mElI",
//   authDomain: "messenger-51393.firebaseapp.com",
//   projectId: "messenger-51393",
//   storageBucket: "messenger-51393.appspot.com",
//   messagingSenderId: "757441351760",
//   appId: "1:757441351760:web:4753e14ef754be00e48155"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);

// const signup = async (username,email,password) => {
//     try {
//         const res = await createUserWithEmailAndPassword(auth,email,password);
//         const user = res.user;
//         await setDoc(doc(db,"users",user.uid),{
//             id:user.uid,
//             username:username.toLowerCase(),
//             email,
//             name:"",
//             avatar:"",
//             bio:"Hey there, I'm using BenChat",
//             lastSeen:Date.now()
//         })
//         await setDoc(doc(db,"chats",user.uid),{
//             chatsData:[]
//         })
//     } catch (error) {
//         console.error(error)
//         toast.error(error.code.split('/')[1].split('-').join(" "));
//     }
// }

// const login = async (email,password) => {
//     try {
//         await signInWithEmailAndPassword (auth,email,password);
//     } catch (error) {
//         console.error(error);
//         toast.error(error.code.split('/')[1].split('-').join(" "));
//     }
// }

// const logout =async () => {
//     try {
//         await signOut(auth)
//     } catch (error) {
//         console.error(error);
//         toast.error(error.code.split('/')[1].split('-').join(" "));
//     }
// }

// const resetPass = async (email) => {
//     if (!email) {
//         toast.error("Enter your email")
//         return null;
//     }
//     try {
//         const userRef = collection(db,'users');
//         const q = query(userRef,where("email","==",email))
//         const querySnap = await getDocs(q);
//         if (!querySnap.empty) {
//             await sendPasswordResetEmail
//             (auth,email);
//             toast.success("Reset Email Sent")
//         }
//         else{
//             toast.error("Email does not exist")
//         }
//     } catch (error) {
//         console.error(error);
//         toast.error(error.message)
//     }
// }
// export {signup,login,logout,auth,db, resetPass}

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCzJlNFvB6YKP_iwZ_dTf-pt-no_-8mElI",
  authDomain: "messenger-51393.firebaseapp.com",
  projectId: "messenger-51393",
  storageBucket: "messenger-51393.appspot.com",
  messagingSenderId: "757441351760",
  appId: "1:757441351760:web:4753e14ef754be00e48155"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (username, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      username: username.toLowerCase(),
      email,
      name: "",
      avatar: "",
      bio: "Hey there, I'm using BenChat",
      lastSeen: Date.now()
    });
    await setDoc(doc(db, "chats", user.uid), {
      chatsData: []
    });
  } catch (error) {
    console.error("Signup Error:", error);
    toast.error("Signup failed. Please try again.");
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login Error:", error);
    toast.error("Login failed. Please check your credentials.");
  }
};

const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
    toast.error("Logout failed. Please try again.");
  }
};

const resetPass = async (email) => {
  if (!email) {
    toast.error("Enter your email");
    return;
  }
  try {
    const userRef = collection(db, 'users');
    const q = query(userRef, where("email", "==", email));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset Email Sent");
    } else {
      toast.error("Email does not exist");
    }
  } catch (error) {
    console.error("Password Reset Error:", error);
    toast.error("Failed to send password reset email.");
  }
};

export { signup, login, logout, auth, db, resetPass };
