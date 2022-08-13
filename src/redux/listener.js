import store from "./store";

let currentAuth;

const listener = () => {
  let previousAuth = currentAuth;

  //   ambil auth redux dari store
  currentAuth = store.getState().auth;

  //   jika tidak ada di lcal maka akan set
  if (currentAuth !== previousAuth) {
    localStorage.setItem("auth", JSON.stringify(currentAuth));
  }
};

const listen = () => {
  store.subscribe(listener);
};

export { listen };
