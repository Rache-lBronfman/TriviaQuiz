import React,{useEffect,useState,useRef} from "react";
import questions from "../utils/questions"
import { Button, List, ListItem,ListItemText, Radio, RadioGroup, TextField} from "@material-ui/core";
import MarksComponent from "./MarksComponent";

const QuestionsList: React.FC = () => {

    const mark=useRef(0);
    const [submitPressed,setSubmitPressed]=useState(false);
    
    const userAnswersArray:string[]=["","","","","","","","","",""];
    const correctAnswersArray:string[]=[];
    const scoreArray:number[]=[];
    

    const randomArrayShuffle=(array:string[])=> {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }

    const handleChange=(answer:string,index:number)=>{
        console.log("a",answer,"i",index);
        userAnswersArray[index]=answer;
    }

    const submitTest=()=>{
        for(let i=0;i<correctAnswersArray.length;i++){
            if(userAnswersArray[i]===correctAnswersArray[i])mark.current=mark.current+scoreArray[i];
        }
        setSubmitPressed(true);
        console.log("!!",mark);
         
    }

    const renderQuestions=()=>{
        const listItems=questions.map(question => {
            correctAnswersArray.push(question.correctAns);
            scoreArray.push(+question.scores);
            let answersArray=[question.ans1,question.ans2,question.ans3,question.correctAns];
            answersArray=randomArrayShuffle(answersArray);
            return(
                <ListItem  key={question.question}>
                    <ListItemText>{question.question}</ListItemText>
                    <div>
                    <input type="radio" value={answersArray[0]} name={question.question} onChange={()=>handleChange(answersArray[0],+question.qIndex)}/> {answersArray[0]}
                    <input type="radio" value={answersArray[1]} name={question.question} onChange={()=>handleChange(answersArray[1],+question.qIndex)}/> {answersArray[1]}
                    <input type="radio" value={answersArray[2]} name={question.question} onChange={()=>handleChange(answersArray[2],+question.qIndex)}/> {answersArray[2]}
                    <input type="radio" value={answersArray[3]} name={question.question} onChange={()=>handleChange(answersArray[3],+question.qIndex)}/> {answersArray[3]}  
                    </div>
                </ListItem >);
        });
        
      return (
        <List>{listItems}</List>
      );
    }

    return (
       <div>
           {
               !submitPressed?
                <>
                {renderQuestions()}
                <Button variant="contained" color="primary" onClick={submitTest}>
                    Submit
                </Button>
            </>:
            submitPressed&&<MarksComponent lastMark={mark.current}/>
           }
           
           
       </div>
    );
};

export default QuestionsList;