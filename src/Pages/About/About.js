import React, {useContext} from "react";
import Auxiliary from "../../Components/HOC/Auxiliary";
import myImage from "../../Assets/My-picture.jpg";
import {Avatar} from "@material-ui/core";
import {AppContext}from "../../Context";
import Header2 from "../../Components/Player/Header/Header2";

const About =(props)=>{
    const context = useContext(AppContext);

    return(
        <Auxiliary>
            <section className="about-section flex-column main_library_container">
                <Header2 context={context}/>
                <div className="about-sub flex-column">
                    <div className="flex-column about-section-inner">
                       <Avatar  className="my-image" src={myImage} alt="Me" draggable="false" />
                       <h2>Hi, I'm Mahmoud</h2>

                       <p>I am a front end developer who is specialized in Vue.js, React.js, Javascript and other technologies. You can visit my portfolio to find more cool projects like this one <a target="_blank" rel="noopener noreferrer" href="https://mahmoudportfolio.netlify.app">Portfolio.</a></p>
                   </div>
                </div>
                
            </section>
        </Auxiliary>
    )
}
export default About;