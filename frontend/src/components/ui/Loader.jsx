import '../../css/Loader.css'

function Loader() {
  return (
    <div className="site-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 48 48" className="spinner">
        <defs>
          <linearGradient id="gradientFade" x1="20%" x2="50%" y1="60%" y2="100%">
            <stop offset="0%" className="spinner-gradient-stop" />
            <stop offset="0%" stopOpacity="90%" className="spinner-gradient-stop" />

            <stop offset="100%" stopOpacity="0%" className="spinner-gradient-stop" />
          </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="22" fill="transparent" stroke="url(#gradientFade)" strokeWidth="4" />
      </svg>
    </div>
  );
}

export default Loader;