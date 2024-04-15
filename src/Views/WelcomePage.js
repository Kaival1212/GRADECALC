import './WelCome.css';
import {Link} from 'react-router-dom';

export default function WelcomePage() {

    function getStarted() {
        // Navigate to the login page
        
    }

    return (
        <div className="MainDiv-WelcomPage">
            <div className="MainDiv-WelcomPage-title">GRADECALC</div>
            <div className="MainDiv-WelcomPage-subtitle">"Welcome to GRADECALC, where grades are made simple. Input your scores, weights, and criteria, and let us handle the rest. Say goodbye to manual calculations and hello to streamlined efficiency. Get started now and track your academic progress effortlessly</div>
            <Link className="MainDiv-WelcomPage-button" to={"/Main"}>Get Started</Link>
        </div>
    );
}
