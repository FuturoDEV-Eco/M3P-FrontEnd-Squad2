import simbol from '../../assets/favicon.png';
function Footer() {
  return (
    <footer className='container'>
      <img src={simbol} height={70} alt='Destino certo' />
      <p>
        © 2024 - Destino Certo <br />
        <small>Todos os direitos reservados.</small>{' '}
      </p>
      <p>
        Desenvolvido por:
        <br />
        Charles Biveu Doehl
      </p>
    </footer>
  );
}
export default Footer;
