//blurhash: uma string codificada para representar uma imagem compactada, pode ser um placeholder de imagem antes de carregar a versão real, gerando um preview borrado.
export const blurhash = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

// getRoomId: criar um id unico para o chat entre 2 pessoas.
//Funcionamento: Receber os ids dos usuarios colocar os ids em array e ordenar, juntar os ids ordenados com o hífen e retornar o roomId que será o mesmo sempre, independentemente da ordem em que for passado ao usuario
export const getRoomId = (userId1, userId2) => {
    const sortedIds = [userId1, userId2].sort();
    const roomId = sortedIds.join('-');
    return roomId;
}

//formatDate: formatar uma data para o formato'dia/mês. 
//A função getDate() irá obter o dia do mês, usar um array para armazenar os nomes abreviados dos meses. 
//Obtém o nome do mês correspondente com date.getMonth(). Por fim, retorna no padrão 'dia/mês, EX: '21 Apr'.
export const formatDate = date => {
    var day = date.getDate();
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month = monthNames[date.getMonth()];
    //No javascript os meses começam do 0 (janeiro = 0, fevereiro = 1...) Por isso o getMonth() retorna um índice para o array.
    var formattedDate = day + ' ' + month;
    return formattedDate;
}