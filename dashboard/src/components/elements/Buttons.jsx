
export const SubmitButton = (props) => {
  return (
    <button onClick={props.onClick}  className={ props.className } type="submit" >{ props.title }</button>
  )
}

export const DisabledButton = (props) => {
  return (
    <button 
    className={ props.className }
      style={{
        filter: "opacity(0.5)",
        color: "#fff",
        fontSize: "15px", pointerEvents: 
        "none" 
      }}>{props.title}
    </button>
  )
}

export const LoadingButton = () => {
  return (
    <button className="btn btn-brand-1 hover-up w-100"> <i className="fa fa-spinner fa-spin"></i> &nbsp; &nbsp; Submitting...</button>
)
}

