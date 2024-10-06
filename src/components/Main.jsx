import './Main.css'
import { assets } from '../assets/assets'


const Main = () => {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
  
    async function generateAnswer(e) {
      setGeneratingAnswer(true);
      e.preventDefault();
      setAnswer("Loading your answer... \n It might take upto 10 seconds");
      try {
        const response = await axios({
          url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${
            import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
          }`,
          method: "post",
          data: {
            contents: [{ parts: [{ text: question }] }],
          },
        });
  
        setAnswer(
          response["data"]["candidates"][0]["content"]["parts"][0]["text"]
        );
      } catch (error) {
        console.log(error);
        setAnswer("Sorry - Something went wrong. Please try again!");
      }
  
      setGeneratingAnswer(false);
    }

  return (
    <div className='main'>
        <div className="nav">
            <p>InfoMate</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            <div className="greet">
                <p><span>Hello, Homie.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div className="card">
                    <p>Suggest beautiful places to see on an upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div className="card">
                    <p>Tell me about React js and React native</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" placeholder='Enter a prompt here'/>
                        <img src={assets.send_icon} alt="" />
                </div>
                <p className="bottom-info">
                InfoMate may display inaccurate info, including about people, so double-check its responses. Your privacy and InfoMate Apps
                </p>
            </div>

        </div>
    </div>
  )
}

export default Main
