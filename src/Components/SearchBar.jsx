import { useContext } from "react";
import { HiSearch } from "react-icons/hi";
import { Table_UserFormContext } from "../ContextAPI/Table_UserForm";

const SearchBar = () => {
    const { searchText,setSearchText } = useContext(Table_UserFormContext)

    const handleSearchText = (event) => {
        setSearchText(event.target.value);
    }

  return (
        <div className='border shadow-md shadow-gray-300 w-[250px] rounded-md relative border-gray-400 '>
            <input type='text' onChange={handleSearchText} value={searchText} className='px-3 py-2 rounded-md w-full focus:ring-1 cursor-pointer focus:ring-blue-300 outline-none ' placeholder='Search here...'/>
            <HiSearch className='absolute top-3 right-2 text-blue-500 '/>
        </div>
  )
}

export default SearchBar