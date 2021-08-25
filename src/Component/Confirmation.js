import React from "react"
import "./Options.css"


const Confirmation = (props) => {
    const Confirmation = [
        {
            id: 1,
            text: "Yes",
            handler: props.actionProvider.Yes

        },
        {
            id: 2,
            text: "No",
            handler: props.actionProvider.No
           
        }
    ]

    const buttons = Confirmation.map(
        (item) => (
            <button key={item.id} onClick={item.handler} className="option-button">
                {item.text}
            </button>
        )
    )

    return <div className="options-div">{buttons}</div>
}



export default Confirmation;