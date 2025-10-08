import {Route , Routes} from "react-router-dom";
import HomePage from "@/pages/Home/HomePage.tsx";
import AuthCallbackPage from "@/pages/authCallback/AuthCallbackPage.tsx";

function App() {

    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/auth-callback" element={<AuthCallbackPage/>}/>
            </Routes>
        </>
    );
}

export default App;