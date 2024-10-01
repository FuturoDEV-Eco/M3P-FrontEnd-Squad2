import simbol from '../../assets/favicon.png';
function Footer() {
  return (
    <footer>
      <div className='container'>
        <img src={simbol} height={70} alt='Destino certo' />
        <p>
          © 2024 - Destino Certo <br />
          <small>Todos os direitos reservados.</small>{' '}
        </p>
        <p>
          Desenvolvido por:
          <div className='link-details footer-details'>
            <span>Charles Biveu Doehl</span>
            <span>Bianca Silva Barcelos</span>
            <span>Francisco Grimes da Silva</span>
          </div>
        </p>
      </div>
    </footer>
  );
}
export default Footer;
