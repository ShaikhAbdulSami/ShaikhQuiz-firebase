import React, { useEffect, useState } from "react";
import "./App.css";
import { quizData } from "./Service/QuizService";
import { QuizContentReqType, settingType } from "./Types/QuizType";
import firebase from './firebase'
//Components
import QuizCard from "./Components/QuizCard";
import Settings from "./Components/Setting";
import Result from "./Components/Result";
import Footer from "./Components/Footer";

function App() {
  //questions
  const [QuestionsOpts, setQuestionsOpts] = useState<QuizContentReqType[]>([]);
  //number of questions
  const [QuestionsCount, setQuestionsCount] = useState<number>(0);
  //result
  const [result, setresult] = useState<Boolean>(false);
  //score
  const [totalScore, setTotalScore] = useState<number>(0);
  //to stop sening initial request to api
  const [sendRequest, setSendRequest] = useState<boolean>(false);
  //new settings
  const [newsetting, setnewsetting] = useState<settingType>({
    numberOfQuestions: 5,
    difficulty: "",
    category: 9,
    categoryName: "",
    UserName: "",
  });

  // onSubmit function that will call on submit the the form after completing quiz
  const questionsHandler = (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    //to show result
    setresult(true);
  };

  //function will call when user click on new quiz button in result
  const NewQuiz = () => {
    // clearing following states
    setQuestionsOpts([]);
    setTotalScore(0);
    //to make question count to 0 so questions will start from Q1
    setQuestionsCount(0);
    //to close result card
    setresult(false);
    //to stop sening  initial request to api
    setSendRequest(false);
  };

  useEffect(() => {
    const fetchQues = async () => {
      if (sendRequest) {
        const fetchedData = await quizData(
          newsetting.numberOfQuestions,
          newsetting.difficulty,
          newsetting.category
        );
        setQuestionsOpts(fetchedData);
      }
    };
    fetchQues();
  }, [newsetting, sendRequest]);

  //-1 is putted so it can be compared with an array since array starts from 0
  let fetchedQuestions = QuestionsOpts.length - 1;


  // firebase config
  const messaging = firebase.messaging();
  messaging.getToken().then((currentToken : any) =>{
    if (currentToken) {
      console.log("Token" , currentToken);
    } else{
      console.log('No Instance ID token available. Request permission to generate one.');
    }
  }).catch((err : any) => {
    console.log('An error occurred while retrieving token. ', err);
  })

  return (
    <>
    <h1 className="head">Shaikh Quiz</h1>
      {QuestionsOpts.length ? (
        !result ? (
          <QuizCard
            questions={QuestionsOpts[QuestionsCount].questions}
            options={QuestionsOpts[QuestionsCount].options}
            answer={QuestionsOpts[QuestionsCount].answer}
            username={newsetting.UserName}
            fetchNumberOfQuestiuons={fetchedQuestions}
            TotalScore={setTotalScore}
            score={totalScore}
            QuestionsCountProps={{ QuestionsCount, setQuestionsCount }}
            callback={questionsHandler}

            // answer={QuestionsOpts[0].correct_answer}
          />
        ) : (
          <Result
            username={newsetting.UserName}
            totalScore={totalScore}
            numberOfQuestions={newsetting.numberOfQuestions}
            category={newsetting.categoryName}
            difficulty={newsetting.difficulty}
            callback={NewQuiz}
          />
        )
      ) : (
        <Settings
          setnewsetting={setnewsetting}
          setSendRequest={setSendRequest}
        />
      )}
      <div className="fixed-bottom">
        <Footer></Footer>
      </div>
    </>
  );
}

export default App;