function TrueNameClue({hasTrueName}) {
    return(
         <div className="bg-zinc-700/80 border border-zinc-400 rounded-none p-4 mt-3 text-center text-white">
              <p className="text-zinc-300">
                {`This character does ${ false === hasTrueName ? 'not' : ''} have a true name`}
              </p>
         </div>
    )
}

export default TrueNameClue