import simbol from '../assets/favicon.png';
import { Link } from 'react-router-dom';
import { RiChatSmile2Line } from 'react-icons/ri';
function RegionalExpressions() {
  return (
    <>
      <div className='page-title align-icon'>
        <RiChatSmile2Line />
        <span>Expressões Regionais</span>
      </div>
      <div className='card-detail'>
        <div className='card-body'>
          <p>
            Como foi possível perceber o <strong>Destino Certo</strong> utiliza
            muitas expressões regionais de Florianópolis. <br /> <br />
          </p>
          <p>
            "Ixtepô, arrombassi, dazumbanho são algumas expressões muito usadas
            no dia a dia de quem é natural de Florianópolis. O chamado manezinho
            tem suas origens em açorianas e é considerado um patrimônio de Santa
            Catarina, e todo primeiro sábado do mês de junho, é comemorado o dia
            municipal dele.
          </p>
          <p>
            {' '}
            <small>
              Fonte:{' '}
              <Link
                to='https://www.sesc-sc.com.br/cultura/dialeto-manezes-conheca-as-expressoes-de-manezinhos-de-floripa-'
                target='_blank'
              >
                SESC - SC
              </Link>
            </small>
            <br /> <br />
          </p>

          <p>Confira um pouco mais do "Dialeto Manezês":</p>

          <p>
            <span className='primary-bold'>Arrombassi</span>
            <br />
            Expressão de espanto, em situações de elogio ou afronta.
          </p>
          <p>
            <span className='primary-bold'>Amarrar a cara</span>
            <br />
            zangar-se.
          </p>

          <p>
            <span className='primary-bold'>Cachorro papa-ovo</span>
            <br />
            Vira-latas, que não tem raça.
          </p>

          <p>
            <span className='primary-bold'>Camaçada de pau</span>
            <br />
            Surra. “Vou te dar uma camaçada de pau.”
          </p>

          <p>
            <span className='primary-bold'>Cú de increnca</span>
            <br />
            Pessoa brigona, encrenqueira, que só traz problemas.
          </p>

          <p>
            <span className='primary-bold'>Dazumbanho</span>
            <br />
            Expressão usada para dizer que uma pessoa acertou, conseguiu uma
            faceta. Mas as vezes é usada de forma irônica.
          </p>

          <p>
            <span className='primary-bold'>Dijahoje</span>
            <br />
            Termo usado coloquialmente para expressar um tempo ocorrido mais
            cedo. “Ele esteve aqui dijahoje.”
          </p>

          <p>
            <span className='primary-bold'>Em dois toques</span>
            <br />
            Rapidamente. “Vou ali em dois toques e já volto.”
          </p>

          <p>
            <span className='primary-bold'>És um monstro!</span>
            <br />
            Expressão usada pra dizer que uma pessoa é grande, é a melhor em
            algo, praticamente invencível. “Messi, tu jogas muito, és um
            monstro!”
          </p>

          <p>
            <span className='primary-bold'>Ixtepô</span>
            <br />
            Desgraçada, pessoa que não presta. Muitas vezes é usada em tom de
            brincadeira. “Venha cá, seu ixtepô!”
          </p>

          <p>
            <span className='primary-bold'>Matasse a pau!</span>
            <br />
            Quando alguém acerta em cheio, consegue alguma faceta de forma
            brilhante. “Tu passou no vestibular? Matasse a pau, cara!”
          </p>

          <p>
            <span className='primary-bold'>Mofas com a pomba na balaia</span>
            <br />
            Expressão usada para dizer que uma pessoa não vai alcançar o seu
            objetivo, que vai se cansar de esperar.
          </p>

          <p>
            <span className='primary-bold'>Não tem?</span>
            <br />
            Vício de linguagem correspondente a “não é”, “né” ou “sabe?”
          </p>

          <p>
            <span className='primary-bold'>Ó-lhó-lhó</span>
            <br />
            Expressão de admiração, espanto ou surpresa.
          </p>

          <p>
            <span className='primary-bold'>Roupa-de-briga</span>
            <br />
            Traje de trabalho.
          </p>

          <p>
            <span className='primary-bold'>Tax tolo?</span>
            <br />
            Expressão de admiração/espanto em relação a decisão de outra pessoa.
          </p>

          <p>
            <span className='primary-bold'>Tanso</span>
            <br />
            Pessoa “burra” no sentido se sonsa. “Tu deixou o cachorro fugir, seu
            tanso?”
          </p>
          <p>
            <span className='primary-bold'>Tu diz?</span>
            <br />
            Expressão de espanto quanto a veracidade de um fato contado por
            alguém. “Estás falando sério?”
          </p>

          <p>
            <span className='primary-bold'>Segue reto toda vida</span>
            <br />
            Seguir em frente e em linha reta, sem se desviar da rota.
          </p>

          <p>
            <span className='primary-bold'>
              Se quex, quex, se não quex, dix
            </span>
            <br />
            Expressão usada quando uma pessoa está indecisa, sem saber que
            decisão tomar.
          </p>

          <p>
            <span className='primary-bold'>Mandrião</span>
            <br />
            Preguiçoso. “Levanta da cama, seu mandrião!”
          </p>

          <p>
            <span className='primary-bold'>Boca-mole</span>
            <br />
            Pessoa tapada, que não é esperta. Semelhante ao “tanso”, do item 17.
            “Tu deixou o cachorro fugir, seu boca-mole?”
          </p>
          <p>
            <small>
              Fonte:
              <Link
                to='https://destinoflorianopolis.com.br/top-girias-e-expressoes-mais-curiosas-de-florianopolis/'
                target='_blank'
              >
                Destino Florianópolis
              </Link>
            </small>
          </p>
        </div>
      </div>
    </>
  );
}

export default RegionalExpressions;
