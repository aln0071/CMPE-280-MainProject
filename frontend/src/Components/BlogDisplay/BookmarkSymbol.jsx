import React from "react";

export default function BookmarkSymbol({ color = "orange", size = 30, filled = false }) {
    return (
        <>
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width={size} height={size} viewBox="0 0 89.6564 130.9559">
                <g transform="matrix(1 0 0 1 44.93 65.58)" id="wHk64areK1BIgPBPAf8Oz"  >
                    <path style={{
                        stroke: color, strokeWidth: 1, strokeDasharray: "none", strokeLinecap: "butt", strokeDashoffset: 0, strokeLinejoin: "miter", strokeMiterlimit: 4, fill: filled ? color : "none", fillRule: "nonzero", opacity: 1
                    }} vector-effect="non-scaling-stroke" transform=" translate(0, 0)" d="M -0.09999 -0.10002 L -44.32819 64.97798 L -44.32819 -64.97797 L 44.3282 -64.97797 L 44.3282 64.97798 z" stroke-linecap="round" />
                </g>
            </svg>
        </>
    )
}