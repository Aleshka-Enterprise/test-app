import React, { useMemo } from "react";
import { Box, SxProps } from "@mui/material";

interface PaginatorProps {
  // Функция, вызываемая при изменении страницы
  onPageSelect: (index: number) => void;
  // Выбранная страница
  selectedPage: number;
  // Число страниц
  pageCount: number;
}

const elementMixin: SxProps = {
  padding: "8px 12px",
  borderRight: "1px solid rgba(0,0,0,.125)",
  "&:hover": {
    background: "#dee2e6",
  },
  "&.selected": {
    background: "beige",
  },
  "&.disabled": {
    cursor: "default",
    color: "#dee2e6",
    "&:hover": {
      background: "white",
    },
  },
};

const Paginator = ({ onPageSelect, selectedPage, pageCount }: PaginatorProps): React.ReactElement => {
  const pageList = useMemo(() => {
    const allPages: number[] = [];
    for (let i = 1; i <= pageCount; i++) {
      allPages.push(i);
    }
    const res = allPages.filter(el => el > 0 && el <= pageCount);
    const currentPageIndex = res.findIndex(el => el === selectedPage);
    let startIndex = Math.max(0, currentPageIndex - 2);

    if (startIndex + 5 > pageCount) {
      startIndex += pageCount - (startIndex + 5);
    }

    return res.slice(Math.max(startIndex, 0), Math.min(pageCount, startIndex + 5));
  }, [selectedPage, pageCount]);

  return (
    <Box
      sx={{
        width: "max-content",
        height: "40px",
        display: "flex",
        justifyContent: "center",
        border: "1px solid rgba(0,0,0,.125)",
        borderRight: "none",
        borderRadius: "4px",
        cursor: "pointer",
        color: "#007bff",
      }}
    >
      <Box
        sx={elementMixin}
        className={selectedPage <= 1 ? "disabled" : ""}
        data-testid='previous'
        onClick={(): void => {
          if (selectedPage > 1) {
            onPageSelect(selectedPage - 1);
          }
        }}
      >
        Предыдущая
      </Box>
      {pageList.map(page => {
        return (
          <Box
            sx={elementMixin}
            key={page}
            className={page === selectedPage ? "selected" : ""}
            onClick={(): void => {
              onPageSelect(page);
            }}
            data-testid='element'
          >
            {page}
          </Box>
        );
      })}
      <Box
        sx={elementMixin}
        className={selectedPage >= Math.max(...pageList) ? "disabled" : ""}
        data-testid='next'
        onClick={(): void => {
          if (selectedPage < Math.max(...pageList)) {
            onPageSelect(selectedPage + 1);
          }
        }}
      >
        Следующая
      </Box>
    </Box>
  );
};

export default Paginator;
