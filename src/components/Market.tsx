import { FunctionComponent } from "react";
import Themes from "./smallComp/Themes";

interface MarketProps {

}

const Market: FunctionComponent<MarketProps> = () => {
    return (<section>
        <h1 className="fire-text">Market</h1>
        <Themes />

    </section>);
}

export default Market;