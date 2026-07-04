function InputField({guess, handleChange}) {
    return (
    <input 
                  value={guess} 
                  onChange={handleChange}
                  className="w-full bg-gray-800/80 border border-gray-600 rounded-none px-3 py-2 text-white placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition"
                  placeholder="Type your guess here..."
                />
    )
}

export default InputField