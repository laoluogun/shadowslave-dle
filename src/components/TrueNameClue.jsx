function TrueNameClue({hasTrueName}) {
    return(
         <div className="border border-zinc-400 bg-zinc-900/80 rounded-none p-4 mt-3 text-center">
              <p className="text-white font-semibold text-lg">
                {`This character does ${ false === hasTrueName ? 'not' : ''} have a true name`}
              </p>
         </div>
    )
}

export default TrueNameClue