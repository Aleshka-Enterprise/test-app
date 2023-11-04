import React, { useEffect, useState } from "react";
import TestsService from "../../services/tests/tests.service";
import { ITest } from "../../models/tests/tests";
import { Box, Grid, Typography } from "@mui/material";
import Paginator from "../../components/paginator/paginator";
import { useNavigate } from "react-router-dom";

interface HomeProps {
  setSelectedTest: (test: ITest) => void;
}

const PAGE_RANGE = 10;

/**
 * Домашняя страница со списком тестов
 */
const Home = ({ setSelectedTest }: HomeProps): React.ReactElement => {
  const [testsList, setTestsList] = useState<ITest[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    TestsService.getTestsList().then(res => {
      setPageCount(Math.ceil((res?.count || 0) / PAGE_RANGE))
      setTestsList([...res.results, ...res.results, ...res.results, ...res.results, ...res.results, ...res.results, ...res.results, ...res.results, ...res.results, ...res.results]);
    })
  }, []);

  return (
    <Box sx={{ background: "#F1F4F7", height: "100vh", padding: "0 360px" }}>
      <Typography sx={{ fontWeight: 600, fontSize: "30px", color: "#5E5C74", paddingTop: "50px" }}>Тесты онлайн</Typography>
      <Grid sx={{ marginTop: "35px" }} container columnSpacing={4}>
        {testsList?.map(test => {
          return (
            <Grid
              item
              xs={6}
            >
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
                  marginTop: "30px",
                  position: "relative",
    
                  "&:hover": {
                    boxShadow: "3px 6px 9px rgba(0, 0, 0, 0.15)",
                  }
                }}
                onClick={(): void => {
                  setSelectedTest(test);
                  navigate("preview");
                }}
                >
                <img style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "50%" }} src={test.img} alt={test.title}/>
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
          <Paginator onPageSelect={setCurrentPage} selectedPage={currentPage} pageCount={pageCount} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
