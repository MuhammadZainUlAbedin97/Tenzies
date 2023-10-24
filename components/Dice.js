export default function Dice(props){
    console.log(props)
    return(
        <div className="dice">
            {props.count}
        </div>
    )
}