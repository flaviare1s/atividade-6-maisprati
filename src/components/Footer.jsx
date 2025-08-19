import styled from 'styled-components';
import { useTheme } from '../contexts/ThemeContext';

const StyledFooter = styled.footer`
  width: 100%;
  padding: 2rem 1.5rem;
  background-color: ${props => props.$isDark ? 'var(--color-surface)' : 'var(--color-surface)'};
  color: ${props => props.$isDark ? 'var(--color-text-secondary)' : 'var(--color-text-secondary)'};
  border-top: 1px solid ${props => props.$isDark ? 'var(--color-border)' : 'var(--color-border)'};
  transition: all 0.2s ease;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  
  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const FooterTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${props => props.$isDark ? 'var(--color-text-primary)' : 'var(--color-text-primary)'};
  margin: 0;
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  margin: 0;
  text-align: left;
`;

const FooterLink = styled.a`
  color: var(--color-teal-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: var(--color-teal-secondary);
    text-decoration: underline;
  }
  
  &:focus {
    outline: 2px solid var(--color-teal-primary);
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const StyledText = styled.span`
  font-style: italic;
  color: var(--color-teal-primary);
  font-weight: 500;
`;

export const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <StyledFooter $isDark={isDark}>
      <FooterContainer>
        <FooterSection>
          <FooterTitle $isDark={isDark}>🖼️ StyledStore</FooterTitle>
          <FooterText>
            <StyledText>Explore nossos produtos</StyledText>
          </FooterText>
          <FooterText>
            Conheça diferentes bibliotecas de UI em um só lugar
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle $isDark={isDark}>Categorias</FooterTitle>
          <FooterText>
            <FooterLink href="/produtos/bootstrap">Bootstrap</FooterLink>
          </FooterText>
          <FooterText>
            <FooterLink href="/produtos/material">Material UI</FooterLink>
          </FooterText>
          <FooterText>
            <FooterLink href="/produtos/milligram">Milligram</FooterLink>
          </FooterText>
        </FooterSection>

        <FooterSection>
          <FooterTitle $isDark={isDark}>Sobre</FooterTitle>
          <FooterText>
            © {new Date().getFullYear()} StyledStore
          </FooterText>
          <FooterText>
            Todos os direitos reservados
          </FooterText>
          <SocialLinks>
            <FooterLink href="https://github.com/flaviare1s" target="_blank" rel="noopener noreferrer">
              GitHub
            </FooterLink>
            <FooterLink href="https://www.linkedin.com/in/flavia-reis-desenvolvedor-full-stack/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </FooterLink>
          </SocialLinks>
        </FooterSection>
      </FooterContainer>
    </StyledFooter>
  );
};
