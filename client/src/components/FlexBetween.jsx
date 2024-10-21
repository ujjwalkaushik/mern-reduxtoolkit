const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent:"space-between",
    alignContent: "center"
});

export default FlexBetween
