import { useEffect, useState } from "react";
import { update_icon } from "../../Orders/OrderCardModel";
import "./ScrollUpBtn.css";
function ScrollUpBtn() {
    let [visible, setVisible] = useState(false);
    //scroll to top
    const handle_scroll_up = () => {
        window.scrollTo({top : 0, behavior : "smooth"});
        console.log("scrolled up");
    }
    //add event listener to the the window when loaded
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 380 && !visible) {
                setVisible(true);
                return;
            }
            setVisible(false);
        });
        return window.removeEventListener("scroll", () => { });

    }, []);
    //just a conditional rendering
    //button will be shown when scroll pos > 380 
    //else hidden 
    //on click scroll to top and hide it back
    return (
        <>
            {visible ?
                <button onClick={() => { handle_scroll_up(); }} id="go-up" >{update_icon}</button>
                : null
            }
        </>
    );
}
export default ScrollUpBtn;