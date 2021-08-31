import React from "react"
import "./Options.css"
const Options = (props) => {
    const options = [
        {
            text: "Food",
            handler: props.actionProvider.food,
            id: 1,
        },
        {
            text: "Clothes",
            handler: props.actionProvider.clothes,
            id: 2,
        },
        {
            text: "Shelter",
            handler: props.actionProvider.shelter,
            id: 3,
        },
        {
            text: "Medical",
            handler: props.actionProvider.medical,
            id: 4,
        }
    ]

    const buttons = options.map(
        (option) => (
            <button key={option.id} onClick={option.handler} className="option-button">
                {option.text}
            </button>
        )
    )

    return <div className="options-div">{buttons}</div>
}



export default Options