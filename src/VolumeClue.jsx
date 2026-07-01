function VolumeClue({volume, chapter}) {
    return(
         <div className="bg-gray-800/80 border border-gray-600 rounded-xl p-4 mt-3 text-center text-white">
              <p className="text-gray-300">{volume} - {chapter}</p>
         </div>
    )
}

export default VolumeClue