import styled from "styled-components";

const Main = styled.main`
    width: 95%;
    min-height: 100%;
    margin: 0 auto 100px auto;
`
const PageContent = (props) => {
    return (
        <Main>{props.children}</Main>
    );
}




export default PageContent;