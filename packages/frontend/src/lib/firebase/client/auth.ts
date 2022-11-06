import {
  getAuth as _getAuth,
  onAuthStateChanged as _onAuthStateChanged,
  updateProfile as _updateProfile,
  updateEmail as _updateEmail,
  sendEmailVerification as _sendEmailVerification,
  reauthenticateWithCredential as _reauthenticateWithCredential,
  signInWithRedirect,
  linkWithRedirect,
  getRedirectResult,
  unlink,
  signOut as _signOut,
  TwitterAuthProvider,
  AuthCredential,
  User,
  IdTokenResult,
  ParsedToken,
} from 'firebase/auth';
import { notInitializedApp } from '@lib/firebase/client';

export const getAuth = () => {
  if (notInitializedApp()) return null;
  return _getAuth();
};

export const onAuthStateChanged = async (): Promise<User | null> => {
  if (notInitializedApp()) return null;
  const auth = _getAuth();
  return new Promise(resolve => {
    const unsubscribe = _onAuthStateChanged(auth, user => {
      resolve(user);
      unsubscribe();
    });
  });
};

export const getIdTokenResult = async (): Promise<IdTokenResult | null> => {
  if (notInitializedApp()) return null;
  const auth = _getAuth();
  if (!auth.currentUser) return null;
  return await auth.currentUser.getIdTokenResult(true);
};

export const getClaims = async (): Promise<ParsedToken | null> => {
  if (notInitializedApp()) return null;
  const result = await getIdTokenResult();
  if (!result) return null;
  return result.claims;
};

export const updateProfile = async (profile: { displayName: string; photoURL: string }) => {
  if (notInitializedApp()) return null;
  const auth = _getAuth();
  if (!auth.currentUser) return null;
  return await _updateProfile(auth.currentUser, profile);
};

export const updateEmail = async (email: string) => {
  if (notInitializedApp()) return null;
  const auth = _getAuth();
  if (!auth.currentUser) return null;
  return await _updateEmail(auth.currentUser, email);
};

export const sendEmailVerification = async () => {
  if (notInitializedApp()) return null;
  const auth = _getAuth();
  if (!auth.currentUser) return null;
  return await _sendEmailVerification(auth.currentUser);
};

export const reauthenticateWithCredential = async (credential: AuthCredential) => {
  if (notInitializedApp()) return null;
  const auth = _getAuth();
  if (!auth.currentUser) return null;
  return await _reauthenticateWithCredential(auth.currentUser, credential);
};

export const signInByTwitter = async () => {
  if (notInitializedApp()) return null;
  const auth = _getAuth();
  const provider = new TwitterAuthProvider();
  return await signInWithRedirect(auth, provider);
};

export const linkByTwitter = async () => {
  if (notInitializedApp()) return null;
  const user = await onAuthStateChanged();
  if (!user) return;
  const provider = new TwitterAuthProvider();
  return await linkWithRedirect(user, provider);
};

export const getRedirectResultLinkByTwitter = async () => {
  if (notInitializedApp()) return null;
  const auth = _getAuth();
  const result = await getRedirectResult(auth);
  return result;
};

export const unlinkByTwitter = async () => {
  if (notInitializedApp()) return null;
  const user = await onAuthStateChanged();
  if (!user) return;
  const provider = new TwitterAuthProvider();
  return await unlink(user, provider.providerId);
};

export const signOut = async () => {
  if (notInitializedApp()) return null;
  const auth = _getAuth();
  return await _signOut(auth);
};
