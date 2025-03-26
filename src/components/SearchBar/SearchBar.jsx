import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    const inputValue = e.target.value;
    setInput(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      toast(`Please, enter a text to search the images`);
      return;
    }

    onSubmit(input);
  };

  return (
    <header>
      <form className={css.searchBar}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleInputChange}
        />
        <button type="submit" onClick={handleSubmit}>
          Search
        </button>
      </form>
    </header>
  );
}
