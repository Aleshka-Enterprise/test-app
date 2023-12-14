import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { ITest } from "../../models/tests/tests";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import TestsStore from "../../store/TestsStore";
import { buttonMixin } from "../../utils/styles";
import UsersStore from "../../store/UsersStore";
import EditableTypography from "../../components/editable-typography/EditableTypography";
import TestsService from "../../services/tests/tests.service";
import StyledImage from "../../components/styled-image/StyledImage";

/**
 * Предпросмотр выбранного теста
 */
const TestPreview = observer((): React.ReactElement => {
  const navigate = useNavigate();
  const selectedTest = TestsStore.selectedTest as ITest;
  const editable = UsersStore.user?.id === selectedTest.author.id;

  const updateTest = (field: keyof ITest, value: string): void => {
    const editedTest = { ...selectedTest, [field]: value };
    TestsService.editTest({
      ...editedTest,
      category: editedTest.category.id,
      author: editedTest.author.id,
      img: undefined,
    }).then((): void => {
      TestsStore.selectedTest = editedTest;
    });
  };

  const handleImageClick = (): void => {
    if (editable) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (event): void => {
        const file = (event.target as HTMLInputElement)?.files?.[0];
        TestsService.editImg(file!, selectedTest.id).then(res => {
          TestsStore.selectedTest = res;
        });
      };
      input.click();
    }
  };

  return (
    <Box sx={{ height: "100vh", background: "#5e5e73", padding: "0 450px" }}>
      <Box sx={{ paddingTop: "50px" }}>
        <StyledImage
          src={selectedTest?.img}
          alt={selectedTest.title}
          style={{
            width: "200px",
            height: "200px",
            objectFit: "cover",
            borderRadius: "50%",
            margin: "0 auto",
            display: "flex",
          }}
          editable={editable}
          onClick={handleImageClick}
        />
        <EditableTypography
          onChange={(value: string): void => updateTest("title", value)}
          value={selectedTest.title}
          canChange={editable}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            color: "white",
            fontSize: "32px",
            fontWeight: 400,
            textAlign: "center",
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          {editable && (
            <Button
              onClick={(): void => {
                navigate("/edit-test/");
              }}
              sx={{ ...buttonMixin, marginTop: "30px", width: "200px" }}
            >
              Редактировать тест
            </Button>
          )}
          <Button
            onClick={(): void => {
              navigate("/test/");
            }}
            sx={{ ...buttonMixin, marginTop: "30px", width: "200px" }}
          >
            Начать тест
          </Button>
        </Box>
        <EditableTypography
          onChange={(value: string): void => updateTest("description", value)}
          value={selectedTest.description || ""}
          canChange={editable}
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            color: "white",
            fontSize: "18px",
            fontWeight: 400,
            margin: "20px auto",
            textAlign: "center",
          }}
        />
        <Typography
          sx={{
            color: "white",
            fontSize: "18px",
            fontWeight: 400,
            marginTop: "50px",
            position: "absolute",
            bottom: "30px",
          }}
        >
          Автор теста: {selectedTest.author.username}
        </Typography>
      </Box>
    </Box>
  );
});

export default TestPreview;
