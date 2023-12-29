import React, { useEffect, useState } from "react";
import TestsService from "../../services/tests/tests.service";
import { ITest, ITestCategory } from "../../models/tests/tests";
import { Box, Grid, Typography, Input } from "@mui/material";
import Paginator from "../../components/paginator/Paginator";
import DropDown from "../../components/drop-down/DropDown";
import { debounce } from "lodash";
import { observer } from "mobx-react";
import TestsStore from "../../store/TestsStore";
import HeaderMenu from "../../components/header/HeaderMenu";
import UsersStore from "../../store/UsersStore";
import TestCard from "../../components/test-card/TestCard";
import StyledImage from "../../components/styled-image/StyledImage";
import CreateImg from "../../assets/images/create.png";
import { cardMixin } from "../../utils/styles";
import { useNavigate } from "react-router-dom";

const PAGE_RANGE = 10;

interface TestsListProps {
  onlyUserTest?: boolean;
}

/**
 * Страница с тестами (домашняя страница и "Мои тесты")
 * @param onlyUserTest - Открыта страница "Мои тесты"
 */
const TestsList = observer(({ onlyUserTest }: TestsListProps): React.ReactElement => {
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
    TestsService.getTestsList(currentPage, {
      search,
      categoryId: selectedCategory?.id,
      author: onlyUserTest ? UsersStore.user?.id : undefined,
      published: onlyUserTest,
    }).then(res => {
      setPageCount(Math.ceil((res?.count || 0) / PAGE_RANGE));
      setTestsList(res.results);
    });
  }, [currentPage, search, selectedCategory]);

  const cardCreateTest = (): React.ReactElement => {
    return (
      <Box
        sx={cardMixin}
        onClick={(): void => {
          TestsService.createTest({
            title: "Новый тест",
            description: "Введите описание теста",
            author: UsersStore.user?.id as number,
            category: categoryList?.[1].id,
          }).then(res => {
            TestsStore.selectedTest = res;
            navigate("/create-test/");
          });
        }}
      >
        <StyledImage
          style={{
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "50%",
            display: "block",
            margin: 0,
          }}
          src={CreateImg}
        />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography>Создать новый тест</Typography>
        </Box>
      </Box>
    );
  };

  const debounceSearch = debounce(setSearch, 500);

  return (
    <Box sx={{ background: "#F1F4F7", height: "100vh" }}>
      <HeaderMenu />
      <Box sx={{ padding: "0 360px" }}>
        <Typography sx={{ fontWeight: 600, fontSize: "30px", color: "#5E5C74", paddingTop: "20px" }}>
          {onlyUserTest ? "Мои тесты" : "Тесты онлайн"}
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
          {onlyUserTest && (
            <Grid item xs={6}>
              {cardCreateTest()}
            </Grid>
          )}
          {testsList?.map(test => {
            return (
              <Grid item xs={6} key={test.id}>
                <TestCard test={test} />
              </Grid>
            );
          })}
        </Grid>
        {pageCount > 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: "35px",
              left: "0",
              width: "100vw",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Paginator onPageSelect={setCurrentPage} selectedPage={currentPage ?? 1} pageCount={pageCount} />
          </Box>
        )}
      </Box>
    </Box>
  );
});

export default TestsList;
