import React, { createContext, useState } from 'react';
import main from '../gemini';

// Create context
export const datacontext = createContext();
const assistantName = "Eva";

function UserContext({ children }) {
let[speaking, setSpeaking] = useState(false);
let [prompt, setprompt] = useState("listening...");
let [response, setResponse] = useState(false);


     function speak (text) {
          let text_speak = new SpeechSynthesisUtterance(text)
          text_speak.volume=1;
          text_speak.rate=1;
          text_speak.pitch=1;
          text_speak.lang='hi-GB';
          window.speechSynthesis.speak(text_speak);
     }

     async function aiResponse(prompt) {
          let text = await main(prompt)
          let newText =text.split("**")&&text.split("*")&&text.replace("google", "Shaurya Pratap Singh")&&text.replace("Google", "Shaurya Pratap Singh")
          setprompt(newText);
          speak(newText);
          setResponse(true);
          setTimeout(() => {
               setSpeaking(false);
          }, 5000)
          
     }

     let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
     let recognition = new speechRecognition();
     recognition.onresult = (e) => {
          let currentIndex = e.resultIndex
          let transcript = e.results[currentIndex][0].transcript;
          setprompt(transcript);
          takeCommand(transcript.toLowerCase());
     }

     function takeCommand(command) {
          if(command.includes("open") && command.includes("youtube")) {
               window.open("https://www.youtube.com/", "_blank");
               speak("Opening YouTube....");
               setprompt("Opening YouTube....");
               setResponse(true);
               setTimeout(() => {
                    setSpeaking(false);
               }, 5000)
          }
          else if(command.includes("open") && command.includes("instagram")) {
               window.open("https://www.instagram.com/", "_blank");
               speak("Opening Instagram....");
               setprompt("Opening Instagram....");
               setResponse(true);
               setTimeout(() => {
                    setSpeaking(false);
               }, 5000)
          }
          else if(command.includes("open") && command.includes("google")) {
               window.open("https://www.google.com/", "_blank");
               speak("Opening Google....");
               setprompt("Opening Google....");
               setResponse(true);
               setTimeout(() => {
                    setSpeaking(false);
               }, 5000)
          }
          else if(command.includes("open") && command.includes("whatsapp")) {
               window.open("https://www.whatsapp.com/", "_blank");
               speak("Opening Whatsapp....");
               setprompt("Opening Whatsapp....");
               setResponse(true);
               setTimeout(() => {
                    setSpeaking(false);
               }, 5000)
          }
          else if (command.includes("time")){
               let time = new
               Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
               speak(time);
               setprompt(time);
               setResponse(true);
               setTimeout(() => {
                    setSpeaking(false);
               }, 5000)
          }
          else if(command.includes("date")) {
               let date = new
               Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
               speak(date);
               setprompt(date);
               setResponse(true);
               setTimeout(() => {
                    setSpeaking(false);
               }, 5000)
          }
          else if (command.includes("your name") || command.includes("tumhara naam") || command.includes("aapka naam")) {
               speak(`My name is ${assistantName}`);
               setprompt(`My name is ${assistantName}`);
               setResponse(true);
               setTimeout(() => {
                    setSpeaking(false);
               }, 5000)
          }

          else{
               aiResponse(command);
          }
     }

     let value = {
         recognition,
         speaking,
         setSpeaking,
         prompt,
         setprompt,
         response,
         setResponse
     }

  return (
    <datacontext.Provider value={value}>
      {children}
    </datacontext.Provider>
  );
}

export default UserContext;
