import React, { useState } from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 300px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const SubmitButtonFilled = styled.button`
  background-color: #b5b2ff; /* Green */
  border: none;
  font-weight: bold;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
`;

const SubmitButtonBorder = styled.button`
  border: 2px solid #ffb2f5; /* Green */
  background-color: transparent; /* Green */
  color: #ffb2f5;
  font-weight: bold;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
`;

const ResultWrapper = styled.div`
  width: 100%;
  border-top: 1px solid #eaeaea;
`;

function App() {
  const [value, setValue] = useState();
  const [result, setResult] = useState();
  const [random, setRandom] = useState(false);

  // value로 json 데이터를 만들어낸다.
  const convertToJSON = () => {
    // value === empty string
    if (!value) {
      alert("No empty string");
      return;
    }

    const newString = value.split("\n");
    const field = newString[0];

    const fields = field.split(/\t/g);

    let resultStr = "[";
    for (let i = 1; i < newString.length; i++) {
      resultStr = resultStr.concat("{");
      const values = newString[i].split(/\t/g);
      for (let j = 0; j < fields.length; j++) {
        if (fields[j] === "id" || fields[j] === "itemCategory") {
          if (j === fields.length - 1) {
            resultStr = resultStr.concat(`"${fields[j]}" : ${values[j]}`);
          } else {
            resultStr = resultStr.concat(`"${fields[j]}" : ${values[j]},`);
          }
        } else {
          if (j === fields.length - 1) {
            resultStr = resultStr.concat(`"${fields[j]}" : "${values[j]}"`);
          } else {
            resultStr = resultStr.concat(`"${fields[j]}" : "${values[j]}",`);
          }
        }
      }
      resultStr = resultStr.concat("}");
    }

    resultStr = resultStr.concat("]");
    setResult(resultStr);
  };

  const convertToJSObject = () => {
    // value === empty string
    if (!value) {
      alert("No empty string");
      return;
    }

    const tmp = value.split("\n");

    const newString = getRandomizedArray(tmp.slice(1));

    console.log(newString);

    const field = tmp[0];
    console.log(field);

    const fields = field.split(/\t/g);

    let resultStr = "[";
    for (let i = 1; i < newString.length; i++) {
      resultStr = resultStr.concat("{");
      const values = newString[i].split(/\t/g);
      console.log(newString[i]);
      for (let j = 0; j < fields.length; j++) {
        // console.log(fields[j], values[j]);
        // if (fields[j] === "id" || fields[j] === "itemCategory") {
        if (fields[j] === "id" || fields[j] === "itemCategory") {
          if (j === fields.length - 1) {
            resultStr = resultStr.concat(`${fields[j]} : ${values[j]}`);
          } else {
            resultStr = resultStr.concat(`${fields[j]} : ${values[j]},`);
          }
        } else {
          if (j === fields.length - 1) {
            resultStr = resultStr.concat(`${fields[j]} : "${values[j]}"`);
          } else {
            resultStr = resultStr.concat(`${fields[j]} : "${values[j]}",`);
          }
        }
      }
      resultStr = resultStr.concat("},");
    }

    resultStr = resultStr.concat("]");
    setResult(resultStr);
  };

  const getRandomizedArray = (strArr) => {
    const strLength = strArr.length;
    const newArray = new Array(strLength);

    let i = 0;
    while (i < strLength) {
      const randomIndexValue = parseInt(Math.random() * strLength);

      if (!newArray[randomIndexValue]) {
        newArray[randomIndexValue] = strArr[i++];
      }
    }

    return newArray;
  };

  const clear = () => {
    setValue("");
  };

  return (
    <Container>
      <h1>
        Excel To <label style={{ color: "#5D5D5D" }}>Json/JS Object</label>{" "}
        Converter
      </h1>
      <TextArea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Copy excel data and paste in this!"
      />
      <ButtonWrapper>
        <SubmitButtonFilled
          style={{ backgroundColor: "#B2CCFF" }}
          onClick={convertToJSON}
        >
          Convert JSON
        </SubmitButtonFilled>
        <SubmitButtonFilled onClick={convertToJSObject}>
          Convert JS Object
        </SubmitButtonFilled>
        <SubmitButtonFilled
          style={{ backgroundColor: "#D1B2FF" }}
          onClick={() => setRandom(!random)}
        >
          {random ? "To Ordered" : "To Randomize"}
        </SubmitButtonFilled>
        <SubmitButtonBorder onClick={clear}>Clear</SubmitButtonBorder>
      </ButtonWrapper>
      <h2>Result : </h2>
      <ResultWrapper>{result}</ResultWrapper>
    </Container>
  );
}

export default App;
