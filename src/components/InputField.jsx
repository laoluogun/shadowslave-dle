function InputField({guess, handleChange}) {
    return (
    <input 
                  value={guess} 
                  onChange={handleChange}
                  className="w-full border border-zinc-400 bg-zinc-900/80 rounded-none px-3 py-2 text-white placeholder:text-white focus:outline-none "
                  placeholder="Type your guess here..."
                />
    )
}

export default InputField