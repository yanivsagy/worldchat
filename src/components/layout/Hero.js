import './hero.css';

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-text">
                <p className="hero-pretext">Welcome to</p>
                <p className="hero-title">WorldChat{ " " }<span role="img" aria-label="tent">🌎</span></p>
            </div>
        </div>
    );
};

export default Hero;