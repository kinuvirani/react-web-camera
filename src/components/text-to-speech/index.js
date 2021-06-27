import React,{useState} from 'react';
import AWS from "aws-sdk";

const TextToSpeech = (props) => {
   const[text,settext]=useState({
    OutputFormat: "mp3",
    SampleRate: "16000",
    Text: "",
    TextType: "text",
    VoiceId: "Matthew",
   });
   const handleChange=(e)=>{
       settext({...text,[e.target.name]:e.target.value});
   }
     const speakText=()=>{
        connect();
             // Create the JSON parameters for getSynthesizeSpeechUrl
        // var speechParams = {
        //     OutputFormat: "mp3",
        //     SampleRate: "16000",
        //     Text: "",
        //     TextType: "text",
        //     VoiceId: "Matthew",
        //   };
        //   speechParams.Text = document.getElementById("textEntry").value;
  
          // Create the Polly service object and presigner object
          console.log("Final text Polly>>",text);
          var polly = new AWS.Polly({ apiVersion: "2016-06-10" });
          var signer = new AWS.Polly.Presigner(text, polly);
  
          // Create presigned URL of synthesized speech file
          signer.getSynthesizeSpeechUrl(text, function (error, url) {
            if (error) {
              document.getElementById("result").innerHTML = error;
            } else {
              console.log("Url",url);
              document.getElementById("audioSource").src = url;
              document.getElementById("audioPlayback").load();
              document.getElementById("result").innerHTML =
                "Speech ready to play.";
            }
          });
     }
    const connect=()=>{

            // Initialize the Amazon Cognito credentials provider
      AWS.config.region = "us-east-1"; // Region
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-east-1:47c46f2d-f5b1-4857-9d20-27b64cf32b2c",
      });
    }
    return (  <>
        <h1 style={{paddingLeft:"700px"}}>Text To Speech</h1>
      <div id="textToSynth" style={{paddingLeft:"700px"}}>
      <textarea
        rows="10"
        cols="30"
        type="text"
        id="textEntry"
        name="Text"
        onChange={handleChange}
        value={text.Text}
      ></textarea><br/>
      <button class="btn default" onClick={speakText}>Synthesize</button>
      <p id="result">Enter text above then click Synthesize</p>
    </div>
    <audio id="audioPlayback" controls style={{marginLeft:"700px"}}>
      <source id="audioSource" type="audio/mp3" src="" />
    </audio>
    </>);
}
 
export default TextToSpeech;