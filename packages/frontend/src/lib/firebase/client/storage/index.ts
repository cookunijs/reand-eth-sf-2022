import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';

// NOTE: https://firebase.google.com/docs/storage/web/upload-files?hl=ja#manage_uploads
export const uploadStorageFile = async (
  file: Blob | File | Uint8Array | ArrayBuffer,
  child: string
) => {
  const storage = getStorage();
  const storageRef = ref(storage, child);
  return await uploadBytesResumable(storageRef, file);

  // // Pause the upload
  // uploadTask.pause();

  // // Resume the upload
  // uploadTask.resume();

  // // Cancel the upload
  // uploadTask.cancel();
};

// https://firebase.google.com/docs/storage/web/download-files?hl=ja#download_data_via_url
export const getStorageFileDownloadURL = async (child: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, child);
  return await getDownloadURL(storageRef);
};

// https://firebase.google.com/docs/storage/web/delete-files?hl=ja#delete_a_file
export const deleteStorageFile = async (child: string) => {
  const storage = getStorage();
  const storageRef = ref(storage, child);
  return await deleteObject(storageRef);
};
