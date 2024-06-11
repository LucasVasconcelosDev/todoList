const formatDate = (dateString) => {

    const dataSemFusoHorario = dateString.slice(0, 16);

    const date = new Date(dataSemFusoHorario);
    
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();
  
    return `${dia}/${mes}/${ano}`;
};

const formatFetchedDate = (dateString) => {

    return dateString.slice(0, 10);
}

const getCurrentDate = () => {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

export default { formatDate, formatFetchedDate, getCurrentDate };