import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, type FormEvent } from "react";

interface ButtonSearchIdProps {
  onSearch: (id: string) => void;
  onBack?: () => void;
  showBackButton: boolean;
}

export function ButtonSearchId({
  onSearch,
  onBack,
  showBackButton = false,
}: ButtonSearchIdProps) {
  const [id, setId] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id.trim() !== "") {
      onSearch(id);
      setId("");
    } else {
      alert("Informe um id ");
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <Input
        name="id"
        placeholder="Id do produto"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <Button type="submit" variant={"outline"} className="cursor-pointer">
        <Search />
        Buscar
      </Button>
      {showBackButton && onBack && (
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={onBack}
        >
          Voltar
        </Button>
      )}
    </form>
  );
}
