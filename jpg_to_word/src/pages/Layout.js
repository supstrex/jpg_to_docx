import { Outlet, Link } from "react-router-dom";

function Layout(props) {
  /*If there is already downloaded file, clear it's info*/
  function onClick(){
    if(props.download.isReady){
      props.clearDownload();
    }
  }
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={onClick}>Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
      <footer></footer>
    </>
  );
}

export default Layout;
