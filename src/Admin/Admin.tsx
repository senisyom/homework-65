import { useCallback, useEffect, useState } from "react";
import axiosAPI from "../axiosAPI";
import { PageApi, PagesApi } from "../types";
import { useNavigate } from "react-router-dom";

const initialStateToCustomer = {
  title: "",
  content: "",
};

interface Props {
  postToEdit?: PageApi;
}

const Admin: React.FC<Props> = ({ postToEdit }) => {
  const [page, setPage] = useState(initialStateToCustomer);
  const [loading, setLoading] = useState(false);
  const [pagesOptions, setPagesOptions] = useState<
    { id: string; title: string }[]
  >([]);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const navigate = useNavigate();

  const getPages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosAPI.get<PagesApi | null>("/pages.json");
      const pagesData = response.data;

      if (!pagesData) {
        console.log("Error");
        return;
      }

      const options = Object.keys(pagesData).map((key) => ({
        id: key,
        title: pagesData[key].title,
      }));
      setPagesOptions(options);
    } catch {
        console.error();
        
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getPages();
  }, [getPages]);

  const getPageData = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const pageId = e.target.value;
    setSelectedPageId(pageId);
    try {
      setLoading(true);
      const response = await axiosAPI.get<PageApi | null>(
        `/pages/${pageId}.json`
      );
      const pageData = response.data;

      if (!pageData) {
        return;
      }

      setPage(pageData);
    } catch {
      console.error();
    } finally {
      setLoading(false);
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setPage((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onButtonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPage = {
      title: page.title,
      content: page.content,
    };

    try {
      if (postToEdit) {
        await axiosAPI.put(`posts/${postToEdit}.json`, newPage);
        navigate("/pages/" + postToEdit);
      } else {
        await axiosAPI.post("posts.json", newPage);
        navigate("/pages/" + selectedPageId);
      }

      setPage(initialStateToCustomer);
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <div className="container w-50 mx-auto mt-4">
        <h2 className="mb-4">Edit pages</h2>
        <form onSubmit={onButtonSubmit}>
          <span>Choose a page</span>
          <select
            className="form-select mb-4 mt-3"
            aria-label="Default select example"
            onChange={getPageData}
          >
            <option value="">Select a page</option>
            {pagesOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.title}
              </option>
            ))}
          </select>

          <div className="form-floating mb-4">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              value={page.title}
              onChange={onChangeField}
              name="title"
            ></textarea>
            <label htmlFor="floatingTextarea">Заголовок</label>
          </div>

          <div className="form-floating mb-4">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea2"
              style={{ height: "100px" }}
              value={page.content}
              onChange={onChangeField}
              name="content"
            ></textarea>
            <label htmlFor="floatingTextarea2">Описание</label>
          </div>

          <button type="submit" className="btn btn-primary">
            {postToEdit ? "Edit" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
