export type TUser = {
	photoURL: string | null,
	phoneNumber: string | null,
	displayName: string | null,
	emailVerified: boolean,
	isAnonymous: boolean,
	uid: string | null,
	email: string | null,
	providerData: ProviderData[] | null,
	providerId: string | null
};

interface ProviderData {
  email: string,
  providerId: string,
  photoURL: string,
  phoneNumber: string,
  displayName: string,
  uid: string
}

export type FUser = {
  name: string,
  userInfo: string,
	accessToken: string | null,
};
