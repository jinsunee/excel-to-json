import React, { useState } from "react";

import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
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
  border: 2px solid #b5b2ff; /* Green */
  background-color: transparent; /* Green */
  color: #b5b2ff;
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
  border: 1px solid #eaeaea;
`;

function App() {
  const [value, setValue] = useState();
  const [result, setResult] = useState();

  // value로 json 데이터를 만들어낸다.
  const convertToJSON = () => {
    // value가 공백일 때
    if (value === "") {
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
        if (j === fields.length - 1) {
          resultStr = resultStr.concat(`"${fields[j]}" : "${values[j]}"`);
        } else {
          resultStr = resultStr.concat(`"${fields[j]}" : "${values[j]}",`);
        }
      }
      resultStr = resultStr.concat("}");
    }

    resultStr = resultStr.concat("]");
    setResult(resultStr);
  };

  const convertToJSObject = () => {
    // value가 공백일 때
    if (value === "") {
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
      console.log(newString[i]);
      for (let j = 0; j < fields.length; j++) {
        console.log(fields[j], values[j]);
        if (j === fields.length - 1) {
          resultStr = resultStr.concat(`${fields[j]} : "${values[j]}"`);
        } else {
          resultStr = resultStr.concat(`${fields[j]} : "${values[j]}",`);
        }
      }
      resultStr = resultStr.concat("},");
    }

    resultStr = resultStr.concat("]");
    setResult(resultStr);
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
        placeholder="데이터를 복사해서 붙여넣으세요!"
      />
      <ButtonWrapper>
        <SubmitButtonFilled
          style={{ backgroundColor: "#D1B2FF" }}
          onClick={convertToJSON}
        >
          Convert JSON
        </SubmitButtonFilled>
        <SubmitButtonFilled onClick={convertToJSObject}>
          Convert JS Object
        </SubmitButtonFilled>
        <SubmitButtonBorder>Clear</SubmitButtonBorder>
      </ButtonWrapper>
      <h2>Result : </h2>
      <ResultWrapper>{result}</ResultWrapper>
    </Container>
  );
}

export default App;
