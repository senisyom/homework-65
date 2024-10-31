import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PageApi } from "../types";
import axiosAPI from "../axiosAPI";

const Pages = () => {
    
  const params = useParams();
  const pageName = params.pageName;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<PageApi | null>(null);

  const fetchData = useCallback(async () => {
    if (!pageName) return;
    try {
      setLoading(true);
      const response = await axiosAPI.get(`/pages/${pageName}.json`);
      const pageData = response.data;
      if (!pageData) {
        console.log("Something went wrong")
        setPage(null);
      } else {
        setPage({
          title: pageData.title,
          content: pageData.content,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {loading ? (
        <h2>Loading...</h2>
      ) : page ? (
        <div className="text-center">
          <h1>
            {page.title[0].toUpperCase()}
            {page.title.slice(1)}
          </h1>
          <p>{page.content}</p>
        </div>
      ) : (
        <h1>Ошибка при загрузке</h1>
      )}
    </>
  );
};

export default Pages;
