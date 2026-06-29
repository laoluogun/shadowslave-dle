function RecipientClue({recipientName, recipientImg}) {
    return (
        <div className="recipient-card">
            <h2>{recipientName}</h2>
            <img src={recipientImg} alt="recipientname"/>
        </div>
    )
}

export default RecipientClue