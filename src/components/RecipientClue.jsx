function RecipientClue({recipientName, recipientImage}) {
    return (
                <div className="bg-zinc-700/80 border border-zinc-400 rounded-none p-4 mt-3 text-center text-white">
                  <p className="font-semibold text-lg">{recipientName}</p>
                  <img src={recipientImage} alt={recipientName} className="w-20 h-25 object-cover rounded-none border border-zinc-600 mx-auto mt-2"/>
                </div>
              )
}

export default RecipientClue