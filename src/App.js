import "./App.css";

import { DataStore } from "@aws-amplify/datastore";
import { User } from "./models";

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
  return (
    <div className="App">
      <button onClick={() => addUser()}> Add User</button>
    </div>
  );
}

export default App;
