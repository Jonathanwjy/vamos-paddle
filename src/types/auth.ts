export type AuthFormState = {
  status?: "success" | "error" | "pending";
  errors?: {
    email?: string[];
    password?: string[];
    name?: string[];
    phone_number?: string[];
    role?: string[];
    avatar_url?: string[];
    _form?: string[];
  };
  message?: string;
};

export type Profile = {
  id?: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  phone_number?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  phone_number: string;
};
