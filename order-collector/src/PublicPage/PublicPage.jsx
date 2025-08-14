import { Link } from "react-router-dom";

function PublicPage(){
    return (
    <div>
        <h1>FlashCollect</h1>
        <p>Welcome to FlashCollect!</p>

        <p>Your all in one order collection management system, 
mainly aimed for entrepreneurs and small business owners.
<br></br>
Struggling to keep daily orders organized? 
No worries, we’re here to simplify your business operations and help you save time.</p>

<p>New here?, please register to use our system.<br></br>
For registered users, please login to your existing account.</p>

<div><p>Getting Started

    <br></br>

    Register or login to start using our system....

    <Link to={"/register"}>Register</Link>   
    <Link to={"/login"}>Login</Link>
</p>

<p></p>

</div>
    </div>);


    
}
export default PublicPage;