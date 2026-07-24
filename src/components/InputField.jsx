function InputField({guess, handleChange}) {
    return (
    <input 
                  value={guess} 
                  onChange={handleChange}
                  className="w-full  bg-zinc-900 rounded-none px-3 py-2 text-white placeholder:text-white focus:outline-none "
                  placeholder="Type your guess here..."
                />
    )
}

export default InputField