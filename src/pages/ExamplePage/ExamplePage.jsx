import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { launchAction1 } from "./ExamplePageActions";

const ExamplePage = () => {
  const dispatch = useDispatch();

  const { dataExample } = useSelector((state) => state.examplePageReducer);

  const addMoreExamples = () => {
    const moreData = { name: "JavaScript", advanced: "+ ApiRest" };
    dispatch(launchAction1(moreData));
  };
  return (
    <>
      <button onClick={addMoreExamples}>Add more example</button>
      {dataExample.map((element, idx) => (
        <div key={idx}>
          <p>Nombre: {element.name}</p>
          <p>Advanzado: {element.advanced}</p>
          <hr />
        </div>
      ))}
    </>
  );
};

export default ExamplePage;
