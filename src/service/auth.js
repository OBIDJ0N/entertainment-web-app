import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

const AuthService = {
    async userRegister(email, password) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        addDoc(collection(db, 'users'), {
            email: email,
            password: password,
            uid: userCredential.user.uid
        })
        return userCredential.user;
    },
    async userLogin(email, password) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    },
    async userLogout() {
        await signOut(auth);
    },
    onAuthStateChanged(callback) {
        return onAuthStateChanged(auth, callback);
    }
};

export default AuthService;
