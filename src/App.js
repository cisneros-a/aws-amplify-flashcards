import "./App.css";
import { useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { User, Stacks } from "./models";

function App() {
  let addUser = async () => {
    const user = {
      username: window.prompt("username"),
      password: window.prompt("password"),
      Stacks: [],
    };
    const newUser = await DataStore.save(new User(user));

    console.log(newUser);
  };

  //original userID: 148ee1c0-b57b-4c37-8ae8-394982f6ef56
  //secondary userID: 7f0e7347-7026-4dba-8d05-69b3be2521cb
  let addStack = async () => {
    const stack = {
      title: window.prompt("title"),
      userID: "7f0e7347-7026-4dba-8d05-69b3be2521cb",
      Cards: [],
    };
    const newStack = await DataStore.save(new Stacks(stack));

    console.log(newStack);
  };

  useEffect(() => {
    const func = async () => {
      const models = await DataStore.query(Stacks, (s) =>
        s.userID("eq", "148ee1c0-b57b-4c37-8ae8-394982f6ef56")
      );
      console.log(models);
    };
    func();
  }, []);
  return (
    <div className="App">
      <button onClick={() => addUser()}> Add User</button>
      <button onClick={() => addStack()}> Add Stack</button>
    </div>
  );
}

export default App;
