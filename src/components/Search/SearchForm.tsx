import { Input } from "reactstrap";
interface SearchForm {
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function SearchForm({ onInputChange }: SearchForm) {
  return (
    <Input
      placeholder="Search Shows"
      onChange={(e) => onInputChange(e)}
      type="search"
    />
  );
}

export default SearchForm;
