import React, { useRef, useState, useEffect, useContext } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../keyboard/styles.css";
import Predictionary from "predictionary";

const KeyboardDemo = (props) => {
  
  const [input, setInput] = useState("");
  const [layout, setLayout] = useState("default");
  const keyboard = useRef();
  const [suggestions, setSuggestions] = useState();

  useEffect(() => {
    let predictionary = Predictionary.instance();
    predictionary.addWords(["apple", "apricot", "banana"]);
    let suggestions = predictionary.predict("b");
    console.log("Suggestions", suggestions);
  }, []);
  const onChange = (input) => {
    setInput(input);
    console.log("Input changed", input);
    let predictionary = Predictionary.instance();
    predictionary.addWords(["apple", "apricot", "banana"]);
    let result = predictionary.predict(input);
    setSuggestions(result);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setInput(input);
    keyboard.current.setInput(input);
  };

  return (
    <>
      <input
        value={input}
        placeholder={"Tap on the virtual keyboard to start"}
        onChange={onChangeInput}
        onFocus={true}
      />
      <h5>Suggestions</h5>
      {suggestions &&
        suggestions.map((suggestion) => {
          <p>{suggestion}</p>;
        })}
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
    </>
  );
};

export default KeyboardDemo;
