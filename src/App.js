import "./App.css";
import { useEffect, useState } from "react";
import StacksContainer from "./Components/StacksContainer";
import CardContainer from "./Components/CardContainer";
import Body from "./Components/Body";
import { DataStore } from "@aws-amplify/datastore";
import { User, Stacks } from "./models";
import { Button } from "antd";

function App() {
  const [stacks, setStacks] = useState([]);
  const [selectedStack, setSelectedStack] = useState(null);

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

  let selectStack = (stack) => {
    setSelectedStack(stack);
  };

  useEffect(() => {
    const func = async () => {
      const users = await DataStore.query(User, (user) =>
        user.username("eq", "adrian")
      );
      const stacks = await DataStore.query(Stacks, (s) =>
        s.userID("eq", users[0].id)
      );
      setStacks(stacks);
    };
    func();
  }, []);

  return (
    <div className="App">
      <div className="header">
        <Button type="primary" onClick={() => addUser()}>
          {" "}
          Add User
        </Button>{" "}
      </div>

      <div className="sidebar">
        <StacksContainer stacks={stacks} selectStack={selectStack} />
        <Button type="primary" onClick={() => addStack()}>
          {" "}
          +{" "}
        </Button>{" "}
      </div>

      <div className="body">
        {selectedStack && (
          <Body selectedStack={selectedStack} selectStack={selectStack} />
        )}
      </div>
    </div>
  );
}

export default App;
