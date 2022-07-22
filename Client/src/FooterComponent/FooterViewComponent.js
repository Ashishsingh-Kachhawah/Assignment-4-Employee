import { resources } from "../Utility/StringResource";

const FooterView = () => {
    return (
      <>
        <div className="FooterView">
          <div className="subContainerOfFooter">
            <div className="footerimageContainer">
              <img src="../Images/utilizecoreLogo.png" alt="dummyPic" width={200} />
            </div>
            <div className="buttonContainerOfFooter">
              <button className="footerViewButton" onClick={() => window.open("https://play.google.com/store/apps/details?id=com.utilizecore")}> <img src="../Images/google-play.png" width="120" alt="dummyPic"/>  </button>
              <button className="footerViewButton" onClick={() => window.open("https://apps.apple.com/us/app/utilizecore/id1480524348")}> <img src="../Images/app-store.png" width="120" alt="dummyPic"/> </button>
            </div>
            <p className="copyright"> {resources.LOGIN.COPYRIGHT} </p>
            <p className="copyright">
              <span onClick={() => window.open("https://www.utilizecore.com/pages/terms-conditions")}> {resources.LOGIN.TERMS_CONDITION}</span>
              <span onClick={() => window.open("https://www.utilizecore.com/pages/terms-conditions?tab=privacyPolicy")}>{resources.LOGIN.PRIVACY_POLICY}</span>
            </p>
          </div>
  
        </div>
      </>
    )
  }

  export default FooterView;