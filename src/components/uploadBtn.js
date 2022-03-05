const UploadBtn = ({text, ...buttonProps}) => {
    return (
    <button className="btn btn-primary btn-block uploadBtn" {...buttonProps}>{text}</button>
    )
}

export default UploadBtn