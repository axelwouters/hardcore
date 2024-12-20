import Hardcore from "../assets/logo/Hardcore.webp"


const PopUp = (props) => {
    return (<div id="popUp">
        <p 
        className="closePopUp"
        >
            X
        </p>
        <h4>Félicitation le graffiteur</h4>
        <p>{props.msg}</p>
        <img src={Hardcore} />
        <button
        onClick={props.onClickClose}
        >
            Retours au achats de bombe aérosol
        </button>
    </div>)
}

export default PopUp