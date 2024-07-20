import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth, db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

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
        try {
            await reauthenticateWithCredential(user, credential);
        } catch (error) {
            throw new Error('Reauthentication failed: ' + error.message);
        }
    },
    
    async updateProfileDetails(user, name, password) {
        try {
            if (name) {
                await updateProfile(user, { displayName: name });
            }
            if (password) {
                await updatePassword(user, password);
            }
            return 'Profile updated successfully.';
        } catch (error) {
            throw new Error('Error updating profile: ' + error.message);
        }
    },
};

export default AuthService;
