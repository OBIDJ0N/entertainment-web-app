import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile, 
    updatePassword, 
    reauthenticateWithCredential, 
    EmailAuthProvider 
} from 'firebase/auth';
import { auth, db, storage } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import { 
    getDownloadURL, 
    ref as storageRef, 
    uploadBytes 
} from "firebase/storage";

const AuthService = {
    async userRegister(email, password) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await addDoc(collection(db, 'users'), {
            email: email,
            password: password,
            uid: userCredential.user.uid
        });
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
    },
    async reauthenticate(user, currentPassword) {
        const credential = EmailAuthProvider.credential(user.email, currentPassword);
        await reauthenticateWithCredential(user, credential);
    },
    async updateProfileDetails(user, name, password) {
        if (name) {
            await updateProfile(user, { displayName: name });
        }
        if (password) {
            await updatePassword(user, password);
        }
        return user
    },
    async uploadProfilePicture(user, file) {
        const imageRef = storageRef(storage, `profile-pictures/${user.uid}/${file.name}`);
        const snapshot = await uploadBytes(imageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        await updateProfile(user, { photoURL: downloadURL });
        return downloadURL;
    }
};

export default AuthService;
