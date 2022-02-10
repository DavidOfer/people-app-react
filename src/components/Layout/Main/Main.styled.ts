import styled from 'styled-components';

export const StyledMain = styled.main`
display:flex;
flex-direction:column;
width:100%;
padding: 0px 250px;
justify-content:center;
.paginationContainer{
    display:flex;
    justify-content:center;
}
@media only screen and (max-width: 1200px) {
    padding:0px;
}
`