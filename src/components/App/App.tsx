import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import axios from "axios";
import css from "./App.module.css";
import ReactPaginate from "react-paginate";
import { fetchArticles } from "../services/articleService";
import SearchForm from "../SearchForm/SearchForm";
import ArticleList from "../ArticleList/ArticleList";
// import fetchPerson from "../FetchPerson/FetchPerson";

// const fetchCharacter = async (id: number) => {
//   const response = await axios.get(`https://swapi.info/api/people/${id}`);
//   return response.data;
// };

export default function App() {
  const [topic, setTopic] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["articles", topic, currentPage],
    queryFn: () => fetchArticles(topic, currentPage),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.nbPages ?? 0;

  const handleSearch = async (newTopic: string) => {
    setTopic(newTopic);
    setCurrentPage(1);
  };
  // const [characterId, setCharacterId] = useState("");

  // const [count, setCount] = useState(1);

  // const { data, error, isLoading, isError } = useQuery({
  //   queryKey: ["person", count],
  //   queryFn: () => fetchPerson(count),
  // });
  // const { data, error, isLoading, isError } = useQuery({
  //   queryKey: ["character", characterId],
  //   queryFn: () => fetchCharacter(characterId),
  //   enabled: characterId !== "",
  // });

  // const handleSearch = (formData: FormData) => {
  //   const id = formData.get("id") as string;
  //   setCharacterId(id);
  // };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {isSuccess && totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurrentPage(selected + 1)}
          forcePage={currentPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel=">"
          previousLabel="<"
        />
      )}
      {isLoading && <p>Loading data, please wait...</p>}
      {isError && <p>Whoops, something went wrong! Please try again!</p>}
      {data && data.hits.length > 0 && <ArticleList items={data.hits} />}
      {/* <form action={handleSearch}>
        <input type="text" name="id" placeholder="Enter character ID" />
        <button type="submit">Search</button>
      </form> */}
      {/* <button onClick={() => setCount(count + 1)}>
        Get next character with ID{count}
      </button> */}
      {/* {isLoading && <p>Loading...</p>}
      {isError && <p>An error occurred: {error?.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 20)}</pre>} */}
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}
