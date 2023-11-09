import React, { useEffect, useState } from "react";
import TestsService from "../../services/tests/tests.service";
import { ITest, ITestCategory } from "../../models/tests/tests";
import { Box, Grid, Typography, Input } from "@mui/material";
import Paginator from "../../components/paginator/paginator";
import { useNavigate } from "react-router-dom";
import DropDown from "../../components/drop-down/DropDown";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import TestsStore from "../../store/tests";

interface HomeProps {
  setSelectedTest: (test: ITest) => void;
}

const PAGE_RANGE = 10;

/**
 * Домашняя страница со списком тестов
 */
const Home = observer(({ setSelectedTest }: HomeProps): React.ReactElement => {
  const [testsList, setTestsList] = useState<ITest[]>([]);
  const [currentPage, setCurrentPage] = useState<number>();
  const [pageCount, setPageCount] = useState<number>(0);
  const [search, setSearch] = useState<string>();
  const [categoryList, setCategoryList] = useState<ITestCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ITestCategory>();
  const navigate = useNavigate();

  useEffect(() => {
    TestsService.getCategoriesList().then(res => {
      setCategoryList([{ id: 0, title: "Все" }, ...res]);
    });

    setCurrentPage(TestsStore.currentPage ?? 1);
    TestsStore.selectedTestCategory && setSelectedCategory(TestsStore.selectedTestCategory);
    setSearch(TestsStore.search);
  }, []);

  useEffect(() => {
    return (): void => {
      TestsStore.selectedTestCategory = selectedCategory;
      TestsStore.search = search ?? "";
      TestsStore.currentPage = currentPage;
    };
  }, [currentPage, search, selectedCategory]);

  useEffect(() => {
    TestsService.getTestsList(currentPage, search, selectedCategory?.id).then(res => {
      setPageCount(Math.ceil((res?.count || 0) / PAGE_RANGE));
      setTestsList(res.results);
    });
  }, [currentPage, search, selectedCategory]);

  const debounceSearch = debounce(setSearch, 500);

  return (
    <Box sx={{ background: "#F1F4F7", height: "100vh", padding: "0 360px" }}>
      <Typography sx={{ fontWeight: 600, fontSize: "30px", color: "#5E5C74", paddingTop: "50px" }}>
        Тесты онлайн
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Input
          onChange={(e: React.ChangeEvent<HTMLInputElement>): void => debounceSearch(e.target.value)}
          placeholder='Поиск по тестам...'
          sx={{
            width: "600px",
            mb: "10px",
            mt: "20px",
          }}
        />
        <DropDown
          options={categoryList}
          name={selectedCategory?.title ?? "Категория"}
          onOptionSelect={setSelectedCategory}
          selectedOptionId={selectedCategory?.id}
        />
      </Box>
      <Grid container columnSpacing={4}>
        {testsList?.map(test => {
          return (
            <Grid item xs={6} key={test.id}>
              <Box
                sx={{
                  borderRadius: "10px",
                  cursor: "pointer",
                  display: "flex",
                  padding: "10px",
                  background: "white",
                  gap: "30px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  transition: "0.3s",
                  position: "relative",
                  marginTop: "30px",

                  "&:hover": {
                    boxShadow: "3px 6px 9px rgba(0, 0, 0, 0.15)",
                  },
                }}
                onClick={(): void => {
                  setSelectedTest(test);
                  navigate("/preview/");
                }}
              >
                <img
                  style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }}
                  src={test.img}
                  alt={test.title}
                />
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography>{test.title}</Typography>
                  <Typography
                    sx={{
                      position: "absolute",
                      bottom: "5px",
                      right: "20px",
                      fontSize: "12px",
                      color: "gray",
                    }}
                  >
                    Автор: {test.author.username}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      {pageCount > 1 && (
        <Box sx={{ position: "absolute", bottom: "35px", left: "calc(50% - 220px)" }}>
          <Paginator onPageSelect={setCurrentPage} selectedPage={currentPage ?? 1} pageCount={pageCount} />
        </Box>
      )}
    </Box>
  );
});

export default Home;
