import {Auth} from 'aws-amplify';

export const signup = user => {
  const {email, password} = user;
  delete user.password;
  return Auth.signUp({
    username: email,
    password,
    attributes: {...user},
  });
};

export const confirm = (email, confirmationCode) => {
  return Auth.confirmSignUp(email, confirmationCode);
};

export const resendSignUp = username => {
  return Auth.resendSignUp(username);
};

export const login = (email, password) => {
  return Auth.signIn(email, password);
};

export const logout = () => {
  return Auth.signOut({global: true});
};

export const forgotPassword = username => {
  return Auth.forgotPassword(username);
};

export const confirmNewPassword = (username, code, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await Auth.forgotPasswordSubmit(
        username,
        code,
        newPassword,
      );
      resolve(response);
    } catch (e) {
      // ALERT here we can check which error we are receiving
      reject(e.message);
    }
  });
};

export const isLoggedIn = () => {
  return Auth.currentAuthenticatedUser();
};

export const changeNewPassword = (oldPassword, newPassword) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await Auth.changePassword(
        user,
        oldPassword,
        newPassword,
      );
      resolve(response);
    } catch (e) {
      // ALERT here we can check which error we are receiving
      reject(e.message);
    }
  });
};

export const completeNewPassword = (user, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      const loggedUser = await Auth.completeNewPassword(user, password);
      resolve(loggedUser);
    } catch (e) {
      // ALERT here we can check which error we are receiving
      reject(e.message);
    }
  });
};
