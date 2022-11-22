import React, { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
  },
  welcome: {
    textAlign: "center",
  },
  logoSignIn: {
    height: 100,
    width: 100,
  },

  background: {
    backgroundColor: "white",
  },
  logoPageSignIn: {
    backgroundColor: "white",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
  },
  h1SignIn: {
    fontSize: 30,
    color: "grey",
    fontWeight: "bold",
    marginTop: 20,
  },
  inputBloc: {
    backgroundColor: "white",
    padding: 15,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    borderBottomColor: "pink",
    borderBottomWidth: 1,
  },
  buttonBloc: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  signInButton: {
    padding: 20,
    backgroundColor: "white",
    borderColor: "#EB5A62",
    borderWidth: 3,
    borderRadius: 50,
    width: "50%",
    marginBottom: 30,
    marginTop: 20,
  },
  buttonText: {
    color: "grey",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  errorMessage: {
    color: "#EB5A62",
    textAlign: "center",
  },

  logoPageSignUp: {
    backgroundColor: "white",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },

  passwordInputBloc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "pink",
    borderBottomWidth: 1,
  },
  passwordInput: {
    backgroundColor: "white",
    padding: 15,
  },
});
