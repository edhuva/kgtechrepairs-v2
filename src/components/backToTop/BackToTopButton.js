import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import './BackToTopButton.css';

// BackToTop Button
const BackToTopButton = () => {
    const [BackToTopButton, setBackToTopButton] = useState(false);

    useEffect (() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                setBackToTopButton(true)
            } else {
                setBackToTopButton(false)
            }
        }, [])
    })

    // backToTopButton handler
    const scrollup = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

  return (
    <div className="topButton">
      {BackToTopButton && (
        <button className="backToTopButton" title='Scroll up' onClick={scrollup}>
            <FontAwesomeIcon icon={faAngleDoubleUp}/>
        </button>
        )
      }
    </div>
  )
}

export default BackToTopButton
