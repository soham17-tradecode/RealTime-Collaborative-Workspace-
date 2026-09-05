import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import Dashboard from "./Dashboard";

function Home({user}) {

    return (

        <>
            <Navbar user={user}/>
            <Hero user={user}/>
        </>

    );
}

export default Home;