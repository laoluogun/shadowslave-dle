function VolumeClue({volume, chapter}) {
    return(
         <div className="border border-zinc-400 bg-zinc-900/80 rounded-none p-4 mt-3 text-center transition-opacity duration-300">
              <p className="text-white font-semibold text-lg">{volume}</p>
              <p className="text-white font-semibold text-lg">{chapter}</p>
         </div>
    )
}

export default VolumeClue