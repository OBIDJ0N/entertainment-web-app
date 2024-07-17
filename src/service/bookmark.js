import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, getDocs, query, where, setDoc, doc, deleteDoc } from "firebase/firestore";

const BookmarkService = {
  async addBookmark(cardData) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const db = getFirestore();
      const bookmarksCollection = collection(db, `users/${userId}/bookmarks`);
      const q = query(bookmarksCollection, where("id", "==", cardData.id));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        const newBookmarkRef = doc(bookmarksCollection, cardData.id.toString());
        await setDoc(newBookmarkRef, cardData);
        console.log("Bookmark added successfully!");
      } else {
        console.log("Bookmark already exists!");
      }
    } else {
      console.error("You must be signed in to add a bookmark");
    }
  },

  async removeBookmark(cardId) {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userId = user.uid;
      const db = getFirestore();
      const bookmarkDoc = doc(db, `users/${userId}/bookmarks/${cardId}`);
      await deleteDoc(bookmarkDoc);
      console.log("Bookmark removed successfully!");
    } else {
      console.error("You must be signed in to remove a bookmark");
    }
  },

  async getBookmarks() {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const userId = user.uid;
          const db = getFirestore();
          const bookmarksCollection = collection(db, `users/${userId}/bookmarks`);
          const bookmarksSnapshot = await getDocs(bookmarksCollection);
          const bookmarks = bookmarksSnapshot.docs.map(doc => doc.data());
          resolve(bookmarks);
        } else {
          reject("You must be signed in to view bookmarks");
        }
      });
    });
  }
};

export default BookmarkService;
