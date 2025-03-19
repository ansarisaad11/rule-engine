import "./App.css";
import RuleBuilder from "./components/RuleBuilder";
import { Card, Divider } from "antd";

function App() {
  return (
    <>
      <Card>
        <h3>Rule</h3>
        <p>The offer will be triggered based on the rules in this section</p>
        <Divider />
        <RuleBuilder />
      </Card>
    </>
  );
}

export default App;
