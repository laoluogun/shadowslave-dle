function InputField({guess, handleChange}) {
    return (
    <input 
                  value={guess} 
                  onChange={handleChange}
                  className="w-full bg-zinc-800/80 border border-zinc-500 rounded-none px-3 py-2 text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition"
                  placeholder="Type your guess here..."
                />
    )
}

export default InputField