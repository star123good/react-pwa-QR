import React from "react";
import { dablLoginUrl } from "../config";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true, token: action.token, party: action.party, role: action.role };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  const party = localStorage.getItem("daml.party")
  const token = localStorage.getItem("daml.token")
  const role = localStorage.getItem("daml.role")



  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!token,
    token,
    party,
    role
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}




async function loginUser(dispatch, party, userToken, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  // Local access token
  const token =
    // local environment token
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwczovL2RhbWwuY29tL2xlZGdlci1hcGkiOnsibGVkZ2VySWQiOiJMb2NpIiwiYXBwbGljYXRpb25JZCI6ImZvb2JhciIsImFjdEFzIjpbIk9wZXJhdG9yIl0sInJlYWRBcyI6WyJPcGVyYXRvciJdfX0.UR44QAEaopMaXDWwzz3M4x_U6GYuGPAPvBZ6uc4vpH0"

  // ProjectDable token for Operator on Ledger ecjcay92kqxdsdpd

  // "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImRhYmwtMzgyOGU4MTMtODA4NC00OWM5LThlODgtYmZhZGZiY2RhMDNmIn0.eyJpc3MiOiJwcm9qZWN0ZGFibC5jb20vbG9naW4iLCJzdWIiOiJhdXRoMHw1ZTk5YjVmYjFiMzBlYzBjODViZTc4MjEiLCJleHAiOjE2MDI2OTk3MTIsImh0dHBzOi8vZGFtbC5jb20vbGVkZ2VyLWFwaSI6eyJhY3RBcyI6WyJsZWRnZXItcGFydHktOTY0NjA5N2UtMmU1My00ZDhlLWIyZWQtZmVkNmVkZTAyMDJkIl0sImFwcGxpY2F0aW9uSWQiOiJEQUJMIiwibGVkZ2VySWQiOiJuOXVpYmpka3JqMWRkcXlzIn0sIm93bmVyIjoidXNlci1ncmFudC05ZGVjYzcyZC1kZDdlLTQwNmItOWUwNS05YjBkNjFlZDdmZTQiLCJwYXJ0eU5hbWUiOiJPcGVyYXRvciIsInJpZ2h0cyI6WyJyZWFkIiwid3JpdGU6Y3JlYXRlIiwid3JpdGU6ZXhlcmNpc2UiXX0.pfbBvncrWPlMgDVeebp8huyUibjURWTLN4APid2CwPfX0xu8tRj5AmCw5xOKZtiyoqHO0EeEJCybJx3r8XyjKs4XfVnsjF0F5vQhY_ljS2RTe_vJjP37-ujjsBQLmG9E4Wlmfx4UeD_iOQnBGvzjgoipFkV4F68y4idNlbbFLXg"

  const headers = {
    "Authorization": `Bearer ${token.toString()}`,
    'Content-Type': 'application/json'
  }

  const siteSubDomain = (path = '/data/') => {
    if (window.location.hostname === 'localhost') {
      return window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }

    let host = window.location.host.split('.')
    const ledgerId = host[0];
    let apiUrl = host.slice(1)
    apiUrl.unshift('api')

    return apiUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + path + ledgerId;
  }

  const post = (url, options = {}) => {
    Object.assign(options, { method: 'POST', headers });

    return fetch('//' + siteSubDomain() + url, options);
  }

  /* const fetchPublicToken = async () => {
    const response = await fetch('//' + siteSubDomain('/api/ledger/') + '/public/token', { method: 'POST' });
    const jsonResp = await response.json();
    const accessToken = jsonResp['access_token'];
    return accessToken;
  } */



  let role = 'Vendor';
  if (!!party) {
    // NEW CODE HERE TO RETRIEVE ROLE FROM RoleOne (Role data element)

    // let failedStatus = false;
    const fetchUpdate = async () => {
      console.log("insidefetch");
      try {

        const contractResponse = await post('/v1/query', {
          body: JSON.stringify({
            "templateIds": ["Roles:PartyInvitation"],
            "query": { "party": party }
          })
        });

        const contractResponseJson = await contractResponse.json();
        if (contractResponseJson.status === 200) {
          role = contractResponseJson.result[0].payload.roletype
          console.log("[fetchUpdate] role", role);
        }
        else {
          role = "Operator";
        }
      }
      catch (err) {
        alert("Something went wrong with roletype");
        role = "Operator";
        // dispatch({ type: "LOGIN_FAILURE" });
        // setError(true);
        // setIsLoading(false);
        // failedStatus = true;
      }
    };

    await fetchUpdate();

    // if (failedStatus) return;
    // const token = userToken || createToken(party)
    localStorage.setItem("daml.party", party);
    localStorage.setItem("daml.token", token);

    // Role is retrieved from party Name
    // const role = localStorage.getItem("daml.party",party)
    localStorage.setItem("daml.role", role);


    setError(null);
    setIsLoading(false);

    dispatch({ type: "LOGIN_SUCCESS", token, party, role });
    console.log("role : " + role);

    history.push("/");
  } else {

    setError(true);
    setIsLoading(false);

    dispatch({ type: "LOGIN_FAILURE" });
  }
}

const loginDablUser = () => {
  window.location.assign(`https://${dablLoginUrl}`);
}

function signOut(event, dispatch, history) {
  event.preventDefault();
  localStorage.removeItem("daml.party");
  localStorage.removeItem("daml.token");
  // remove rand state
  localStorage.removeItem("daml.role");

  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

export { UserProvider, useUserState, useUserDispatch, loginUser, loginDablUser, signOut };
