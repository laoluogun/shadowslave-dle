function RecipientClue({recipientName, recipientImage, isActive}) {
  return (
    <div
      className={`grid transition-[grid-template-rows] duration-0
        ${isActive ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr] mt-0'}`}
    >
      <div className="overflow-hidden">
        <div
          className={`border border-zinc-400 bg-zinc-900/80 rounded-none p-4 text-center
            transition-opacity  duration-500 ease-in-out
            ${isActive ? 'opacity-100' : 'opacity-0'}`}
        >
          <p className="text-white font-semibold text-lg">{recipientName}</p>
          <img src={recipientImage} alt={recipientName} className="w-20 h-25 object-cover rounded-none border border-zinc-600 mx-auto mt-2"/>
        </div>
      </div>
    </div>
  )
}

export default RecipientClue