[%bs.raw {|require('rsuite/lib/styles/index.less')|}];
[@bs.val] external document: Js.t({..}) = "document";

let style = document##createElement("style");
document##head##appendChild(style);
style##innerHTML #= Styles.style;

[@react.component]
let make = () => {
    <div>
      <h1>{ReasonReact.string("Hello React Suite")} </h1>
      <RsuiteUi.ButtonToolbar>
        <RsuiteUi.Button 
          appearance=`primary 
          href="https://rsuitejs.com/en/">
          {ReasonReact.string("Getting started")}
        </RsuiteUi.Button>
        <RsuiteUi.Button  
          href="https://rsuitejs.com/en/components/overview">
          {ReasonReact.string("Components")}
        </RsuiteUi.Button>
      </RsuiteUi.ButtonToolbar>
    </div>
};
