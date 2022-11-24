import React, { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
  },
  background: {
    backgroundColor: "white",
  },
  welcome: {
    textAlign: "center",
  },
  logoSignIn: {
    height: 100,
    width: 100,
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

  errorMessage: {
    color: "#EB5A62",
    textAlign: "center",
  },

  // HOME

  roomCard: {
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  roomCardTop: {
    // borderColor: "red",
    // borderWidth: 2,
    marginTop: 20,
  },
  imageAnnonce: {
    height: 200,
    width: "100%",
    justifyContent: "flex-end",
  },
  roomCardPrice: {
    fontSize: 20,
    backgroundColor: "black",
    width: "20%",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  roomCardBottom: {
    // backgroundColor: "lightblue",
    flexDirection: "row",
    height: 90,
    marginTop: 15,
    marginBottom: 15,
  },
  roomInfos: {
    paddingTop: 5,
    // backgroundColor: "lightpink",
    flex: 3,
  },
  roomTitle: {
    fontSize: 20,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    // backgroundColor: "yellow",
    flex: 1,
    height: 90,
    width: 90,
    borderRadius: 50,
  },
  starsView: {
    flexDirection: "row",
    paddingRight: 10,
  },
  reviewsText: {
    color: "grey",
    fontSize: 17,
  },

  // ROOM

  imageCarouselCard: {
    height: 300,
    width: 450,
    justifyContent: "flex-end",
  },
  roomDescription: {
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  roomDetailsPadding: {
    paddingRight: 15,
    paddingLeft: 15,
  },

  map: {
    height: 300,
    // backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },

  // ACTIVITY INDICATOR
  activityIndicator: {
    justifyContent: "center",
    flex: 1,
  },
});
