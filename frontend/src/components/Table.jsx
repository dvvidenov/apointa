import { Link } from 'react-router-dom';
import '../css/Table.css';


function Table({ labels, data, keys, link }) {
  let tableHeader = ''
  if (labels) {
    tableHeader =
      <div className='table-row table-header'>
        {labels.map((l, i) => <span className='cell' key={i}>{l}</span>)}
      </div>;
  }

  const textMap = {
    'duration': 'минути',
    'price': 'лв.',
    '1': 'aктивна',
    false: 'неактивна',
    'working': 'На работа',
    'sick': 'Болничен',
    'vacation': 'Отпуска'
  };


  return (
    <div className={`table ${link} ${keys.length}`}>

      {tableHeader}

      {data.map(d =>
        <Link key={d.id} to={`/${link}/${d.id}`}>
          <div className='table-row' key={d.id}>
            {keys.map((key, i) => (
              <span key={key}
                className={`cell ${key == 'status' ? d[key] : ''} box-${i + 1}`}>
                {key == 'status' ? textMap[d[key]] : d[key]}  {textMap[key]}
              </span>
            ))}
          </div>
        </Link>
      )}

    </div>

  );
}

export default Table;