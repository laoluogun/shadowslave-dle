import { classicCharacters } from "../data/classicCharacters"
import { createPortal } from 'react-dom'
import { useState, useRef, useEffect } from "react"
import upArrow from "../assets/images/up-arrow.png";
import downArrow from "../assets/images/down-arrow.png";
import InfoPopover from "./InfoPopover";

function Cell({ result, value, showArrow = false }) {
  const baseClasses = "flex flex-col items-center justify-center p-2 border rounded-none text-white text-center text-md font-semibold min-h-16 transition-all"
  
  const colorClasses = {
    correct: 'bg-green-800/80 border-green-600',
    partial: 'bg-yellow-700/80 border-yellow-500',
    incorrect: 'bg-red-900/80 border-red-700',
    higher: 'bg-red-900/80 border-red-700',
    lower: 'bg-red-900/80 border-red-700',
  }

  const arrowImage =
  result === "higher"
    ? upArrow
    : result === "lower"
    ? downArrow
    : null;


  const displayValue = Array.isArray(value) ? value.join(', ') :
    typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value
  
  return (
    <div className={`${baseClasses} ${colorClasses[result]} relative overflow-hidden`}>
      {arrowImage && (
        <img
          src={arrowImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 m-auto w-20 h-20 object-contain opacity-50 pointer-events-none select-none"
        />
      )}
      <span className="relative z-10">{displayValue}</span>
    </div>
  )
}

function ClassicGrid({ guessResults }) {
  const columns = ['name', 'gender', 'affiliations', 'currentRank', 'hasTrueName', 'debutVolume']
  const headers = ['Character', 'Gender', 'Race', 'Affiliations', 'Rank', 'True Name', 'Debut']
  const debutInfo = 'If a character has appeared in the story, then their volume debut will be when that appearance is. \nIf a character has not appeared in the story but has been mentioned, then their volume debut will be when their first mention is.\nFor example, Asterion was first mentioned in Chapter 367, but his first appearence was chapter 1840. Therefore his debut volume will be Volume 8.  \nWhereas Broken Sword has not appeared outside of anyone\'s memories or conversations, and his first mention was in Chapter 27 so his volume debut will be Volume 1.'
  
  return (
    <div className="w-full overflow-x-auto">
      {/* Header row */}
      <div className="grid grid-cols-7 gap-2 mb-1 min-w-150">
        {headers.map(header => (
          <div key={header} className="flex justify-center text-center text-xs uppercase tracking-widest text-zinc-400 py-1 gap-2">
            <p>{header}</p>
            <div>{
            header == 'Debut' && 
            <InfoPopover text={debutInfo} />
            }
            </div>
          </div>
        )
        )}
      </div>

      {/* Guess rows */}
      <div className="flex flex-col gap-1 min-w-150">
        {guessResults.map((result, index) => (
          <div key={index} className="grid grid-cols-7 gap-1">
            {/* Character cell — always show image + name, no color */}
            <div className="flex flex-col items-center justify-center bg-zinc-800/80 border border-zinc-600 rounded-none p-2 min-h-16">
              <img src={result.image} alt={result.name} className="w-12 h-15 object-cover rounded-none border border-zinc-600 mb-1"/>
              <span className="text-white text-md font-semibold text-center">{result.name}</span>
            </div>

            <Cell result={result.gender} value={result.genderValue} />
            <Cell result={result.race} value={result.raceValue} />
            <Cell result={result.affiliations} value={result.affiliationsValue} />
            <Cell result={result.currentRank} value={result.currentRankValue} showArrow />
            <Cell result={result.hasTrueName} value={result.hasTrueNameValue} />
            <Cell result={result.debutVolume} value={result.debutVolumeValue} showArrow />
          </div>
        ))}
      </div>
    </div>
  )
}
export default ClassicGrid