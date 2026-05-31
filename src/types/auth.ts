export type AuthFormState = {
  status?: string;
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    role?: string[];
    avatar_url?: string[];
    phone_number?: string[];
    _form?: string[];
  };
};

export type Profile = {
  id?: string;
  name?: string;
  avatar_url?: string;
  phone_number?: string;
  role?: string;
};
