import styled from "styled-components";

const Main = styled.main`
    width: 95%;
    min-height: 100%;
    margin: auto;
    padding-bottom: 100px;
`
const PageContent = (props) => {
    return (
        <Main>{props.children}</Main>
    );
}




export default PageContent;