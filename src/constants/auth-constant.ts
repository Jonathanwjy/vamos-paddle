export const INITIAL_LOGIN_FORM = {
  email: "",
  password: "",
};

export const INITIAL_STATE_LOGIN_FORM = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    _form: [],
  },
};

export const INITIAL_STATE_PROFILE = {
  id: "",
  name: "",
  phone_number: "",
  role: "",
  avatar_url: "",
};

export const INITIAL_CREATE_USER_FORM = {
  name: "",
  role: "",
  avatar_url: "",
  phone_number: "",
  email: "",
  password: "",
};

export const INITIAL_STATE_CREATE_USER = {
  status: "idle",
  errors: {
    email: [],
    password: [],
    name: [],
    role: [],
    phone_number: [],
    avatar_url: [],
    _form: [],
  },
};

export const INITIAL_STATE_UPDATE_USER = {
  status: "idle",
  errors: {
    name: [],
    role: [],
    avatar_url: [],
    phone_number: [],
    _form: [],
  },
};
