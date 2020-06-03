import React, { Component } from "react";
var firebase = require('firebase');
var uuid =  require('uuid');

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

class Usurvey extends Component{

     SubmitName(event) {
        var studentName = this.refs.name.value;
         this.setState({studentName: studentName},function(){
     console.log(this.state);
        });
        }
        answerSelected(event){
            var answers = this.state.answers;
            if(event.target.name ==='answer1'){
                answers.answer1= event.target.value;
            }
            else if(event.target.name ==='answer2'){
                answers.answer2= event.target.value;
            }
            else if(event.target.name ==='answer3'){
                answers.answer3= event.target.value;
            }
            this.setState({answers:answers},function(){
                console.log(this.state)
            })
        }
        questionSubmit(){
           firebase.database().ref('uSurvey'+this.state.uid).set({
               studentName : this.state.studentName,
               answers : this.state.answers
           });
           this.setState({isSubmitted:true});  
        }
    constructor(props){
        super(props) ;
        this.state={
            uid: uuid.v1(),
            studentName : '',
            answers: {
                answer1: '',
                answer2: '',
                answer3: ''
            },
            isSubmitted : false
        }
    }
    render(){
        var studentName;
        var questions;
        this.SubmitName = this.SubmitName.bind(this);
        this.answerSelected = this.answerSelected.bind(this);
        this.questionSubmit = this.questionSubmit.bind(this);
        if(this.state.studentName === '' && this.state.isSubmitted===false ){
            studentName = <div>
                <h1>Hey Student,let us know ur name:</h1>
                <form onSubmit={this.SubmitName}>
                    <input type="text" placeholder="Enter your name" ref="name"/>
                </form>
            </div>;
            questions = '';          
        }
        else if(this.state.studentName!=='' && this.state.isSubmitted===false){
                studentName = <h1> Hi there, Welcome {this.state.studentName}</h1>
                questions= <div>
                    <h2>Good Luck   :</h2>
                    <form onSubmit={this.questionSubmit}>
                         <div>
                             <label>Best Team is ?</label><br/>
                             <input type="radio" name="answer1" value="RCA" onChange={this.answerSelected}/>RCA
                             <input type="radio" name="answer1" value="RAJA" onChange={this.answerSelected}/>RAJA
                         </div>
                         <div>
                             <label>Best Logo is ?</label><br/>
                             <input type="radio" name="answer2" value="Eagle" onChange={this.answerSelected}/>Eagle
                             <input type="radio" name="answer2" value="Aigle" onChange={this.answerSelected}/>Aigle
                         </div>
                         <div>
                             <label>Best Color is ?</label><br/>
                             <input type="radio" name="answer3" value="Green" onChange={this.answerSelected}/>Green
                             <input type="radio" name="answer3" value="White" onChange={this.answerSelected}/>White
                         </div>
                         <input type="submit" value ="Submit"/>
                    </form>
                </div>
        }
        else if( this.state.isSubmitted===true){
            studentName = <h1>Thanks,{this.state.studentName}</h1>
        }
        return(
            <div>
               {studentName}
               ------------------------
               {questions} 
            </div>
        );
    }
}

export default Usurvey;