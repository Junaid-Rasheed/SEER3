import { InputBase, styled } from "@mui/material";

export const StyledInput = styled(InputBase)(({ theme }) => ({
  backgroundColor: "#FFF",
  fontSize: theme.typography.h6.fontSize,
  color: "#000",
  padding: "8px 16px",
  border: "2px solid transparent",

  "& input": {
    padding: 0,
  },
  "& input::placeholder": {
    color: "#898989",
    textTransform: "uppercase",
  },
  "&.Mui-error": {
    border: "2px solid #d32f2f",
  },
}));
