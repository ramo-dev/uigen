  "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [name, setName] = useState("");
  const { push } = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    push(`/names/${name}`);
  };

  return (
    <div>
      <h1>Hello there</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          className="text-black"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
