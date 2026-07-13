function VolumeClue({volume, chapter}) {
    return(
         <div className="bg-zinc-700/80 border border-zinc-400 rounded-none p-4 mt-3 text-center text-white">
              <p className="text-zinc-300">{volume} - {chapter}</p>
         </div>
    )
}

export default VolumeClue