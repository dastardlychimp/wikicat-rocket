import React from 'react'
import styled from 'styled-components'

const AddButtonContainer = styled.div`
    display: inline-block;
    border-style: solid;
    border-width: ${props => props.borderWidth}px;
    border-radius: 50%;
    border-color: black;
    padding: ${props => props.padding}px;

    &:hover {
        background-color: ${props => props.color};
        border-color:${props => props.color};
        transition: all 0.3s ease 0s;
        box-shadow: 0 0 5px 1px rgba(0, 0, 0, .4);
    }

    &:hover line {
        stroke: white;
        transition: all 0.3s ease 0s;
    }
`

const AddButtonSvg = styled.svg`
    display: block;
    stroke: black;
    stroke-width: ${props => props.strokeWidth}px;
`

const AddButton = (props) => {
    const {size, onClick, hoverColor, disabled, ...other_props} = props
    const line_width = size / 20
    const padding = size * .25
    const inner_size = size - padding
    const half_inner_size = inner_size / 2
    const color = disabled ? "#59a66a" : props.hoverColor || "#45BA5e";

    const onClickCheckDisabled = () => {
        if (!disabled) {
            onClick()
        }
    }
    
    return (
        <AddButtonContainer
            onClick={onClickCheckDisabled}
            size={size}
            borderWidth={line_width}
            padding={padding}
            color={color}
            {...other_props}
        >
            <AddButtonSvg
                width={inner_size}
                height={inner_size}
                strokeWidth={line_width}
            >
                <line y2={inner_size} x2={half_inner_size} x1={half_inner_size}/>
                <line y1={half_inner_size} y2={half_inner_size} x2={inner_size}/>
            </AddButtonSvg>
        </AddButtonContainer>
    )
}

export default AddButton