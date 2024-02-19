import { Buffer } from "buffer";
import { Controller, Settings, Wrapper } from "./App.styles";

import { Deck } from "./components/Deck/Deck";
import { SubSubTitle } from "./components/SubSubTitle/SubSubTitle";
import { Profiles } from "./components/Controller/Profiles/Profiles";
import { Header } from "./components/Controller/Header/Header";
import { Debugger } from "./components/Controller/Debugger/Debugger";
import { useAppContext } from "./contexts/AppContext";
import { Plugins } from "./components/Controller/Plugins/Plugins";
import { Plugin } from "./components/Controller/Plugin/Plugin";
import classNames from "classnames";

// injected Buffer
window.Buffer = Buffer;

const App = () => {
  const { deck } = useAppContext();

  return (
    <div
      className={classNames({
        wrapper: true,
        hasDeck: !!deck.current,
      })}
    >
      <Wrapper>
        {deck.current ? (
          <>
            <Deck />
            <Controller
              $isOpen={deck.selectedKey !== undefined && deck.editMode}
            >
              <Header />
              <Profiles />
              {deck.selectedKey !== undefined && (
                <>
                  <Settings>
                    <SubSubTitle>currently selected key</SubSubTitle>
                    <span>{deck.selectedKey}</span>
                  </Settings>
                  <Settings>
                    <SubSubTitle>plugin</SubSubTitle>
                    <Plugins />
                  </Settings>
                  <Settings>
                    <Plugin />
                  </Settings>
                </>
              )}
              <small style={{ opacity: 0.5 }}>
                All changes are saved automaticly.
              </small>
              {window.location.search.includes("debug") && <Debugger />}
            </Controller>
          </>
        ) : (
          <div>
            <div>
              <h1>WEB DECK</h1>
              <p>Connect you usb device or create a virtual device.</p>
              <br />
            </div>
            <button onClick={deck.tryGetStreamDeck}>Connect</button>
            <small>-or-</small>
            <button onClick={deck.tryCreateVirtualDeck}>
              Create Virtual Device
            </button>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default App;
