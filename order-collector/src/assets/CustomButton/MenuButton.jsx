import "./MenuButton.css";
import { useContext, useEffect } from "react";
import { WebContext } from "../../Auth";
function MenuButtom() {
    const { menu } = useContext(WebContext);
    useEffect(() => {
        const checkBox = document.getElementById("burger");
        checkBox.checked = true;
    }, []);

    function MenuHandler(box_id) {
        const checkBox = document.getElementById(box_id);
        if (!checkBox.checked) {
            menu.current["menu"].style.maxWidth = "0px";
        }
        else { menu.current["menu"].style.maxWidth = "140px"; }
    }
    return (<div className="custom_btn">
        <label className="burger" for="burger">
            <input type="checkbox" id="burger" onClick={() => MenuHandler("burger")} />
            <span></span>
            <span></span>
            <span></span>
        </label>
    </div>);
}
export default MenuButtom;