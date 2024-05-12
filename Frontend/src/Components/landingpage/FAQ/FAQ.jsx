import React from 'react'
import './Faq.css'

const FAQ = () => {

    const handleToggle = (e) => {
        
        const question = e.target 
        const answer = e.target.nextSibling 

        if(question.classList.contains('faq-accordion-question-button-active')) {
            question.classList.remove('faq-accordion-question-button-active')
            answer.classList.remove('faq-accordion-answer-active')
        } else {
            // // reset 
            const openQuestions = document.querySelectorAll('.faq-accordion-answer-active')
            const openBtn = document.querySelectorAll('.faq-accordion-question-button-active')
            openQuestions?.forEach(item => item.classList.remove('faq-accordion-answer-active'))      
            openBtn?.forEach(btn => btn.classList.remove('faq-accordion-question-button-active'))

            question.classList.add('faq-accordion-question-button-active')           
            answer.classList.toggle('faq-accordion-answer-active')
        }
    }

    const data = [
        {
          id: 1,
          question: "What is SkillSync Pro?",
          answer: "SkillSync Pro is a comprehensive platform designed to streamline the recruitment process by offering features such as skill assessments, resume management, interview scheduling, and more."
        },
        {
          id: 2,
          question: "How can I sign up for SkillSync Pro?",
          answer: "To sign up for SkillSync Pro, visit our website and click on the 'Sign Up' button. Follow the instructions to create your account and start using our platform."
        },
        {
          id: 3,
          question: "What types of skill assessments are available on SkillSync Pro?",
          answer: "SkillSync Pro offers a wide range of skill assessments covering various domains such as programming, communication skills, leadership, and more. These assessments are designed to help employers evaluate candidates effectively."
        },
        {
          id: 4,
          question: "Can I customize the skill assessments on SkillSync Pro?",
          answer: "Yes, SkillSync Pro allows employers to customize skill assessments according to their specific requirements. You can create custom assessment tests tailored to your job roles and industry."
        },
        {
          id: 5,
          question: "How does SkillSync Pro help with resume management?",
          answer: "SkillSync Pro provides tools for efficient resume management, allowing employers to upload, organize, and analyze resumes easily. The platform extracts key information from resumes, such as skills, experience, and education, making it easier to identify qualified candidates."
        }
        // Add more FAQs as needed
    ];
      

    return (
        <div className='md:faq-accordion df flex justify-center my-20'>
           <div id="faq" className="faq-accordion-container"
           data-aos="fade-in" data-aos-delay="250" data-aos-duration="500"
           >
               <div className="faq-accordion-content">
                   <h1 className="faq-accordion-title">FAQ</h1>

                    {data.map((item)=>(
                   <div className="faq-accordion-question" key={item.id}>
                        <button className="faq-accordion-question-button" 
                        onClick={handleToggle}> {item.question}
                        </button>
                        <div className="faq-accordion-answer">
                            <p> {item.answer}</p>
                        </div>
                   </div>
                    ))}
                    
               </div>
           </div>
        </div>
    )
}

export default FAQ