import React from 'react';
import {G, Svg, Circle as SvgCircle} from "react-native-svg";
import {Defs} from "react-native-svg/src/elements.web";

const Circle = () => {
    return (
        <Svg
            width="94.191666mm"
            height="94.191666mm"
            viewBox={"0 0 94.191666 94.191666"}
            id="svg1"
        >
            <Defs/>
            <G id={"layer1"}>
                <SvgCircle
                    fill="#dddddd"
                    fillOpacity={1}
                    strokeWidth={5.29167}
                    id="path1"
                    cx="47.095833"
                    cy="47.095833"
                    r="47.095833"
                />
            </G>

        </Svg>
    );
};

export default Circle;