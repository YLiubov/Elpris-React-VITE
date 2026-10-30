import styled from 'styled-components';

export const PriceText = styled.p`
    margin: 0;
    font-size: inherit;
    font-weight: 700;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.accent};
`;