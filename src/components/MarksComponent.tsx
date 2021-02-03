import React,{useEffect} from "react";

const MarksComponent: React.FC<{lastMark:number}> = (props) => {

    useEffect(()=>{
       if(!lastMarks) sessionStorage.setItem('marksArray', props.lastMark.toString());
    })
    let lastMarks:string[]=[];

    const saveMarkToSessionStorage=()=>{
        if(lastMarks){
        
            const lm=lastMarks as string[];
            lastMarks=[...lm,props.lastMark.toString()];
            sessionStorage.setItem('marksArray', lastMarks.toString());
        }
        
    }

    const displayLastMarks=()=>{
        const marksArrayS=sessionStorage.getItem('marksArray');
        let marksArray=marksArrayS&&marksArrayS.split(",");
        if(marksArray===""||marksArray===null)marksArray=[];
        lastMarks=marksArray;

        const list=lastMarks as string[];
        if(lastMarks.length===0)return;
        return list.map((mark,i)=>{
            return <div key={i}>{mark}</div>
        })
       
    }

    return (
        <div>
            <h5>Last Marks:</h5>
            {
                displayLastMarks()}
                {
                saveMarkToSessionStorage()
            }
            <h3>{`your mark is ${props.lastMark}`}</h3>
        </div>
    );
};

export default MarksComponent;