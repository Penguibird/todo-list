import * as React from 'react';
import '../style/ColoredRadio.scss';
//import {Fragment, useState, useEffect} from 'react';

type ColoredRadioProps = {
    color: string,
    setColor: (color: string) => void,
    //    selected: boolean,
}
export default function ColoredRadio(props: ColoredRadioProps) {

    return <button
        type="button"
        onClick={() => props.setColor(props.color)}
        style={{ backgroundColor: props.color }}
        className="colored-radio"
    >

    </button>
}