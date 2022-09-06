import { Outlet, Link } from "react-router-dom";
import bgVideo from "../media/background.mp4";
import convertMeLogo from "../media/convertMeIcon.png";

function Layout(props) {
  /*If there is already downloaded file, clear it's info*/
  function onClick() {
    if (props.download.isReady) {
      props.clearDownload();
    }
  }
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={onClick}>
                <img src={convertMeLogo} alt="Logo for ConvertMe app" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <footer>
        <video autoPlay loop muted>
          <source src={bgVideo} type="video/mp4" />
        </video>
      </footer>
    </>
  );
}

export default Layout;
