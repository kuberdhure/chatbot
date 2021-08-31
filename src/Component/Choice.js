import React from "react"
import "./Options.css"


const Choice = (props) => {
    const Choice = [
        {
            id: 1,
            text: "Yourself",
            handler: props.actionProvider.userLocation,
            
        },
        {
            id: 2,
            text: "Other",
            handler: props.actionProvider.otherState
           
        }
    ]

    const buttons = Choice.map(
        (item) => (
            <button key={item.id} onClick={item.handler} className="option-button">
                {item.text}
            </button>
        )
    )

    return <div className="options-div">{buttons}</div>
}



export default Choice;